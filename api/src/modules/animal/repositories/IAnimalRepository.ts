import { IAnimalDTO } from "../dtos/IAnimalDTO";
import { Animal } from "../entities/Animal";

interface IAnimalRepository {
    create(data: IAnimalDTO): Promise<Animal>;
    update(data: IAnimalDTO): Promise<Animal>;
    delete(cod_usuario: number): Promise<void>;
    findById(cod_usuario: number): Promise<Animal>;
}

export { IAnimalRepository };
