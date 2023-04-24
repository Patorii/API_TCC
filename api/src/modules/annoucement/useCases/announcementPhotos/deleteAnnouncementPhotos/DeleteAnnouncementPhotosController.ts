import { Response, Request } from "express";
import { container } from "tsyringe";

import { DeleteAnnouncementPhotosUseCase } from "./DeleteAnnouncementPhotosUseCase";

class DeleteAnnouncementPhotosController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { codfotoanuncio } = request.params;
        const cod_foto_anuncio = Number(codfotoanuncio);

        const deleteAnnouncementPhotosUseCase = container.resolve(
            DeleteAnnouncementPhotosUseCase
        );

        const list = await deleteAnnouncementPhotosUseCase.execute({
            cod_foto_anuncio,
            cod_usuario: request.user.cod_usuario,
        });
        return response.status(200).json(list);
    }
}

export { DeleteAnnouncementPhotosController };
