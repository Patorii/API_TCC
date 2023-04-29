import { Response, Request } from "express";
import { container } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { ListAllByUserAnnouncementUseCase } from "./ListAllAnnouncementUseCase";

class ListAllByUserAnnouncementController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { codusuario } = request.params;
        const cod_usuario = Number(codusuario);
        const page = (request.query.page || 1) as number;
        const limit = (request.query.limit || 10) as number;
        const order = (request.query.order || "created_at") as string;
        const { uf, especie, raca, tipo, sexo } = request.body;
        let ufUpper = null;
        let especieUpper = null;
        let racaUpper = null;
        let tipoUpper = null;
        let sexoUpper = null;
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
        if (sexo) {
            sexoUpper = sexo.toUpperCase();
            if (sexoUpper !== "F" && sexoUpper !== "M") {
                throw new AppError(
                    "O sexo informado não é compativel deve ser informado: 'F' para femea ou 'M' para macho"
                );
            }
        }

        const listAllByUserAnnouncementUseCase = container.resolve(
            ListAllByUserAnnouncementUseCase
        );

        const list = await listAllByUserAnnouncementUseCase.execute({
            cod_usuario,
            page,
            limit,
            order,
            uf: ufUpper,
            especie: especieUpper,
            raca: racaUpper,
            tipo: tipoUpper,
            sexo: sexoUpper,
        });
        return response.status(200).json(list);
    }
}

export { ListAllByUserAnnouncementController };
