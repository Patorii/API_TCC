import { Announcement } from "@modules/annoucement/entities/Announcement";
import { IAnnouncementPhotosRepository } from "@modules/annoucement/repositories/IAnnouncementPhotosRepository";
import { IAnnouncementRepository } from "@modules/annoucement/repositories/IAnnouncementRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
    cod_anuncio: number;
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
@injectable()
class GetAnnouncementUseCase {
    constructor(
        @inject("AnnouncementRepository")
        private AnnouncementRepository: IAnnouncementRepository,
        @inject("AnnouncementPhotosRepository")
        private announcementPhotosRepository: IAnnouncementPhotosRepository
    ) {}

    async execute({ cod_anuncio }: IRequest): Promise<IListData> {
        if (!cod_anuncio) {
            throw new AppError("O código de anuncio deve ser informado.");
        }
        const Announcement: IListData =
            await this.AnnouncementRepository.findById(cod_anuncio);

        if (!Announcement) {
            throw new AppError(
                "O código de anúncio informado, não foi localizado na lista."
            );
        }
        const announcementBase64 =
            await this.announcementPhotosRepository.getMainPhotoBase64ByCod(
                cod_anuncio
            );

        Announcement.foto_principal = announcementBase64;

        return Announcement;
    }
}

export { GetAnnouncementUseCase };
