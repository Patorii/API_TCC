class Animal {
    cod_animal?: number;
    cod_usuario: number;
    especie: "C" | "G";
    nome: string;
    idade: string;
    raca: string;
    cor: string;
    created_at?: Date;
    updated_at?: Date;

    constructor() {
        if (!this.cod_animal) {
            this.created_at = new Date();
            this.updated_at = new Date();
        }
    }
}

export { Animal };
