import { Response, Request } from "express";
import { container } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { UpdateAnnouncementUseCase } from "./UpdateAnnouncementUseCase";

class UpdateAnnouncementController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { codanuncio } = request.params;

        const data = request.body;
        data.cod_anuncio = Number(codanuncio);
        data.cod_usuario = request.user.cod_usuario;

        if (data.tipo) {
            data.tipo = data.tipo.toUpperCase();
            if (data.tipo !== "A" && data.tipo !== "P") {
                throw new AppError(
                    "O tipo de anuncio informado não é compativel deve ser informado: 'A' para adoção ou 'P' para perdido"
                );
            }
        }
        const updateAnnouncementUseCase = container.resolve(
            UpdateAnnouncementUseCase
        );

        const announcement = await updateAnnouncementUseCase.execute(data);
        return response.status(201).json(announcement);
    }
}

export { UpdateAnnouncementController };
