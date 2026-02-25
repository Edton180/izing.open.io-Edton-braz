import { Request, Response } from "express";
import AppError from "../errors/AppError";
import ListPaymentProvidersService from "../services/PaymentServices/ListPaymentProvidersService";
import TestPaymentProviderService from "../services/PaymentServices/TestPaymentProviderService";
import UpsertPaymentProviderService from "../services/PaymentServices/UpsertPaymentProviderService";

export const index = async (req: Request, res: Response): Promise<Response> => {
  const { tenantId } = req.user;

  const providers = await ListPaymentProvidersService(tenantId);

  return res.status(200).json(providers);
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (req.user.profile !== "admin") {
    throw new AppError("ERR_NO_PERMISSION", 403);
  }

  const { tenantId } = req.user;
  const { providerSlug } = req.params;
  const { enabled = false, config = {} } = req.body;

  const result = await UpsertPaymentProviderService({
    tenantId,
    providerSlug,
    enabled,
    config
  });

  return res.status(200).json(result);
};

export const testConfig = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (req.user.profile !== "admin") {
    throw new AppError("ERR_NO_PERMISSION", 403);
  }

  const { providerSlug } = req.params;
  const { config = {} } = req.body;

  const result = await TestPaymentProviderService({ providerSlug, config });

  return res.status(200).json(result);
};
