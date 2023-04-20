import { db } from "@configs/mariadb";
import { IRefreshTokenDTO } from "@modules/accounts/dtos/IRefreshTokenDTO";
import { RefreshToken } from "@modules/accounts/entities/RefreshToken";

import { AppError } from "@shared/errors/AppError";
import { dbHelper } from "@shared/knex/helper";

import { IRefreshTokensRepository } from "../IRefreshTokensRepository";

class RefreshTokensRepository implements IRefreshTokensRepository {
    async create({
        refresh_token,
        cod_usuario,

        expira_em,
    }: IRefreshTokenDTO): Promise<RefreshToken> {
        const token = await dbHelper.insert({
            table: "refresh_tokens",
            pkField: "cod_token",
            checkRepeatedField: [],
            entity: "refresh token",
            entityArticle: "o",

            data: {
                refresh_token,
                cod_usuario,

                expira_em,
            },
        });

        return token;
    }

    async findByUserIdAndRefreshToken(
        cod_usuario: string | number,

        refresh_token: string
    ): Promise<RefreshToken> {
        try {
            const token = await db("refresh_tokens")
                .where({ cod_usuario })
                .where({ refresh_token })
                .first();

            if (!token) {
                throw new AppError("Refresh token não localizado.", 406);
            }

            return token;
        } catch (error) {
            throw new AppError(error);
        }
    }

    async findRefreshToken(
        cod_usuario: string | number
    ): Promise<RefreshToken> {
        try {
            const token = await db("refresh_tokens")
                .where({ cod_usuario })
                .first();

            return token;
        } catch (error) {
            throw new AppError(error);
        }
    }

    async deleteById(cod_token: number | string): Promise<void> {
        await db("refresh_tokens").where({ cod_token }).del();
        return null;
    }

    async findByUserByRefreshToken(
        refresh_token: string
    ): Promise<RefreshToken> {
        try {
            const token = await db("refresh_tokens")
                .where({ refresh_token })
                .first();

            if (!token) {
                throw new AppError("Refresh token não localizado.", 406);
            }

            return token;
        } catch (error) {
            throw new AppError(error);
        }
    }
}

export { RefreshTokensRepository };
