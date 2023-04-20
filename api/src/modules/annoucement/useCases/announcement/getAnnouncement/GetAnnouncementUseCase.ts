import { Announcement } from "@modules/annoucement/entities/Announcement";
import { IAnnouncementRepository } from "@modules/annoucement/repositories/IAnnouncementRepository";
import { inject, injectable } from "tsyringe";

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
        const Announcement = await this.AnnouncementRepository.findById(
            cod_anuncio
        );
        return Announcement;
    }
}

export { GetAnnouncementUseCase };
