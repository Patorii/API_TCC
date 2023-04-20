interface IUserDTO {
    cod_usuario?: string | number;
    cpf: number;
    cnpj: number;
    nome: string;
    senha?: string;
    email: string;
    created_at?: Date;
    updated_at?: Date;
}

export { IUserDTO };
