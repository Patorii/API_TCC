class AnnouncementPhotos {
    cod_foto_anuncio?: number;
    cod_anuncio: number;
    extensao: number;
    arquivo: string;
    capa: "N" | "S";
    created_at?: Date;
    updated_at?: Date;

    constructor() {
        if (!this.cod_foto_anuncio) {
            this.created_at = new Date();
            this.updated_at = new Date();
        }
    }
}

export { AnnouncementPhotos };
