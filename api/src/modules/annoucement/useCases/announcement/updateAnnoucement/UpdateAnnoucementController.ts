import { Response, Request } from "express";
import { container } from "tsyringe";

import { UpdateAnnouncementUseCase } from "./UpdateAnnouncementUseCase";

class UpdateAnnouncementController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { codanuncio } = request.params;

        const data = request.body;
        data.cod_anuncio = Number(codanuncio);
        data.cod_usuario = request.user.cod_usuario;
        const updateAnnouncementUseCase = container.resolve(
            UpdateAnnouncementUseCase
        );

        const announcement = await updateAnnouncementUseCase.execute(data);
        return response.status(201).json(announcement);
    }
}

export { UpdateAnnouncementController };
