import { AnnouncementPhotos } from "@modules/annoucement/entities/AnnouncementPhotos";
import { IAnnouncementPhotosRepository } from "@modules/annoucement/repositories/IAnnouncementPhotosRepository";
import { IAnnouncementRepository } from "@modules/annoucement/repositories/IAnnouncementRepository";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-var-requires

interface IRequest {
    cod_anuncio: number;
}

interface IList {
    cod_foto_anuncio?: number;
    cod_anuncio: number;
    extensao: string;
    arquivo: string;
    capa: "N" | "S";
    foto: string;
    created_at?: Date;
    updated_at?: Date;
}

@injectable()
class ListAllAnnouncementPhotosUseCase {
    constructor(
        @inject("AnnouncementPhotosRepository")
        private announcementPhotosRepository: IAnnouncementPhotosRepository,
        @inject("AnnouncementRepository")
        private announcementRepository: IAnnouncementRepository
    ) {}

    async execute({ cod_anuncio }: IRequest): Promise<IList[]> {
        if (!cod_anuncio) {
            throw new AppError("O código de anuncio deve ser informado.");
        }

        const announcementExists = await this.announcementRepository.findById(
            cod_anuncio
        );

        if (!announcementExists) {
            throw new AppError(
                "O código de anuncio informado não foi localizado na lista.",
                404
            );
        }

        const announcementPhotos =
            await this.announcementPhotosRepository.listByAnnouncement(
                cod_anuncio
            );

        const photos = await announcementPhotos.map((item) => {
            const fileName = item.arquivo.substring(
                item.arquivo.lastIndexOf("/") + 1
            );
            if (announcementPhotos.length === 0) {
                return { ...item, foto: "" };
            }
            const imageFile = `./tmp/anuncio/${cod_anuncio}/images/${fileName}`;
            const bitmap = fs.readFileSync(imageFile);
            const foto = Buffer.from(bitmap).toString("base64");

            return { ...item, foto };
        });
        return photos;
    }
}

export { ListAllAnnouncementPhotosUseCase };
