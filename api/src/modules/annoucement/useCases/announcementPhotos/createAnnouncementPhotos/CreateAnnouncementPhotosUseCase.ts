import { AnnouncementPhotos } from "@modules/annoucement/entities/AnnouncementPhotos";
import { IAnnouncementPhotosRepository } from "@modules/annoucement/repositories/IAnnouncementPhotosRepository";
import { IAnnouncementRepository } from "@modules/annoucement/repositories/IAnnouncementRepository";
import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-var-requires

interface IRequest {
    cod_anuncio: number;
    extensao: string;
    arquivo: string;
    capa: "N" | "S";
    cod_usuario: number;
}

@injectable()
class CreateAnnouncementPhotosUseCase {
    constructor(
        @inject("AnnouncementPhotosRepository")
        private announcementPhotosRepository: IAnnouncementPhotosRepository,
        @inject("AnnouncementRepository")
        private announcementRepository: IAnnouncementRepository
    ) {}

    async execute({
        cod_anuncio,
        extensao,
        arquivo,
        capa,
        cod_usuario,
    }: IRequest): Promise<AnnouncementPhotos> {
        if (!cod_anuncio) {
            throw new AppError("O código de anuncio deve ser informado.");
        }
        const hasAnyPhoto =
            await this.announcementPhotosRepository.listByAnnouncement(
                cod_anuncio
            );

        if (hasAnyPhoto.length === 0) {
            // eslint-disable-next-line no-param-reassign
            capa = "S";
        }

        if (capa === "S" && hasAnyPhoto.length > 0) {
            await this.announcementPhotosRepository.setAllPhotosOfAnnouncementNotDefault(
                cod_anuncio
            );
        }

        const announcement = await this.announcementRepository.findById(
            cod_anuncio
        );

        if (!announcement) {
            deleteFile(arquivo);
            throw new AppError(
                "O código de anuncio informado não foi localizado na lista."
            );
        }

        if (announcement.cod_usuario !== cod_usuario) {
            throw new AppError(
                "Não é possivel adicionar a fotos em um anuncio de outro usuário.",
                401
            );
        }
        const newAnnouncementPhotos =
            await this.announcementPhotosRepository.create({
                cod_anuncio,
                extensao,
                arquivo,
                capa,
            });

        return newAnnouncementPhotos;
    }
}

export { CreateAnnouncementPhotosUseCase };
