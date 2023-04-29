/* eslint-disable no-restricted-syntax */
import { IAnnouncementPhotosRepository } from "@modules/annoucement/repositories/IAnnouncementPhotosRepository";
import { IAnnouncementRepository } from "@modules/annoucement/repositories/IAnnouncementRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
    cod_usuario: number;
    page: number;
    limit: number;
    order: string;
    uf?: string;
    especie?: "C" | "G";
    raca?: string;
    tipo?: "A" | "P";
    sexo?: "F" | "M";
}
interface IPhotoBase64 {
    foto: string;
    extensao: string;
}

interface IListData {
    cod_anuncio: number;
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
    tel: string;
    tel2: string;
    tipo: "A" | "P";
    nome_animal: string;
    especie: "C" | "G";
    idade: string;
    raca: string;
    cor: string;
    sexo: "F" | "M";
    nome: string;
    email: string;
    created_at: string;
    updated_at: string;
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
class ListAllByUserAnnouncementUseCase {
    constructor(
        @inject("AnnouncementRepository")
        private AnnouncementRepository: IAnnouncementRepository,
        @inject("AnnouncementPhotosRepository")
        private announcementPhotosRepository: IAnnouncementPhotosRepository
    ) {}

    async execute({
        cod_usuario,
        page,
        limit,
        order,
        uf,
        especie,
        raca,
        tipo,
        sexo,
    }: IRequest): Promise<IList> {
        if (!cod_usuario) {
            throw new AppError("O código do usuario deve ser informado.");
        }

        const Announcement = await this.AnnouncementRepository.listAllByUser(
            cod_usuario,
            page,
            limit,
            order,
            uf,
            especie,
            raca,
            tipo,
            sexo
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

export { ListAllByUserAnnouncementUseCase };
