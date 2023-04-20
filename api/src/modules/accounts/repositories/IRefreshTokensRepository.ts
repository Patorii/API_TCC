import { IRefreshTokenDTO } from "../dtos/IRefreshTokenDTO";
import { RefreshToken } from "../entities/RefreshToken";

interface IRefreshTokensRepository {
    create({
        refresh_token,
        cod_usuario,
        expira_em,
    }: IRefreshTokenDTO): Promise<RefreshToken>;

    findByUserIdAndRefreshToken(
        cod_usuario: number | string,
        refresh_token: string
    ): Promise<RefreshToken>;

    findRefreshToken(cod_usuario: number | string): Promise<RefreshToken>;

    deleteById(cod_token: number | string): Promise<void>;

    findByUserByRefreshToken(refresh_token: string): Promise<RefreshToken>;
}

export { IRefreshTokensRepository };
