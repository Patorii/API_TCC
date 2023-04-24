import { Response, Request } from "express";
import { container } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { CreateAnnouncementPhotosUseCase } from "./CreateAnnouncementPhotosUseCase";

interface IFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
}

class CreateAnnouncementPhotosController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { codanuncio } = request.params;
        const cod_anuncio = Number(codanuncio);
        // eslint-disable-next-line prettier/prettier, dot-notation
        const file:IFile = request.files['foto'][0]
        const fileName = file.filename.substring(0, file.filename.indexOf("."));
        const fileExtension = file.filename.split(".")[1];

        let { capa } = request.body;
        if (capa) {
            capa = capa.toUpperCase();
            if (capa !== "S" && capa !== "N") {
                throw new AppError(
                    "A opção de capa informada não é compativel deve ser informado: 'S' para sim ou 'N' para não"
                );
            }
        } else {
            capa = "N";
        }

        // const criada e passada apenas pra facilitar possiveis futuras alterações na destination

        const data = {
            cod_anuncio,
            capa,
            extensao: fileExtension,
            arquivo: `${file.destination}/${fileName}.${fileExtension}`,
            cod_usuario: request.user.cod_usuario,
        };

        const createAnnouncementPhotosUseCase = container.resolve(
            CreateAnnouncementPhotosUseCase
        );

        const announcementPhoto = await createAnnouncementPhotosUseCase.execute(
            data
        );
        return response.status(201).json(announcementPhoto);
    }
}

export { CreateAnnouncementPhotosController };
