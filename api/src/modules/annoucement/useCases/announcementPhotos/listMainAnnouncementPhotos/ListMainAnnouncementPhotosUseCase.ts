import { IAnnouncementPhotosRepository } from "@modules/annoucement/repositories/IAnnouncementPhotosRepository";
import { IAnnouncementRepository } from "@modules/annoucement/repositories/IAnnouncementRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-var-requires

interface IRequest {
    cod_anuncio: number;
}

interface IMainPhoto {
    foto_principal: string;
}

@injectable()
class ListMainAnnouncementPhotosUseCase {
    constructor(
        @inject("AnnouncementPhotosRepository")
        private announcementPhotosRepository: IAnnouncementPhotosRepository,
        @inject("AnnouncementRepository")
        private announcementRepository: IAnnouncementRepository
    ) {}

    async execute({ cod_anuncio }: IRequest): Promise<IMainPhoto> {
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

        const mainPhoto =
            await this.announcementPhotosRepository.getMainPhotoBase64ByCod(
                cod_anuncio
            );

        const foto = { foto_principal: "" };
        foto.foto_principal = mainPhoto.arquivo;

        return foto;
    }
}

export { ListMainAnnouncementPhotosUseCase };
