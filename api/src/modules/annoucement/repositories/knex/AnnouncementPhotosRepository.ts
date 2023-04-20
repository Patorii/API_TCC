import { db } from "@configs/mariadb";
import { IAnnouncementPhotosDTO } from "@modules/annoucement/dtos/IAnnouncementPhotosDTO";
import { AnnouncementPhotos } from "@modules/annoucement/entities/AnnouncementPhotos";

import { AppError } from "@shared/errors/AppError";
import { dbHelper } from "@shared/knex/helper";

import { IAnnouncementPhotosRepository } from "../IAnnouncementPhotosRepository";

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

    async update(data: IAnnouncementPhotosDTO): Promise<AnnouncementPhotos> {
        const announcementPhotos = await dbHelper.update({
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

    async findByDefault(): Promise<AnnouncementPhotos> {
        try {
            const announcementPhoto = await db("fotos_anuncio")
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

    async delete(cod_foto_anuncio: number): Promise<void> {
        try {
            const announcementPhoto = await this.findById(cod_foto_anuncio);

            if (!announcementPhoto) {
                throw new AppError(
                    "Anuncio não localizado, não foi possivel realizar a exclusão.",
                    404
                );
            }

            await db("fotos_anuncio").where(cod_foto_anuncio).del();
        } catch {
            throw new AppError(
                "Falha ao tentar excluir anuncio, tente novamente",
                400
            );
        }
    }
}

export { AnnouncementPhotosRepository };
