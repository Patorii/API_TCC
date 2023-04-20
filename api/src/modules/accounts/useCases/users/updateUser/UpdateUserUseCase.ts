import { User } from "@modules/accounts/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
    nome: string;
    cpf: number;
    cnpj: number;
    email: string;
    cod_usuario: number;
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
    }: IRequest): Promise<User> {
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

        const userExists = await this.usersRepository.findById(cod_usuario);

        if (!userExists) {
            throw new AppError("Usuário não localizado.", 400);
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
