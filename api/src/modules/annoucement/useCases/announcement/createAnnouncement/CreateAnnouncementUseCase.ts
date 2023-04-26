import { Announcement } from "@modules/annoucement/entities/Announcement";
import { IAnnouncementRepository } from "@modules/annoucement/repositories/IAnnouncementRepository";
import { inject, injectable } from "tsyringe";

// eslint-disable-next-line @typescript-eslint/no-var-requires

interface IRequest {
    cod_usuario: number;
    cod_animal: number;
    tipo: "A" | "P";
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
}

@injectable()
class CreateAnnouncementUseCase {
    constructor(
        @inject("AnnouncementRepository")
        private announcementRepository: IAnnouncementRepository
    ) {}

    async execute(data: IRequest): Promise<Announcement> {
        const newAnnouncement = await this.announcementRepository.create(data);
        return newAnnouncement;
    }
}

export { CreateAnnouncementUseCase };
