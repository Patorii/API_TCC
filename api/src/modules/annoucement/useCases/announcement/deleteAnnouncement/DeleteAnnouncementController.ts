import { Response, Request } from "express";
import { container } from "tsyringe";

import { DeleteAnnouncementUseCase } from "./DeleteAnnouncementUseCase";

class DeleteAnnouncementController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { codanuncio } = request.params;
        const cod_anuncio = Number(codanuncio);

        const deleteAnnouncementUseCase = container.resolve(
            DeleteAnnouncementUseCase
        );

        const list = await deleteAnnouncementUseCase.execute({
            cod_anuncio,
            cod_usuario: request.user.cod_usuario,
        });
        return response.status(200).json(list);
    }
}

export { DeleteAnnouncementController };
