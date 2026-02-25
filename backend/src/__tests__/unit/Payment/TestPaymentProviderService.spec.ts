import AppError from "../../../errors/AppError";
import TestPaymentProviderService from "../../../services/PaymentServices/TestPaymentProviderService";

describe("TestPaymentProviderService", () => {
  it("should validate PayPal with required fields", async () => {
    const result = await TestPaymentProviderService({
      providerSlug: "paypal",
      config: {
        clientId: "client-id",
        clientSecret: "secret",
        environment: "sandbox"
      }
    });

    expect(result.provider).toBe("paypal");
    expect(result.valid).toBe(true);
    expect(result.missingFields).toHaveLength(0);
  });

  it("should return missing fields for PagBank", async () => {
    const result = await TestPaymentProviderService({
      providerSlug: "pagbank",
      config: {
        email: "financeiro@empresa.com"
      }
    });

    expect(result.valid).toBe(false);
    expect(result.missingFields).toEqual(expect.arrayContaining(["token", "environment"]));
  });

  it("should throw not found error for invalid provider", async () => {
    await expect(
      TestPaymentProviderService({
        providerSlug: "provedor-inexistente",
        config: {}
      })
    ).rejects.toEqual(new AppError("ERR_PAYMENT_PROVIDER_NOT_FOUND", 404));
  });
});
