import { IAnnouncementDTO } from "../dtos/IAnnouncementDTO";
import { Announcement } from "../entities/Announcement";

interface IFotoPrincipal {
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
    foto_principal: IFotoPrincipal;
}
interface IList {
    data: IListData[];
    count: number;
    limit: number;
    page: number;
    totalPages: number;
}

interface IAnnouncementRepository {
    create(data: IAnnouncementDTO): Promise<Announcement>;
    update(data: IAnnouncementDTO): Promise<Announcement>;
    findById(cod_anuncio: number): Promise<IListData>;
    listAll(
        page: number,
        limit: number,
        order: string,
        uf?: string,
        especie?: "C" | "G",
        raca?: string,
        tipo?: "A" | "P",
        sexo?: "F" | "M"
    ): Promise<IList>;
    listAllByUser(
        cod_usuario: number,
        page: number,
        limit: number,
        order: string,
        uf?: string,
        especie?: "C" | "G",
        raca?: string,
        tipo?: "A" | "P",
        sexo?: "F" | "M"
    ): Promise<IList>;
    delete(cod_anuncio: number): Promise<void>;
}

export { IAnnouncementRepository };
