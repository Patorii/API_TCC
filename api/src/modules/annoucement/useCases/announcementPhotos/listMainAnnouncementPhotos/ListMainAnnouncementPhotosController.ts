import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListMainAnnouncementPhotosUseCase } from "./ListMainAnnouncementPhotosUseCase";

class ListMainAnnouncementPhotosController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { codanuncio } = request.params;
        const cod_anuncio = Number(codanuncio);

        const listMainAnnouncementPhotosUseCase = container.resolve(
            ListMainAnnouncementPhotosUseCase
        );

        const mainPhoto = await listMainAnnouncementPhotosUseCase.execute({
            cod_anuncio,
        });
        return response.status(200).json(mainPhoto);
    }
}

export { ListMainAnnouncementPhotosController };
