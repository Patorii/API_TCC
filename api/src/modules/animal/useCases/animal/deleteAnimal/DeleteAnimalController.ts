import { Response, Request } from "express";
import { container } from "tsyringe";

import { DeleteAnimalUseCase } from "./DeleteAnimalUseCase";

class DeleteAnimalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { codanimal } = request.params;
        const cod_animal = Number(codanimal);

        const deleteAnimalUseCase = container.resolve(DeleteAnimalUseCase);

        const list = await deleteAnimalUseCase.execute({ cod_animal });
        return response.status(200).json(list);
    }
}

export { DeleteAnimalController };
