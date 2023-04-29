import { db } from "@configs/mariadb";
import { IAnimalDTO } from "@modules/animal/dtos/IAnimalDTO";
import { Animal } from "@modules/animal/entities/Animal";
import fs from "fs";

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

    async findById(cod_animal: number): Promise<Animal> {
        try {
            const animal = await db("animais").where({ cod_animal }).first();

            return animal;
        } catch (error) {
            throw new AppError(error);
        }
    }
    async delete(cod_animal: number): Promise<void> {
        try {
            const announcement = await db("anuncios")
                .where({ cod_animal })
                .first();

            if (announcement) {
                fs.rm(
                    `./tmp/anuncio/${announcement.cod_anuncio}`,
                    {
                        recursive: true,
                    },
                    (err) => {
                        if (err) {
                            console.log(err);
                        }
                    }
                );
            }
            await db("animais").where({ cod_animal }).del();
        } catch (err) {
            console.log(err);
            throw new AppError(
                "Falha ao tentar excluir animal, tente novamente",
                400
            );
        }
    }
}

export { AnimalRepository };
