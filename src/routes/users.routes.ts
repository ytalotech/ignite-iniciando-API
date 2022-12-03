import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();

//  só o / por que etudo está no index
usersRoutes.post("/", createUserController.handle);

export { usersRoutes }