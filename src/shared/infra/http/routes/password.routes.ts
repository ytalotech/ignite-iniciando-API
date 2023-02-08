import { SendForgotPasswordMaillController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRoutes = Router();

const sendForgotPasswordMaillController = new SendForgotPasswordMaillController();

passwordRoutes.post("/forgot", sendForgotPasswordMaillController.handle);

export { passwordRoutes }