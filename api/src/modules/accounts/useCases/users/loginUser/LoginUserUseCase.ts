import auth from "@configs/auth";
import { IRefreshTokensRepository } from "@modules/accounts/repositories/IRefreshTokensRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    email: string;
    senha: string;
}

interface IResponse {
    token: string;
    refresh_token: string;
    expiresInMinutes: number;
    user: {
        nome: string;
        cod_usuario: number | string;
    };
}

@injectable()
class LoginUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("RefreshTokensRepository")
        private refreshTokensRepository: IRefreshTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({ email, senha }: IRequest): Promise<IResponse> {
        // usuario existe
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email ou senha incorretos!", 401);
        }

        // senha correta
        const passwordMatch = await compare(senha, user.senha);

        if (!passwordMatch) {
            throw new AppError("Email ou senha incorretos!", 401);
        }

        const userToken = await this.refreshTokensRepository.findRefreshToken(
            user.cod_usuario
        );

        if (userToken) {
            await this.refreshTokensRepository.deleteById(userToken.cod_token);
        }

        // gerar jsonwebtoken
        const token = sign({}, auth.secret_token, {
            subject: `${user.cod_usuario}`,
            expiresIn: auth.expires_in_token,
        });

        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: `${user.cod_usuario}`,
            expiresIn: auth.expires_in_refresh_token,
        });

        const expires_in = this.dateProvider.addDays(
            auth.expires_refresh_token_days
        );

        await this.refreshTokensRepository.create({
            cod_usuario: user.cod_usuario,
            refresh_token,
            expira_em: expires_in,
        });

        return {
            token,
            refresh_token,
            expiresInMinutes: auth.expires_in_token_minutes,
            user: {
                nome: user.nome,
                cod_usuario: user.cod_usuario,
            },
        };
    }
}

export { LoginUserUseCase };
