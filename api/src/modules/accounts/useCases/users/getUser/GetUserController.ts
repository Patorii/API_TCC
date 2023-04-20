import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListUsersUseCase } from "./GetUserUseCase";

class GetUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { coduser } = request.params;
        const cod_usuario = Number(coduser);
        const cod_usuario_atual = request.user.cod_usuario;

        const listUsersUseCase = container.resolve(ListUsersUseCase);

        const list = await listUsersUseCase.execute({
            cod_usuario_atual,
            cod_usuario,
        });
        return response.status(200).json(list);
    }
}

export { GetUserController };
