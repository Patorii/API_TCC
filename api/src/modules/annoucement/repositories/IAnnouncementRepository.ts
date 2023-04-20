import { IAnnouncementDTO } from "../dtos/IAnnouncementDTO";
import { Announcement } from "../entities/Announcement";

interface IList {
    data: Announcement[];
    count: number;
    limit: number;
    page: number;
    totalPages: number;
}

interface IAnnouncementRepository {
    create(data: IAnnouncementDTO): Promise<Announcement>;
    update(data: IAnnouncementDTO): Promise<Announcement>;
    delete(cod_anuncio: number): Promise<void>;
    findById(cod_anuncio: number): Promise<Announcement>;
    listAll(page: number, limit: number, order: string): Promise<IList>;
}

export { IAnnouncementRepository };
