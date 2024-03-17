import { Router } from "express";
import dealershipValidator from "../validator/dealer.validator";
import dealershipController from "../controller/dealer.controller";
import { authValidator } from "../validator/auth.validator";

const dealershipRouter = Router();

dealershipRouter.post("/", dealershipValidator.register, dealershipController.register);

dealershipRouter.post("/login", authValidator.login, dealershipController.login)

export default dealershipRouter;