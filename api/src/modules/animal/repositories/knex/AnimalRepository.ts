import { db } from "@configs/mariadb";
import { IAnimalDTO } from "@modules/accounts/dtos/IAnimalDTO";
import { Animal } from "@modules/accounts/entities/Animal";

import { AppError } from "@shared/errors/AppError";
import { dbHelper } from "@shared/knex/helper";

import { IAnimalRepository } from "../IAnimalRepository";

class AnimalRepository implements IAnimalRepository {
    async create(data: IAnimalDTO): Promise<Animal> {
        const animal = await dbHelper.insert({
            table: "animais",
            pkField: "cod_animal",
            checkRepeatedField: [],
            entity: "animal",
            entityArticle: "o",
            data,
        });

        return animal;
    }

    async update(data: IAnimalDTO): Promise<Animal> {
        const animal = await dbHelper.update({
            table: "animais",
            pkField: "cod_animal",
            checkRepeatedField: [],
            entity: "animal",
            entityArticle: "o",
            data,
        });

        return animal;
    }

    async findById(cod_animal: number | string): Promise<Animal> {
        try {
            const animal = await db("animais").where({ cod_animal }).first();
            if (!animal) {
                throw new AppError("Animal não localizado.", 404);
            }
            return animal;
        } catch (error) {
            throw new AppError(error);
        }
    }
    async delete(cod_animal: number): Promise<void> {
        try {
            const Animal = await db("animais").where({ cod_animal }).first();

            if (!Animal) {
                throw new AppError(
                    "Animal não localizado, não foi possivel realizar a exclusão.",
                    404
                );
            } else {
                await db("animais").where(cod_animal);
            }
        } catch {
            throw new AppError(
                "Falha ao tentar excluir animal, tente novamente",
                400
            );
        }
    }
}

export { AnimalRepository };
