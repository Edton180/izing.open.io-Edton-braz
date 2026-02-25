import * as Yup from "yup";
import AppError from "../../errors/AppError";
import Setting from "../../models/Setting";
import {
  getPaymentProviderBySlug,
  getPaymentProviderSettingKey
} from "./paymentProviders";

interface Request {
  tenantId: number | string;
  providerSlug: string;
  enabled: boolean;
  config: {
    [key: string]: string | number | boolean;
  };
}

interface Response {
  provider: string;
  enabled: boolean;
  requiredMissingFields: string[];
  updatedAt: Date;
}

const buildSchema = (requiredFields: string[]): Yup.ObjectSchema<any> => {
  const shape = requiredFields.reduce((acc, field) => {
    acc[field] = Yup.mixed().required();
    return acc;
  }, {} as Record<string, Yup.AnySchema>);

  return Yup.object().shape(shape);
};

const UpsertPaymentProviderService = async ({
  tenantId,
  providerSlug,
  enabled,
  config
}: Request): Promise<Response> => {
  const provider = getPaymentProviderBySlug(providerSlug);

  if (!provider) {
    throw new AppError("ERR_PAYMENT_PROVIDER_NOT_FOUND", 404);
  }

  const requiredFields = provider.fields
    .filter(field => field.required)
    .map(field => field.key);

  let requiredMissingFields: string[] = [];

  if (enabled) {
    const schema = buildSchema(requiredFields);

    try {
      await schema.validate(config, { abortEarly: false });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        requiredMissingFields = error.inner.map(item => item.path as string);
      } else {
        throw error;
      }
    }

    if (requiredMissingFields.length > 0) {
      throw new AppError("ERR_PAYMENT_PROVIDER_INVALID_CONFIG", 400);
    }
  }

  const payload = {
    enabled,
    ...config
  };

  const key = getPaymentProviderSettingKey(providerSlug);

  let setting = await Setting.findOne({
    where: {
      tenantId,
      key
    }
  });

  if (!setting) {
    setting = await Setting.create({
      tenantId,
      key,
      value: JSON.stringify(payload)
    });
  } else {
    await setting.update({
      value: JSON.stringify(payload)
    });
  }

  return {
    provider: provider.slug,
    enabled,
    requiredMissingFields,
    updatedAt: setting.updatedAt
  };
};

export default UpsertPaymentProviderService;
