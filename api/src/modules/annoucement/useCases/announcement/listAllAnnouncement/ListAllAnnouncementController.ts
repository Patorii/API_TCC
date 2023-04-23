import { Response, Request } from "express";
import { container } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { ListAllAnnouncementUseCase } from "./ListAllAnnouncementUseCase";

class ListAllAnnouncementController {
    async handle(request: Request, response: Response): Promise<Response> {
        const page = (request.query.page || 1) as number;
        const limit = (request.query.limit || 10) as number;
        const order = (request.query.order || "created_at") as string;
        const { uf, especie, raca } = request.body;
        let ufUpper = null;
        let especieUpper = null;
        let racaUpper = null;
        if (uf) {
            ufUpper = uf.toUpperCase();
        }
        if (especie) {
            especieUpper = especie.toUpperCase();
            if (especieUpper !== "C" && especieUpper !== "G") {
                throw new AppError(
                    "A especie informada não é compativel deve ser informado: 'C' para cachorro ou 'G' para gato"
                );
            }
        }
        if (raca) {
            racaUpper = raca.toUpperCase();
        }

        const listAllAnnouncementUseCase = container.resolve(
            ListAllAnnouncementUseCase
        );

        const list = await listAllAnnouncementUseCase.execute({
            page,
            limit,
            order,
            uf: ufUpper,
            especie: especieUpper,
            raca: racaUpper,
        });
        return response.status(200).json(list);
    }
}

export { ListAllAnnouncementController };
