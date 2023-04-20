import { Response, Request } from "express";
import { container } from "tsyringe";

import {
    ,
    ListAllAnnouncementUseCase,
} from "./ListAllAnnouncementUseCase";

class ListAllAnnouncementController {
    async handle(request: Request, response: Response): Promise<Response> {
        const page = (request.query.page || 1) as number;
        const limit = (request.query.limit || 10) as number;
        const order = (request.query.order || "created_at") as string;
        
        const listAllAnnouncementUseCase = container.resolve(
            ListAllAnnouncementUseCase
        );

        const list = await listAllAnnouncementUseCase.execute({page, limit, order});
        return response.status(200).json(list);
    }
}

export { ListAllAnnouncementController };
