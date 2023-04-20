import { Response, Request } from "express";
import { container } from "tsyringe";

import { UpdatePasswordUserUseCase } from "./UpdatePasswordUserUseCase";

class UpdatePasswordUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { coduser } = request.params;
        const { senha_atual, nova_senha } = request.body;

        const cod_usuario = Number(coduser);

        const updatePasswordUserUseCase = container.resolve(
            UpdatePasswordUserUseCase
        );

        const user = await updatePasswordUserUseCase.execute({
            senha_atual,
            nova_senha,
            cod_usuario,
            cod_usuario_logado: request.user.cod_usuario,
        });
        return response.status(201).json(user);
    }
}

export { UpdatePasswordUserController };
