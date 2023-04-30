import { User } from "@modules/accounts/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { compare, hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const passwordComplexity = require("joi-password-complexity");

interface IRequest {
    senha_atual: string;
    nova_senha: string;
    cod_usuario: number;
    cod_usuario_logado: number | string;
}

@injectable()
class UpdatePasswordUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        senha_atual,
        nova_senha,
        cod_usuario,
        cod_usuario_logado,
    }: IRequest): Promise<User> {
        if (cod_usuario !== cod_usuario_logado) {
            throw new AppError(
                "Só é possível atualizar a senha do usuário logado.",
                401
            );
        }

        const userExists = await this.usersRepository.findByIdWithPassword(
            cod_usuario
        );

        if (!userExists) {
            throw new AppError("Usuário não localizado.", 406);
        }

        // senha correta
        const passwordMatch = await compare(senha_atual, userExists.senha);
        if (!passwordMatch) {
            throw new AppError("Senha atual incorreta!", 401);
        }

        const complexityOptions = {
            min: 6,
            max: 30,
            lowerCase: 1,
            upperCase: 1,
            numeric: 1,
            symbol: 1,
        };
        const passwordCheck = passwordComplexity(
            complexityOptions,
            "A nova senha"
        ).validate(nova_senha);

        if (passwordCheck.error) {
            const msg = passwordCheck.error.details.map((error) => {
                let result = "";
                if (error.type === "passwordComplexity.uppercase") {
                    result = `A nova senha deve conter ao menos ${complexityOptions.upperCase} caracteres maiúsculos`;
                }
                if (error.type === "passwordComplexity.lowercase") {
                    result = `A a nova senha deve conter ao menos ${complexityOptions.lowerCase} caracteres minúsculos`;
                }
                if (error.type === "passwordComplexity.tooShort") {
                    result = `A a nova senha deve ter no mínimo ${complexityOptions.min} caracteres`;
                }
                if (error.type === "passwordComplexity.tooLong") {
                    result = `A a nova senha deve ter no máximo ${complexityOptions.max} caracteres`;
                }
                if (error.type === "passwordComplexity.numeric") {
                    result = `A a nova senha deve conter ao menos ${complexityOptions.numeric} números`;
                }
                if (error.type === "passwordComplexity.symbol") {
                    result = `A a nova senha deve conter ao menos ${complexityOptions.numeric}
                     caracter especial exemplo: $ % & # @`;
                }
                return `${result}`;
            });
            throw new AppError(msg, 406);
        }
        const passwordHash = await hash(nova_senha, 8);

        const user = await this.usersRepository.update({
            nome: userExists.nome,
            email: userExists.email,
            cpf: userExists.cpf,
            cnpj: userExists.cnpj,
            senha: passwordHash,
            cod_usuario,
        });
        return user;
    }
}

export { UpdatePasswordUserUseCase };
