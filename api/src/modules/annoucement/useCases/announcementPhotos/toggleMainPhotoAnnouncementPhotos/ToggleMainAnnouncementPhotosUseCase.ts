import { AnnouncementPhotos } from "@modules/annoucement/entities/AnnouncementPhotos";
import { IAnnouncementPhotosRepository } from "@modules/annoucement/repositories/IAnnouncementPhotosRepository";
import { IAnnouncementRepository } from "@modules/annoucement/repositories/IAnnouncementRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-var-requires

interface IRequest {
    cod_foto_anuncio: number;
    cod_usuario: number;
}

@injectable()
class ToggleMainAnnouncementPhotosUseCase {
    constructor(
        @inject("AnnouncementPhotosRepository")
        private announcementPhotosRepository: IAnnouncementPhotosRepository,
        @inject("AnnouncementRepository")
        private announcementRepository: IAnnouncementRepository
    ) {}

    async execute({
        cod_foto_anuncio,
        cod_usuario,
    }: IRequest): Promise<AnnouncementPhotos> {
        if (!cod_foto_anuncio) {
            throw new AppError(
                "O código da foto do anuncio deve ser informado."
            );
        }
        const announcementPhotosExists =
            await this.announcementPhotosRepository.findById(cod_foto_anuncio);

        if (!announcementPhotosExists) {
            throw new AppError(
                "O código da foto de anuncio informado não foi localizado na lista.",
                404
            );
        }

        const announcement = await this.announcementRepository.findById(
            announcementPhotosExists.cod_anuncio
        );

        if (announcement.cod_usuario !== cod_usuario) {
            throw new AppError(
                "Não é possivel alterar a foto de capa de um anuncio de outro usuário.",
                401
            );
        }

        return this.announcementPhotosRepository.setDefaultPhoto(
            cod_foto_anuncio
        );
    }
}

export { ToggleMainAnnouncementPhotosUseCase };
