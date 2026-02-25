export type PaymentProviderSlug =
  | "asaas"
  | "efi"
  | "infinitepay"
  | "mercadopago"
  | "stripe"
  | "paypal"
  | "pagarme"
  | "pagbank";

export interface PaymentProviderField {
  key: string;
  label: string;
  required: boolean;
  secret?: boolean;
}

export interface PaymentProviderDefinition {
  slug: PaymentProviderSlug;
  name: string;
  description: string;
  docsUrl: string;
  supports: string[];
  fields: PaymentProviderField[];
}

export const PAYMENT_PROVIDER_KEY_PREFIX = "payment_provider_";

export const paymentProviders: PaymentProviderDefinition[] = [
  {
    slug: "asaas",
    name: "Asaas",
    description: "Gateway nacional para PIX, boleto e cartão.",
    docsUrl: "https://docs.asaas.com/",
    supports: ["pix", "boleto", "credit_card"],
    fields: [
      { key: "apiKey", label: "API Key", required: true, secret: true },
      { key: "environment", label: "Ambiente", required: true },
      { key: "webhookSecret", label: "Webhook Secret", required: false, secret: true }
    ]
  },
  {
    slug: "efi",
    name: "Efi",
    description: "Integração bancária para cobranças via PIX, boleto e cartão.",
    docsUrl: "https://dev.efipay.com.br/docs",
    supports: ["pix", "boleto", "credit_card"],
    fields: [
      { key: "clientId", label: "Client ID", required: true, secret: true },
      { key: "clientSecret", label: "Client Secret", required: true, secret: true },
      { key: "pixKey", label: "Chave PIX", required: false }
    ]
  },
  {
    slug: "infinitepay",
    name: "InfinitePay",
    description: "Recebimentos com foco em cartão e PIX.",
    docsUrl: "https://developers.infinitepay.io/",
    supports: ["pix", "credit_card"],
    fields: [
      { key: "accessToken", label: "Access Token", required: true, secret: true },
      { key: "webhookSecret", label: "Webhook Secret", required: false, secret: true }
    ]
  },
  {
    slug: "mercadopago",
    name: "Mercado Pago",
    description: "Pagamentos via PIX, boleto e cartão com checkout transparente.",
    docsUrl: "https://www.mercadopago.com.br/developers/pt",
    supports: ["pix", "boleto", "credit_card"],
    fields: [
      { key: "accessToken", label: "Access Token", required: true, secret: true },
      { key: "publicKey", label: "Public Key", required: true }
    ]
  },
  {
    slug: "stripe",
    name: "Stripe",
    description: "Gateway global para assinaturas e pagamentos internacionais.",
    docsUrl: "https://docs.stripe.com/",
    supports: ["credit_card", "pix", "boleto"],
    fields: [
      { key: "secretKey", label: "Secret Key", required: true, secret: true },
      { key: "publishableKey", label: "Publishable Key", required: true },
      { key: "webhookSecret", label: "Webhook Secret", required: false, secret: true }
    ]
  },
  {
    slug: "paypal",
    name: "PayPal",
    description: "Carteira digital e pagamentos internacionais.",
    docsUrl: "https://developer.paypal.com/docs/api/overview/",
    supports: ["credit_card", "wallet"],
    fields: [
      { key: "clientId", label: "Client ID", required: true, secret: true },
      { key: "clientSecret", label: "Client Secret", required: true, secret: true },
      { key: "environment", label: "Ambiente", required: true }
    ]
  },
  {
    slug: "pagarme",
    name: "Pagar.me",
    description: "Gateway brasileiro para cobranças em PIX, boleto e cartão.",
    docsUrl: "https://docs.pagar.me/reference",
    supports: ["pix", "boleto", "credit_card"],
    fields: [
      { key: "apiKey", label: "API Key", required: true, secret: true },
      { key: "encryptionKey", label: "Encryption Key", required: false, secret: true }
    ]
  },
  {
    slug: "pagbank",
    name: "PagBank",
    description: "Integração com soluções de recebimento do PagSeguro/PagBank.",
    docsUrl: "https://dev.pagbank.uol.com.br/reference",
    supports: ["pix", "boleto", "credit_card"],
    fields: [
      { key: "token", label: "Token", required: true, secret: true },
      { key: "email", label: "Email da conta", required: true },
      { key: "environment", label: "Ambiente", required: true }
    ]
  }
];

export const getPaymentProviderBySlug = (
  slug: string
): PaymentProviderDefinition | undefined =>
  paymentProviders.find(provider => provider.slug === slug);

export const getPaymentProviderSettingKey = (slug: string): string =>
  `${PAYMENT_PROVIDER_KEY_PREFIX}${slug}`;
