import { IUserDTO } from "@modules/accounts/dtos/IUserDTO";
import { User } from "@modules/accounts/entities/User";

interface IUsersRepository {
    create(data: IUserDTO): Promise<User>;
    update(data: IUserDTO): Promise<User>;
    delete(cod_usuario: number): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(cod_usuario: string | number): Promise<User>;
}

export { IUsersRepository };
