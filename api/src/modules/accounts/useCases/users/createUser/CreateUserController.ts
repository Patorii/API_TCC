import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { nome, cpf, cnpj, email, senha } = request.body;

        const createUserUseCase = container.resolve(CreateUserUseCase);

        const user = await createUserUseCase.execute({
            nome,
            cpf,
            cnpj,
            email,
            senha,
        });
        return response.status(201).json(user);
    }
}

export { CreateUserController };
