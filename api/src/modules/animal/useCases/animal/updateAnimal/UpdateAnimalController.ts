import { Response, Request } from "express";
import { container } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { UpdateAnimalUseCase } from "./UpdateAnimalUseCase";

class UpdateAnimalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { codanimal } = request.params;
        const cod_animal = Number(codanimal);
        const data = request.body;
        data.cod_animal = cod_animal;
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
        if (data.sexo) {
            data.sexo = data.sexo.toUpperCase();
            if (data.sexo !== "F" && data.sexo !== "M") {
                throw new AppError(
                    "O sexo informado não é compativel deve ser informado: 'F' para femea ou 'M' para macho"
                );
            }
        }
        const updateAnimalUseCase = container.resolve(UpdateAnimalUseCase);

        const animal = await updateAnimalUseCase.execute(data);
        return response.status(201).json(animal);
    }
}

export { UpdateAnimalController };
