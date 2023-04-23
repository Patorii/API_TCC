import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateAnimalUseCase } from "./CreateAnimalUseCase";

class CreateAnimalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const data = request.body;
        data.cod_usuario = request.user.cod_usuario;
        if (data.raca) {
            data.raca = data.raca.toUpperCase();
        }
        const createAnimalUseCase = container.resolve(CreateAnimalUseCase);

        const animal = await createAnimalUseCase.execute(data);
        return response.status(201).json(animal);
    }
}

export { CreateAnimalController };
