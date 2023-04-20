import { CreateUserController } from "@modules/accounts/useCases/users/createUser/CreateUserController";
import { GetUserController } from "@modules/accounts/useCases/users/getUser/GetUserController";
import { UpdatePasswordUserController } from "@modules/accounts/useCases/users/updatePasswordUser/UpdatePasswordUserController";
import { UpdateUserController } from "@modules/accounts/useCases/users/updateUser/UpdateUserController";
import { Router } from "express";

import { isAuthenticated } from "../middlewares/isAuthenticated";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();

const updatePasswordUserController = new UpdatePasswordUserController();

const getUserController = new GetUserController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.post("/:coduser", isAuthenticated, updateUserController.handle);

usersRoutes.get("/:coduser", isAuthenticated, getUserController.handle);

usersRoutes.patch(
    "/:coduser/password",
    isAuthenticated,
    updatePasswordUserController.handle
);

export { usersRoutes };
