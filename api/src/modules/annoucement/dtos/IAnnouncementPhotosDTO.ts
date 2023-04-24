interface IAnnouncementPhotosDTO {
    cod_foto_anuncio?: number;
    cod_anuncio: number;
    extensao: string;
    arquivo: string;
    capa: "N" | "S";
    created_at?: Date;
    updated_at?: Date;
}

export { IAnnouncementPhotosDTO };
