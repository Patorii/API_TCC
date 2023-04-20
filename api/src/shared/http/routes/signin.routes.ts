import { LoginUserController } from "@modules/accounts/useCases/users/loginUser/LoginUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/users/refreshToken/RefreshTokenController";
import { Router } from "express";

const signinRoutes = Router();

const loginUserController = new LoginUserController();
const refreshTokenController = new RefreshTokenController();

signinRoutes.post("/signin", loginUserController.handle);
signinRoutes.post("/refresh-token", refreshTokenController.handle);

export { signinRoutes };
