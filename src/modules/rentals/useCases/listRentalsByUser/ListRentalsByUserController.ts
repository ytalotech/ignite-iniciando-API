import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRentalsByUseCase } from "./ListRentalsByUseCase";

class ListRentalsByUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const listRentalsByUseCase = container.resolve(ListRentalsByUseCase)

        const rentals = await listRentalsByUseCase.execute(id);

        return response.json(rentals);
    }
}

export { ListRentalsByUserController }