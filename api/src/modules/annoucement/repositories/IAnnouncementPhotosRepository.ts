import { IAnnouncementPhotosDTO } from "../dtos/IAnnouncementPhotosDTO";
import { AnnouncementPhotos } from "../entities/AnnouncementPhotos";

interface IPhotoBase64 {
    arquivo: string;
    extensao: string;
}

interface IAnnouncementPhotosRepository {
    create(data: IAnnouncementPhotosDTO): Promise<AnnouncementPhotos>;
    delete(cod_foto_anuncio: number): Promise<void>;
    findById(cod_foto_anuncio: number): Promise<AnnouncementPhotos>;
    findByDefault(cod_anuncio: number): Promise<AnnouncementPhotos>;
    listByAnnouncement(cod_anuncio: number): Promise<AnnouncementPhotos[]>;
    setAllPhotosOfAnnouncementNotDefault(cod_anuncio): Promise<void>;
    setDefaultPhoto(cod_foto_anuncio): Promise<AnnouncementPhotos>;
    getMainPhotoBase64ByCod(cod_anuncio: number): Promise<IPhotoBase64>;
}

export { IAnnouncementPhotosRepository };
