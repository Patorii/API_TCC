import { Response, Request } from "express";
import { container } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { ListAllAnnouncementUseCase } from "./ListAllAnnouncementUseCase";

class ListAllAnnouncementController {
    async handle(request: Request, response: Response): Promise<Response> {
        const page = (request.query.page || 1) as number;
        const limit = (request.query.limit || 10) as number;
        const order = (request.query.order || "created_at") as string;
        const { uf, especie, raca, tipo } = request.body;
        let ufUpper = null;
        let especieUpper = null;
        let racaUpper = null;
        let tipoUpper = null;
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
        if (tipo) {
            tipoUpper = tipo.toUpperCase();
            if (tipoUpper !== "A" && tipoUpper !== "P") {
                throw new AppError(
                    "O tipo de anuncio informado não é compativel deve ser informado: 'A' para adoção ou 'P' para perdido"
                );
            }
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
            tipo: tipoUpper,
        });
        return response.status(200).json(list);
    }
}

export { ListAllAnnouncementController };
