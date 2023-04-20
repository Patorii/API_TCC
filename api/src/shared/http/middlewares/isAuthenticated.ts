import auth from "@configs/auth";
import { UsersRepository } from "@modules/accounts/repositories/knex/UsersRepository";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";

interface IPayload {
    sub: string;
}

export async function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }

    let token;
    const header = authHeader.split(" ");
    if (header[1]) {
        [, token] = header;
    } else {
        token = authHeader;
    }

    try {
        const { sub } = verify(token, auth.secret_token) as IPayload;

        const subInfo = sub.split(",");
        const cod_usuario = subInfo[0];
        const cod_cicom = Number(subInfo[1]);

        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(cod_usuario, cod_cicom);

        if (!user) {
            throw new AppError("Usuário não existe!", 401);
        }

        request.user = {
            nome: user.nome,
            cod_usuario: user.cod_usuario,
        };

        next();
    } catch {
        throw new AppError("Token inválido", 401);
    }
}
