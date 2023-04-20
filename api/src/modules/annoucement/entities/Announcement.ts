class Announcement {
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

    constructor() {
        if (!this.cod_anuncio) {
            this.created_at = new Date();
            this.updated_at = new Date();
        }
    }
}

export { Announcement };
