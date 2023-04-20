import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateAnimalUseCase } from "./CreateAnimalUseCase";

class CreateAnimalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { cod_usuario, especie, nome, idade, raca, cor } = request.body;

        const createAnimalUseCase = container.resolve(CreateAnimalUseCase);

        const animal = await createAnimalUseCase.execute({
            cod_usuario,
            especie,
            nome,
            idade,
            raca,
            cor,
        });
        return response.status(201).json(animal);
    }
}

export { CreateAnimalController };
