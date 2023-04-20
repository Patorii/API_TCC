declare namespace Express {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface Request {
        user: {
            nome: number | string;
            cod_usuario: number;
            cpf?: number;
            cnpj?: number;
            login?: string;
            email?: string;
        };
    }
}
