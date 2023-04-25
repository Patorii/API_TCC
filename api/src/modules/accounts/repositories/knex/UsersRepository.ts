import { db } from "@configs/mariadb";
import { IUserDTO } from "@modules/accounts/dtos/IUserDTO";
import { User } from "@modules/accounts/entities/User";

import { AppError } from "@shared/errors/AppError";
import { dbHelper } from "@shared/knex/helper";

import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
    async create(data: IUserDTO): Promise<User> {
        const user = await dbHelper.insert({
            table: "usuarios",
            pkField: "cod_usuario",
            checkRepeatedField: [
                { field: "cpf", description: "CPF" },
                { field: "cnpj", description: "CNPJ" },
                { field: "email", description: "e-mail" },
            ],
            entity: "usuário",
            entityArticle: "o",
            data,
        });

        delete user.senha;
        return user;
    }

    async update(data: IUserDTO): Promise<User> {
        const user = await dbHelper.update({
            table: "usuarios",
            pkField: "cod_usuario",
            checkRepeatedField: [
                { field: "cpf", description: "CPF" },
                { field: "cnpj", description: "CNPJ" },
                { field: "email", description: "e-mail" },
            ],
            entity: "usuário",
            entityArticle: "o",
            data,
        });

        if (user.senha) {
            delete user.senha;
        }

        return user;
    }

    async findById(cod_usuario: number | string): Promise<User> {
        try {
            const user = await db("usuarios").where({ cod_usuario }).first();
            if (!user) {
                throw new AppError("Usuário não localizado.", 404);
            }

            delete user.senha;

            return user;
        } catch (error) {
            throw new AppError(error);
        }
    }
    async findByIdWithPassword(cod_usuario: number | string): Promise<User> {
        try {
            const user = await db("usuarios").where({ cod_usuario }).first();
            if (!user) {
                throw new AppError("Usuário não localizado.", 404);
            }

            return user;
        } catch (error) {
            throw new AppError(error);
        }
    }
    async findByEmail(email: string): Promise<User> {
        try {
            const user = await db("usuarios").where({ email }).first();

            if (!user) {
                throw new AppError("Usuário não localizado.", 406);
            }

            return user;
        } catch (error) {
            throw new AppError(error);
        }
    }
    async delete(cod_usuario: number): Promise<void> {
        try {
            const user = await db("usuarios").where({ cod_usuario }).first();

            if (!user) {
                throw new AppError(
                    "Usuário não localizado, não foi possivel realizar a exclusão.",
                    404
                );
            } else {
                await db("usuarios").where(cod_usuario);
            }
        } catch {
            throw new AppError(
                "Falha ao tentar excluir usuário, tente novamente",
                400
            );
        }
    }
}

export { UsersRepository };
