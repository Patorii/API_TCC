import { Response, Request } from "express";
import { container } from "tsyringe";

import { GetAnimalUseCase } from "./GetAnimalUseCase";

class GetAnimalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { codanimal } = request.params;
        const cod_animal = Number(codanimal);

        const getAnimalUseCase = container.resolve(GetAnimalUseCase);

        const list = await getAnimalUseCase.execute({ cod_animal });
        return response.status(200).json(list);
    }
}

export { GetAnimalController };
