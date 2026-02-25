import Setting from "../../models/Setting";
import {
  getPaymentProviderSettingKey,
  paymentProviders,
  PaymentProviderDefinition
} from "./paymentProviders";

interface ProviderConfig {
  [key: string]: string | number | boolean;
}

interface ProviderResponse extends PaymentProviderDefinition {
  enabled: boolean;
  configuredAt: Date | null;
  config: ProviderConfig;
}

const maskSecrets = (
  provider: PaymentProviderDefinition,
  config: ProviderConfig
): ProviderConfig => {
  return provider.fields.reduce((acc, field) => {
    const value = config[field.key];

    if (typeof value === "undefined" || value === null || value === "") {
      return acc;
    }

    if (field.secret) {
      acc[field.key] = "********";
      return acc;
    }

    acc[field.key] = value;
    return acc;
  }, {} as ProviderConfig);
};

const ListPaymentProvidersService = async (
  tenantId: number | string
): Promise<ProviderResponse[]> => {
  const settingKeys = paymentProviders.map(provider =>
    getPaymentProviderSettingKey(provider.slug)
  );

  const settings = await Setting.findAll({
    where: {
      tenantId,
      key: settingKeys
    }
  });

  return paymentProviders.map(provider => {
    const setting = settings.find(
      item => item.key === getPaymentProviderSettingKey(provider.slug)
    );

    let parsedConfig: ProviderConfig = {};

    if (setting?.value) {
      try {
        parsedConfig = JSON.parse(setting.value);
      } catch (error) {
        parsedConfig = {};
      }
    }

    return {
      ...provider,
      enabled: Boolean(parsedConfig.enabled),
      configuredAt: setting?.updatedAt || null,
      config: maskSecrets(provider, parsedConfig)
    };
  });
};

export default ListPaymentProvidersService;
