import { Response, Request } from "express";
import { container } from "tsyringe";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { coduser } = request.params;
        const { nome, cpf, cnpj, email } = request.body;

        const cod_usuario = Number(coduser);

        const updateUserUseCase = container.resolve(UpdateUserUseCase);

        const user = await updateUserUseCase.execute({
            nome,
            cpf,
            cnpj,
            email,
            cod_usuario,
        });
        return response.status(201).json(user);
    }
}

export { UpdateUserController };
