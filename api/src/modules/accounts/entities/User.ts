import { v4 as uuidV4 } from "uuid";

class User {
    cod_usuario?: string | number;
    cpf: string;
    cnpj: string;
    nome: string;
    senha?: string;
    email: string;
    created_at?: Date;
    updated_at?: Date;

    constructor() {
        if (!this.cod_usuario) {
            this.cod_usuario = uuidV4();
            this.created_at = new Date();
            this.updated_at = new Date();
        }
    }
}

export { User };
