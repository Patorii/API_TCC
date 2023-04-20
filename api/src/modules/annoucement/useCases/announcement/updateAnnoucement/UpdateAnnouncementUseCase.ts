import { Announcement } from "@modules/annoucement/entities/Announcement";
import { IAnnouncementRepository } from "@modules/annoucement/repositories/IAnnouncementRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-var-requires
interface IRequest {
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
    created_at?: Date;
    updated_at?: Date;
}

@injectable()
class UpdateAnnouncementUseCase {
    constructor(
        @inject("AnnouncementRepository")
        private announcementRepository: IAnnouncementRepository
    ) {}

    async execute(data: IRequest): Promise<Announcement> {
        const announcementExists = await this.announcementRepository.findById(
            data.cod_anuncio
        );
        if (!announcementExists) {
            throw new AppError(
                "O código de anuncio informado não foi localizado na lista.",
                404
            );
        }
        if (announcementExists.cod_usuario !== data.cod_usuario) {
            throw new AppError(
                "Não é possivel alterar o anuncio de outro usuário.",
                401
            );
        }

        const announcement = await this.announcementRepository.update(data);
        return announcement;
    }
}

export { UpdateAnnouncementUseCase };
