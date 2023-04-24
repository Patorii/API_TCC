import { IAnnouncementPhotosRepository } from "@modules/annoucement/repositories/IAnnouncementPhotosRepository";
import { IAnnouncementRepository } from "@modules/annoucement/repositories/IAnnouncementRepository";
import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
    cod_foto_anuncio: number;
    cod_usuario: number;
}

@injectable()
class DeleteAnnouncementPhotosUseCase {
    constructor(
        @inject("AnnouncementPhotosRepository")
        private announcementPhotosRepository: IAnnouncementPhotosRepository,
        @inject("AnnouncementRepository")
        private announcementRepository: IAnnouncementRepository
    ) {}

    async execute({ cod_foto_anuncio, cod_usuario }: IRequest): Promise<void> {
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
                "Não é possivel apagar a foto de anuncio de outro usuário.",
                401
            );
        }

        // apaga a foto
        await this.announcementPhotosRepository.delete(cod_foto_anuncio);

        await deleteFile(announcementPhotosExists.arquivo);

        // deixar outra foto como principal
        if (announcementPhotosExists.capa === "S") {
            const photos =
                await this.announcementPhotosRepository.listByAnnouncement(
                    announcementPhotosExists.cod_anuncio
                );
            if (photos.length > 0) {
                await this.announcementPhotosRepository.setDefaultPhoto(
                    photos[0].cod_foto_anuncio
                );
            }
        }
    }
}

export { DeleteAnnouncementPhotosUseCase };
