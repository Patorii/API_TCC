import { v4 as uuidV4 } from "uuid";

class RefreshToken {
    cod_token: number | string;
    cod_usuario: number | string;
    refresh_token: string;
    expira_em: Date;
    created_at: Date;
    updated_at: Date;

    constructor() {
        if (!this.cod_token) {
            this.cod_token = uuidV4();
            this.created_at = new Date();
            this.updated_at = new Date();
        }
    }
}

export { RefreshToken };
