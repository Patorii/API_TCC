/* eslint-disable no-restricted-syntax */
import { IAnnouncementPhotosRepository } from "@modules/annoucement/repositories/IAnnouncementPhotosRepository";
import { IAnnouncementRepository } from "@modules/annoucement/repositories/IAnnouncementRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    page: number;
    limit: number;
    order: string;
    uf?: string;
    especie?: "C" | "G";
    raca?: string;
    tipo?: "A" | "P";
}
interface IPhotoBase64 {
    foto: string;
    extensao: string;
}

interface IListData {
    cod_anuncio?: number;
    cod_usuario: number;
    cod_animal: number;
    descricao: string;
    cep: number;
    uf: string;
    cidade: string;
    bairro: string;
    endereco: string;
    numero: number;
    complemento: string;
    data_anuncio: Date;
    created_at?: Date;
    updated_at?: Date;
    foto_principal: IPhotoBase64;
}
interface IList {
    data: IListData[];
    count: number;
    limit: number;
    page: number;
    totalPages: number;
}
@injectable()
class ListAllAnnouncementUseCase {
    constructor(
        @inject("AnnouncementRepository")
        private AnnouncementRepository: IAnnouncementRepository,
        @inject("AnnouncementPhotosRepository")
        private announcementPhotosRepository: IAnnouncementPhotosRepository
    ) {}

    async execute({
        page,
        limit,
        order,
        uf,
        especie,
        raca,
        tipo,
    }: IRequest): Promise<IList> {
        const Announcement = await this.AnnouncementRepository.listAll(
            page,
            limit,
            order,
            uf,
            especie,
            raca,
            tipo
        );

        const treatedAnnouncement = [{} as IListData];
        // pois ao inicializar pode criar um item vazio
        treatedAnnouncement.shift();

        for (const anuncio of Announcement.data) {
            const announcementBase64 =
                // eslint-disable-next-line no-await-in-loop
                await this.announcementPhotosRepository.getMainPhotoBase64ByCod(
                    anuncio.cod_anuncio
                );
            anuncio.foto_principal = announcementBase64;

            treatedAnnouncement.push(anuncio);
        }
        Announcement.data = treatedAnnouncement;

        return Announcement;
    }
}

export { ListAllAnnouncementUseCase };
