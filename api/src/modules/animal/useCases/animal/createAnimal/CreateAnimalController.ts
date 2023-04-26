import { Response, Request } from "express";
import { container } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { CreateAnimalUseCase } from "./CreateAnimalUseCase";

class CreateAnimalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const data = request.body;
        data.cod_usuario = request.user.cod_usuario;
        if (data.raca) {
            data.raca = data.raca.toUpperCase();
        }
        if (data.especie) {
            data.especie = data.especie.toUpperCase();
            if (data.especie !== "C" && data.especie !== "G") {
                throw new AppError(
                    "A especie informada não é compativel deve ser informado: 'C' para cachorro ou 'G' para gato"
                );
            }
        }
        const createAnimalUseCase = container.resolve(CreateAnimalUseCase);

        const animal = await createAnimalUseCase.execute(data);
        return response.status(201).json(animal);
    }
}

export { CreateAnimalController };
