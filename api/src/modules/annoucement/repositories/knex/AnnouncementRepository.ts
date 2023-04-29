import { db } from "@configs/mariadb";
import { IAnnouncementDTO } from "@modules/annoucement/dtos/IAnnouncementDTO";
import { Announcement } from "@modules/annoucement/entities/Announcement";
import fs from "fs";

import { AppError } from "@shared/errors/AppError";
import { dbHelper } from "@shared/knex/helper";

import { IAnnouncementRepository } from "../IAnnouncementRepository";

interface IFotoPrincipal {
    foto: string;
    extensao: string;
}

interface IListData {
    cod_anuncio: number;
    cod_usuario: number;
    cod_animal: number;
    descricao: string;
    cep: number;
    uf: string;
    cidade: string;
    bairro: string;
    endereco: string;
    numero: number;
    complemento: string;
    data_anuncio: Date;
    tel: string;
    tel2: string;
    tipo: "A" | "P";
    nome_animal: string;
    especie: "C" | "G";
    idade: string;
    raca: string;
    cor: string;
    sexo: "F" | "M";
    nome: string;
    email: string;
    created_at: string;
    updated_at: string;
    foto_principal: IFotoPrincipal;
}
interface IList {
    data: IListData[];
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
                { field: "cod_animal", description: "animal" },
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
                { field: "cod_animal", description: "animal" },
            ],
            entity: "anuncio",
            entityArticle: "o",
            data,
        });

        return announcement;
    }

    async findById(cod_anuncio: number): Promise<IListData> {
        try {
            let sql =
                "SELECT anuncios.*, animais.nome as nome_animal, animais.especie, animais.idade, animais.raca, animais.cor, animais.sexo, usuarios.nome, usuarios.email ";
            sql += "FROM  anuncios, animais, usuarios ";
            sql +=
                "WHERE  anuncios.cod_anuncio = ?? AND anuncios.cod_animal = animais.cod_animal  AND anuncios.cod_usuario = usuarios.cod_usuario ";

            const announcement = await db.raw(sql, [cod_anuncio]);
            if (!announcement) {
                throw new AppError("Anuncio não localizado.", 404);
            }
            return announcement[0][0];
        } catch (error) {
            throw new AppError(error);
        }
    }

    async listAll(
        page: number,
        limit: number,
        order: string,
        uf?: string,
        especie?: "C" | "G",
        raca?: string,
        tipo?: "A" | "P",
        sexo?: "F" | "M"
    ): Promise<IList> {
        try {
            // criando o SQL principal
            let sql =
                "SELECT anuncios.*, animais.nome as nome_animal, animais.especie, animais.idade, animais.raca, animais.cor, animais.sexo, usuarios.nome, usuarios.email ";
            sql += "FROM  anuncios, animais, usuarios ";
            sql +=
                "WHERE  anuncios.cod_animal = animais.cod_animal  AND anuncios.cod_usuario = usuarios.cod_usuario";

            if (uf) {
                sql += ` AND anuncios.uf = "${uf}"`;
            }
            if (especie) {
                sql += ` AND animais.especie = "${especie}"`;
            }
            if (raca) {
                sql += ` AND animais.raca = "${raca}"`;
            }
            if (tipo) {
                sql += ` AND anuncios.tipo = "${tipo}"`;
            }
            if (sexo) {
                sql += ` AND animais.sexo = "${sexo}"`;
            }

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

            // pre select pra ter a quantidade de resultados e assim gerar as paginas
            const preList = await db
                .raw(sql, [orderBy[0]])
                .then((result) => result[0]);
            let pageNumber;
            const total = preList.length;

            const pages = Math.ceil(total / limit);

            if (page > pages) {
                pageNumber = pages;
            } else {
                pageNumber = page;
            }

            const offset = pageNumber * limit - limit;
            sql += ` LIMIT ${limit} OFFSET ${offset < 0 ? 0 : offset}`;

            const list = await db
                .raw(sql, [orderBy[0]])
                .then((result) => result[0]);

            return {
                data: list,
                count: list.length,
                limit,
                page: pageNumber,
                totalPages: pages,
            };
        } catch (error) {
            throw new AppError(error);
        }
    }
    async listAllByUser(
        cod_usuario: number,
        page: number,
        limit: number,
        order: string,
        uf?: string,
        especie?: "C" | "G",
        raca?: string,
        tipo?: "A" | "P",
        sexo?: "F" | "M"
    ): Promise<IList> {
        try {
            // criando o SQL principal
            let sql =
                "SELECT anuncios.*, animais.nome as nome_animal, animais.especie, animais.idade, animais.raca, animais.cor, animais.sexo, usuarios.nome, usuarios.email ";
            sql += "FROM  anuncios, animais, usuarios ";
            sql +=
                "WHERE anuncios.cod_usuario = ?? AND anuncios.cod_animal = animais.cod_animal  AND anuncios.cod_usuario = usuarios.cod_usuario";

            if (uf) {
                sql += ` AND anuncios.uf = "${uf}"`;
            }
            if (especie) {
                sql += ` AND animais.especie = "${especie}"`;
            }
            if (raca) {
                sql += ` AND animais.raca = "${raca}"`;
            }
            if (tipo) {
                sql += ` AND anuncios.tipo = "${tipo}"`;
            }
            if (sexo) {
                sql += ` AND animais.sexo = "${sexo}"`;
            }

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

            // pre select pra ter a quantidade de resultados e assim gerar as paginas
            const preList = await db
                .raw(sql, [cod_usuario, orderBy[0]])
                .then((result) => result[0]);
            let pageNumber;
            const total = preList.length;

            const pages = Math.ceil(total / limit);

            if (page > pages) {
                pageNumber = pages;
            } else {
                pageNumber = page;
            }

            const offset = pageNumber * limit - limit;
            sql += ` LIMIT ${limit} OFFSET ${offset < 0 ? 0 : offset}`;

            const list = await db
                .raw(sql, [cod_usuario, orderBy[0]])
                .then((result) => result[0]);

            return {
                data: list,
                count: list.length,
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
            fs.rm(
                `./tmp/anuncio/${cod_anuncio}`,
                {
                    recursive: true,
                },
                (err) => {
                    if (err) {
                        console.log(err);
                    }
                }
            );

            await db("anuncios").where({ cod_anuncio }).del();
        } catch (err) {
            console.log(err);
            throw new AppError(
                "Falha ao tentar excluir anuncio, tente novamente",
                400
            );
        }
    }
}

export { AnnouncementRepository };
