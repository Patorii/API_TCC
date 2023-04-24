import { Announcement } from "@modules/annoucement/entities/Announcement";
import { IAnnouncementRepository } from "@modules/annoucement/repositories/IAnnouncementRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
    cod_anuncio: number;
}

@injectable()
class GetAnnouncementUseCase {
    constructor(
        @inject("AnnouncementRepository")
        private AnnouncementRepository: IAnnouncementRepository
    ) {}

    async execute({ cod_anuncio }: IRequest): Promise<Announcement> {
        if (!cod_anuncio) {
            throw new AppError("O código de anuncio deve ser informado.");
        }
        const Announcement = await this.AnnouncementRepository.findById(
            cod_anuncio
        );
        return Announcement;
    }
}

export { GetAnnouncementUseCase };
