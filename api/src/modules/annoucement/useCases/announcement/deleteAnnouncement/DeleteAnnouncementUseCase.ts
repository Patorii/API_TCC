import { IAnnouncementRepository } from "@modules/annoucement/repositories/IAnnouncementRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
    cod_anuncio: number;
    cod_usuario: number;
}

@injectable()
class DeleteAnnouncementUseCase {
    constructor(
        @inject("AnnouncementRepository")
        private announcementRepository: IAnnouncementRepository
    ) {}

    async execute({ cod_anuncio, cod_usuario }: IRequest): Promise<void> {
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
        if (announcementExists.cod_usuario !== cod_usuario) {
            throw new AppError(
                "Não é possivel apagar o anuncio de outro usuário.",
                401
            );
        }
        await this.announcementRepository.delete(cod_anuncio);
    }
}

export { DeleteAnnouncementUseCase };
