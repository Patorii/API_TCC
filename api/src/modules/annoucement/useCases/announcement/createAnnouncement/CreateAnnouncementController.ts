import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateAnnouncementUseCase } from "./CreateAnnouncementUseCase";

class CreateAnouncementController {
    async handle(request: Request, response: Response): Promise<Response> {
        const data = request.body;
        data.cod_usuario = request.user.cod_usuario;

        const createAnnouncementUseCase = container.resolve(
            CreateAnnouncementUseCase
        );

        const Announcement = await createAnnouncementUseCase.execute(data);
        return response.status(201).json(Announcement);
    }
}

export { CreateAnouncementController };
