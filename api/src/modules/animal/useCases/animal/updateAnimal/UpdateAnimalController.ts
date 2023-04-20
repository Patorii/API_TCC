import { Response, Request } from "express";
import { container } from "tsyringe";

import { UpdateAnimalUseCase } from "./UpdateAnimalUseCase";

class UpdateAnimalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { codanimal } = request.params;
        const cod_animal = Number(codanimal);
        const { cod_usuario, especie, nome, idade, raca, cor } = request.body;

        const updateAnimalUseCase = container.resolve(UpdateAnimalUseCase);

        const animal = await updateAnimalUseCase.execute({
            cod_animal,
            cod_usuario,
            especie,
            nome,
            idade,
            raca,
            cor,
            cod_usuario_atual: request.user.cod_usuario,
        });
        return response.status(201).json(animal);
    }
}

export { UpdateAnimalController };
