interface IRefreshTokenDTO {
    cod_token?: string | number;
    cod_usuario: string | number;
    refresh_token: string;
    expira_em: Date;
    created_at?: Date;
    updated_at?: Date;
}

export { IRefreshTokenDTO };
