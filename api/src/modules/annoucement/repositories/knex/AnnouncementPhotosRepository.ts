import { db } from "@configs/mariadb";
import { IAnnouncementPhotosDTO } from "@modules/annoucement/dtos/IAnnouncementPhotosDTO";
import { AnnouncementPhotos } from "@modules/annoucement/entities/AnnouncementPhotos";
import { fileExists } from "@utils/file";
import fs from "fs";

import { AppError } from "@shared/errors/AppError";
import { dbHelper } from "@shared/knex/helper";

import { IAnnouncementPhotosRepository } from "../IAnnouncementPhotosRepository";

interface IPhotoBase64 {
    foto: string;
    extensao: string;
}

class AnnouncementPhotosRepository implements IAnnouncementPhotosRepository {
    async create(data: IAnnouncementPhotosDTO): Promise<AnnouncementPhotos> {
        const announcementPhotos = await dbHelper.insert({
            table: "fotos_anuncio",
            pkField: "cod_foto_anuncio",
            checkRepeatedField: [],
            entity: "foto de anuncio",
            entityArticle: "a",
            data,
        });

        return announcementPhotos;
    }

    async findById(cod_foto_anuncio: number): Promise<AnnouncementPhotos> {
        try {
            const announcementPhoto = await db("fotos_anuncio")
                .where({ cod_foto_anuncio })
                .first();

            return announcementPhoto;
        } catch (error) {
            throw new AppError(error);
        }
    }

    async findByDefault(cod_anuncio: number): Promise<AnnouncementPhotos> {
        try {
            const announcementPhoto = await db("fotos_anuncio")
                .where({ cod_anuncio })
                .where({ capa: "S" })
                .first();

            return announcementPhoto;
        } catch (error) {
            throw new AppError(error);
        }
    }

    async listByAnnouncement(
        cod_anuncio: number
    ): Promise<AnnouncementPhotos[]> {
        try {
            const announcementPhotos = await db("fotos_anuncio")
                .where({ cod_anuncio })
                .then();

            return announcementPhotos;
        } catch (error) {
            throw new AppError(error);
        }
    }
    async setAllPhotosOfAnnouncementNotDefault(
        cod_anuncio: number
    ): Promise<void> {
        try {
            await db("fotos_anuncio").where({ cod_anuncio }).update({
                capa: "N",
            });
        } catch (error) {
            throw new AppError(error);
        }
    }
    async setDefaultPhoto(
        cod_foto_anuncio: number
    ): Promise<AnnouncementPhotos> {
        try {
            const photos = await this.findById(cod_foto_anuncio);

            await this.setAllPhotosOfAnnouncementNotDefault(photos.cod_anuncio);

            await db("fotos_anuncio").where({ cod_foto_anuncio }).update({
                capa: "S",
            });

            const newMainPhoto = await this.findById(cod_foto_anuncio);
            return newMainPhoto;
        } catch (error) {
            throw new AppError(error);
        }
    }

    async getMainPhotoBase64ByCod(cod_anuncio: number): Promise<IPhotoBase64> {
        try {
            const announcementPhoto = await db("fotos_anuncio")
                .where({ cod_anuncio })
                .where({ capa: "S" })
                .first();

            if (!announcementPhoto) {
                return {
                    foto: "",
                    extensao: "",
                };
            }

            const imageFile = announcementPhoto.arquivo;
            const isFileExists = fileExists(imageFile);
            //
            let photo = "";
            if (isFileExists) {
                const bitmap = fs.readFileSync(imageFile);
                photo = Buffer.from(bitmap).toString("base64");
            }

            return {
                foto: photo,
                extensao: announcementPhoto.extensao,
            };
        } catch (error) {
            throw new AppError(error);
        }
    }

    async delete(cod_foto_anuncio: number): Promise<void> {
        try {
            await db("fotos_anuncio").where({ cod_foto_anuncio }).del();
        } catch {
            throw new AppError(
                "Falha ao tentar excluir anuncio, tente novamente",
                400
            );
        }
    }
}

export { AnnouncementPhotosRepository };
