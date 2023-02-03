import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

class SendForgotPasswordMaillController {

    async execute(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        const sendForgotPasswordMailUseCase = container.resolve(SendForgotPasswordMailUseCase);

        await sendForgotPasswordMailUseCase.execute(email)

        return response.send();
    }
}

export { SendForgotPasswordMaillController }