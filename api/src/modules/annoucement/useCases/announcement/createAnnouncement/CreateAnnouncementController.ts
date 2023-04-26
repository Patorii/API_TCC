import { Response, Request } from "express";
import { container } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { CreateAnnouncementUseCase } from "./CreateAnnouncementUseCase";

class CreateAnnouncementController {
    async handle(request: Request, response: Response): Promise<Response> {
        const data = request.body;
        data.cod_usuario = request.user.cod_usuario;

        if (data.tipo) {
            data.tipo = data.tipo.toUpperCase();
            if (data.tipo !== "A" && data.tipo !== "P") {
                throw new AppError(
                    "O tipo de anuncio informado não é compativel deve ser informado: 'A' para adoção ou 'P' para perdido"
                );
            }
        }

        const createAnnouncementUseCase = container.resolve(
            CreateAnnouncementUseCase
        );

        const Announcement = await createAnnouncementUseCase.execute(data);
        return response.status(201).json(Announcement);
    }
}

export { CreateAnnouncementController };
