import { Router } from "express";
import isAuth from "../middleware/isAuth";
import * as PaymentProviderController from "../controllers/PaymentProviderController";

const paymentProviderRoutes = Router();

paymentProviderRoutes.get(
  "/payment/providers",
  isAuth,
  PaymentProviderController.index
);

paymentProviderRoutes.put(
  "/payment/providers/:providerSlug",
  isAuth,
  PaymentProviderController.update
);

paymentProviderRoutes.post(
  "/payment/providers/:providerSlug/test",
  isAuth,
  PaymentProviderController.testConfig
);

export default paymentProviderRoutes;
