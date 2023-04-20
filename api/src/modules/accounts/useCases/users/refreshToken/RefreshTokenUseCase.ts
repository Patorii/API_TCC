import auth from "@configs/auth";
import { IRefreshTokensRepository } from "@modules/accounts/repositories/IRefreshTokensRepository";
import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
    sub: string;
    email: string;
}

interface ITokenResponse {
    token: string;
    refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("RefreshTokensRepository")
        private refreshTokensRepository: IRefreshTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute(token: string): Promise<ITokenResponse> {
        const decode = verify(token, auth.secret_refresh_token) as IPayload;

        const { sub, email } = decode;

        // const subInfo = sub.split(",");
        // const cod_usuario = subInfo[0];
        const cod_usuario = sub;

        const userToken =
            await this.refreshTokensRepository.findByUserIdAndRefreshToken(
                cod_usuario,
                token
            );

        if (!userToken) {
            throw new AppError("Refresh Token não existe", 401);
        }

        await this.refreshTokensRepository.deleteById(userToken.cod_token);

        const newToken = sign({}, auth.secret_token, {
            subject: `${cod_usuario}`,
            expiresIn: auth.expires_in_token,
        });

        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: `${cod_usuario}`,
            expiresIn: auth.expires_in_refresh_token,
        });

        const expira_em = this.dateProvider.addDays(
            auth.expires_refresh_token_days
        );
        await this.refreshTokensRepository.create({
            refresh_token,
            cod_usuario,
            expira_em,
        });

        return { token: newToken, refresh_token };
    }
}

export { RefreshTokenUseCase };
