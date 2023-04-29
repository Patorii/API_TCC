import { User } from "@modules/accounts/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const passwordComplexity = require("joi-password-complexity");

interface IRequest {
    nome: string;
    cpf: string;
    cnpj: string;
    email: string;
    senha?: string;
    cod_usuario?: number | string;
}

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ nome, cpf, cnpj, email, senha }: IRequest): Promise<User> {
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

        const complexityOptions = {
            min: 6,
            max: 30,
            lowerCase: 1,
            upperCase: 1,
            numeric: 1,
            symbol: 0,
        };
        const passwordCheck = passwordComplexity(
            complexityOptions,
            "A senha"
        ).validate(senha);

        if (passwordCheck.error) {
            const msg = passwordCheck.error.details.map((error) => {
                let result = "";
                if (error.type === "passwordComplexity.uppercase") {
                    result = `A senha deve conter ao menos ${complexityOptions.upperCase} caracteres maiúsculos`;
                }
                if (error.type === "passwordComplexity.lowercase") {
                    result = `A senha deve conter ao menos ${complexityOptions.lowerCase} caracteres minúsculos`;
                }
                if (error.type === "passwordComplexity.tooShort") {
                    result = `A senha deve ter no mínimo ${complexityOptions.min} caracteres`;
                }
                if (error.type === "passwordComplexity.tooLong") {
                    result = `A senha deve ter no máximo ${complexityOptions.max} caracteres`;
                }
                if (error.type === "passwordComplexity.numeric") {
                    result = `A senha deve conter ao menos ${complexityOptions.numeric} números`;
                }
                if (error.type === "passwordComplexity.symbol") {
                    result = `A senha deve conter ao menos ${complexityOptions.numeric} caracter especial exemplo: $ % & # @`;
                }
                return `${result}`;
            });
            throw new AppError(msg, 406);
        }

        const passwordHash = await hash(senha, 8);

        const newUser = await this.usersRepository.create({
            nome,
            cpf,
            cnpj,
            email,
            senha: passwordHash,
        });
        return newUser;
    }
}

export { CreateUserUseCase };
