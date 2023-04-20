import { Response, Request } from "express";
import { container } from "tsyringe";

import { GetAnnouncementUseCase } from "./GetAnnouncementUseCase";

class GetAnnouncementController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { codanuncio } = request.params;
        const cod_anuncio = Number(codanuncio);

        const getAnnouncementUseCase = container.resolve(
            GetAnnouncementUseCase
        );

        const list = await getAnnouncementUseCase.execute({ cod_anuncio });
        return response.status(200).json(list);
    }
}

export { GetAnnouncementController };
