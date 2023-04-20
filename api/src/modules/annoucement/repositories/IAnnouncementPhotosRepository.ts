import { IAnnouncementPhotosDTO } from "../dtos/IAnnouncementPhotosDTO";
import { AnnouncementPhotos } from "../entities/AnnouncementPhotos";

interface IAnnouncementPhotosRepository {
    create(data: IAnnouncementPhotosDTO): Promise<AnnouncementPhotos>;
    update(data: IAnnouncementPhotosDTO): Promise<AnnouncementPhotos>;
    delete(cod_foto_anuncio: number): Promise<void>;
    findById(cod_foto_anuncio: number): Promise<AnnouncementPhotos>;
    findByDefault(): Promise<AnnouncementPhotos>;
    listByAnnouncement(cod_anuncio: number): Promise<AnnouncementPhotos[]>;
}

export { IAnnouncementPhotosRepository };
