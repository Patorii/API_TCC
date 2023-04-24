import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListAllAnnouncementPhotosUseCase } from "./ListAllAnnouncementPhotosUseCase";

class ListAllAnnouncementPhotosController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { codanuncio } = request.params;
        const cod_anuncio = Number(codanuncio);

        const listAllAnnouncementPhotosUseCase = container.resolve(
            ListAllAnnouncementPhotosUseCase
        );

        const announcementPhotos =
            await listAllAnnouncementPhotosUseCase.execute({
                cod_anuncio,
            });
        return response.status(200).json(announcementPhotos);
    }
}

export { ListAllAnnouncementPhotosController };
