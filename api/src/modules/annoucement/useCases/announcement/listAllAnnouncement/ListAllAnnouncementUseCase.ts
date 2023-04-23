import { Announcement } from "@modules/annoucement/entities/Announcement";
import { IAnnouncementRepository } from "@modules/annoucement/repositories/IAnnouncementRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    page: number;
    limit: number;
    order: string;
    uf?: string;
    especie?: "C" | "G";
    raca?: string;
}
interface IList {
    data: Announcement[];
    count: number;
    limit: number;
    page: number;
    totalPages: number;
}
@injectable()
class ListAllAnnouncementUseCase {
    constructor(
        @inject("AnnouncementRepository")
        private AnnouncementRepository: IAnnouncementRepository
    ) {}

    async execute({
        page,
        limit,
        order,
        uf,
        especie,
        raca,
    }: IRequest): Promise<IList> {
        const Announcement = await this.AnnouncementRepository.listAll(
            page,
            limit,
            order,
            uf,
            especie,
            raca
        );
        return Announcement;
    }
}

export { ListAllAnnouncementUseCase };
