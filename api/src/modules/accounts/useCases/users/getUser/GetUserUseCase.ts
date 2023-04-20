import { User } from "@modules/accounts/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
    cod_usuario_atual: number;
    cod_usuario: number;
}

@injectable()
class ListUsersUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ cod_usuario_atual, cod_usuario }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(cod_usuario);

        if (cod_usuario_atual !== cod_usuario) {
            throw new AppError(
                "Só é possivel ver os dados do usuário logado.",
                401
            );
        }
        return user;
    }
}

export { ListUsersUseCase };
