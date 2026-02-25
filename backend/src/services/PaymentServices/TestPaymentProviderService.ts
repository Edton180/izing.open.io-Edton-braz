import AppError from "../../errors/AppError";
import {
  getPaymentProviderBySlug,
  PaymentProviderField
} from "./paymentProviders";

interface Request {
  providerSlug: string;
  config: {
    [key: string]: string | number | boolean;
  };
}

interface Response {
  provider: string;
  valid: boolean;
  missingFields: string[];
}

const missingRequiredFields = (
  fields: PaymentProviderField[],
  config: {
    [key: string]: string | number | boolean;
  }
): string[] => {
  return fields
    .filter(field => field.required)
    .map(field => field.key)
    .filter(key => {
      const value = config[key];
      return value === undefined || value === null || value === "";
    });
};

const TestPaymentProviderService = async ({
  providerSlug,
  config
}: Request): Promise<Response> => {
  const provider = getPaymentProviderBySlug(providerSlug);

  if (!provider) {
    throw new AppError("ERR_PAYMENT_PROVIDER_NOT_FOUND", 404);
  }

  const missingFields = missingRequiredFields(provider.fields, config);

  return {
    provider: provider.slug,
    valid: missingFields.length === 0,
    missingFields
  };
};

export default TestPaymentProviderService;
