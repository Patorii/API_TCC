import { db } from "@configs/mariadb";
import { IAnnouncementDTO } from "@modules/annoucement/dtos/IAnnouncementDTO";
import { Announcement } from "@modules/annoucement/entities/Announcement";

import { AppError } from "@shared/errors/AppError";
import { dbHelper } from "@shared/knex/helper";

import { IAnnouncementRepository } from "../IAnnouncementRepository";

interface IList {
    data: Announcement[];
    count: number;
    limit: number;
    page: number;
    totalPages: number;
}

class AnnouncementRepository implements IAnnouncementRepository {
    async create(data: IAnnouncementDTO): Promise<Announcement> {
        const announcement = await dbHelper.insert({
            table: "anuncios",
            pkField: "cod_anuncio",
            checkRepeatedField: [
                { field: `${data.cod_animal}`, description: "animal" },
            ],
            entity: "anuncio",
            entityArticle: "o",
            data,
        });

        return announcement;
    }

    async update(data: IAnnouncementDTO): Promise<Announcement> {
        const announcement = await dbHelper.update({
            table: "anuncios",
            pkField: "cod_anuncio",
            checkRepeatedField: [
                { field: `${data.cod_animal}`, description: "animal" },
            ],
            entity: "anuncio",
            entityArticle: "o",
            data,
        });

        return announcement;
    }

    async findById(cod_anuncio: number): Promise<Announcement> {
        try {
            let sql =
                "SELECT anuncios.*, animais.especie, animais.idade, animais.raca, animais.cor, usuarios.nome, usuarios.email ";
            sql += "FROM  anuncios, animais, usuarios ";
            sql +=
                "WHERE  anuncios.cod_anuncio = 1 AND anuncios.cod_animal = animais.cod_animal  AND anuncios.cod_usuario = usuarios.cod_usuario ";

            const announcement = await db.raw(sql, [cod_anuncio]);
            if (!announcement) {
                throw new AppError("Anuncio não localizado.", 404);
            }
            return announcement[0];
        } catch (error) {
            throw new AppError(error);
        }
    }

    async listAll(page: number, limit: number, order: string): Promise<IList> {
        try {
            let pageNumber;
            const total = await dbHelper.countTable({
                table: "anuncios",
                field: "cod_anuncio",
            });

            const pages = Math.ceil(total / limit);

            if (page > pages) {
                pageNumber = pages;
            } else {
                pageNumber = page;
            }

            let sql =
                "SELECT anuncios.*, animais.especie, animais.idade, animais.raca, animais.cor, usuarios.nome, usuarios.email ";
            sql += "FROM  anuncios, animais, usuarios ";
            sql +=
                "WHERE  anuncios.cod_animal = animais.cod_animal  AND anuncios.cod_usuario = usuarios.cod_usuario";

            const orderBy = order.split(" ");

            if (orderBy[1]) {
                orderBy[1] = orderBy[1].toLocaleLowerCase();
            } else {
                orderBy[1] = "nenhum";
            }
            const desc = orderBy[1] === "desc";

            sql += " order by ??";

            if (desc) {
                sql += " desc";
            }

            const offset = pageNumber * limit - limit;
            sql += ` LIMIT ${limit} OFFSET ${offset < 0 ? 0 : offset}`;

            const list = await db
                .raw(sql, [orderBy[0]])
                .then((result) => result[0]);

            return {
                data: list,
                count: total,
                limit,
                page: pageNumber,
                totalPages: pages,
            };
        } catch (error) {
            throw new AppError(error);
        }
    }

    async delete(cod_anuncio: number): Promise<void> {
        try {
            const announcement = await db("anuncios")
                .where({ cod_anuncio })
                .first();

            if (!announcement) {
                throw new AppError(
                    "Anuncio não localizado, não foi possivel realizar a exclusão.",
                    404
                );
            }
            await db("anuncios").where(cod_anuncio).del();
        } catch {
            throw new AppError(
                "Falha ao tentar excluir anuncio, tente novamente",
                400
            );
        }
    }
}

export { AnnouncementRepository };
