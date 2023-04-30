import { User } from "@modules/accounts/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
    nome: string;
    cpf: string;
    cnpj: string;
    email: string;
    cod_usuario: number;
    cod_usuario_atual: number;
}

@injectable()
class UpdateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        nome,
        cpf,
        cnpj,
        email,
        cod_usuario,
        cod_usuario_atual,
    }: IRequest): Promise<User> {
        const userExists = await this.usersRepository.findById(cod_usuario);

        if (!userExists) {
            throw new AppError("Usuário não localizado.", 400);
        }
        if (userExists.cod_usuario !== cod_usuario_atual) {
            throw new AppError(
                "Não é possivel alterar os dados de outro usuário.",
                401
            );
        }

        if (!cpf && !cnpj) {
            throw new AppError("É necessário informar o CPF ou CNPJ");
        }
        if (!email) {
            throw new AppError("É necessário informar um e-mail");
        }
        if (!cpf) {
            cpf = null;
        }
        if (!cnpj) {
            cnpj = null;
        }

        const user = await this.usersRepository.update({
            nome,
            cpf,
            cnpj,
            email,
            cod_usuario,
        });
        return user;
    }
}

export { UpdateUserUseCase };
