import { Response, Request } from "express";
import { container } from "tsyringe";

import { UpdateAnimalUseCase } from "./UpdateAnimalUseCase";

class UpdateAnimalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { codanimal } = request.params;
        const cod_animal = Number(codanimal);
        const data = request.body;
        data.cod_animal = cod_animal;
        data.cod_usuario = request.user.cod_usuario;

        const updateAnimalUseCase = container.resolve(UpdateAnimalUseCase);

        const animal = await updateAnimalUseCase.execute(data);
        return response.status(201).json(animal);
    }
}

export { UpdateAnimalController };
