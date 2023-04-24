import { Response, Request } from "express";
import { container } from "tsyringe";

import { ToggleMainAnnouncementPhotosUseCase } from "./ToggleMainAnnouncementPhotosUseCase";

class ToggleMainAnnouncementPhotosController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { codfotoanuncio } = request.params;
        const cod_foto_anuncio = Number(codfotoanuncio);

        const toggleMainAnnouncementPhotosUseCase = container.resolve(
            ToggleMainAnnouncementPhotosUseCase
        );

        const list = await toggleMainAnnouncementPhotosUseCase.execute({
            cod_foto_anuncio,
            cod_usuario: request.user.cod_usuario,
        });
        return response.status(200).json(list);
    }
}

export { ToggleMainAnnouncementPhotosController };
