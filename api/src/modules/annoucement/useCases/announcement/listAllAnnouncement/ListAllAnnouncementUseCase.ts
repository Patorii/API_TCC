import { Announcement } from "@modules/annoucement/entities/Announcement";
import { IAnnouncementRepository } from "@modules/annoucement/repositories/IAnnouncementRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    page: number;
    limit: number;
    order: string;
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

    async execute({ page, limit, order }: IRequest): Promise<IList> {
        const Announcement = await this.AnnouncementRepository.listAll(
            page,
            limit,
            order
        );
        return Announcement;
    }
}

export { ListAllAnnouncementUseCase };
