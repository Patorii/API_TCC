import { storage } from "@configs/uploadAnnouncementPhoto";
import { CreateAnnouncementController } from "@modules/annoucement/useCases/announcement/createAnnouncement/CreateAnnouncementController";
import { DeleteAnnouncementController } from "@modules/annoucement/useCases/announcement/deleteAnnouncement/DeleteAnnouncementController";
import { GetAnnouncementController } from "@modules/annoucement/useCases/announcement/getAnnouncement/GetAnnouncementController";
import { ListAllAnnouncementController } from "@modules/annoucement/useCases/announcement/listAllAnnouncement/ListAllAnnouncementController";
import { UpdateAnnouncementController } from "@modules/annoucement/useCases/announcement/updateAnnoucement/UpdateAnnoucementController";
import { CreateAnnouncementPhotosController } from "@modules/annoucement/useCases/announcementPhotos/createAnnouncementPhotos/CreateAnnouncementPhotosController";
import { DeleteAnnouncementPhotosController } from "@modules/annoucement/useCases/announcementPhotos/deleteAnnouncementPhotos/DeleteAnnouncementPhotosController";
import { ListAllAnnouncementPhotosController } from "@modules/annoucement/useCases/announcementPhotos/listAllAnnouncementPhotos/ListAllAnnouncementPhotosController";
import { ListMainAnnouncementPhotosController } from "@modules/annoucement/useCases/announcementPhotos/listMainAnnouncementPhotos/ListMainAnnouncementPhotosController";
import { ToggleMainAnnouncementPhotosController } from "@modules/annoucement/useCases/announcementPhotos/toggleMainPhotoAnnouncementPhotos/ToggleMainAnnouncementPhotosController";
import { Router } from "express";
import multer from "multer";

import { isAuthenticated } from "../middlewares/isAuthenticated";

const announcementRoutes = Router();

// Announcement
const createAnnouncementController = new CreateAnnouncementController();
const updateAnnouncementController = new UpdateAnnouncementController();
const deleteAnnouncementController = new DeleteAnnouncementController();
const listAllAnnouncementController = new ListAllAnnouncementController();
const getAnnouncementController = new GetAnnouncementController();

// AnnouncementPhotos

const uploadAttachment = multer({ storage });
const middlewareUpload = uploadAttachment.fields([
    { name: "cod_anuncio" },
    { name: "foto", maxCount: 1 },
    { name: "capa" },
]);

const createAnnouncementPhotosController =
    new CreateAnnouncementPhotosController();
const deleteAnnouncementPhotosController =
    new DeleteAnnouncementPhotosController();
const toggleMainAnnouncementPhotosController =
    new ToggleMainAnnouncementPhotosController();
const listMainAnnouncementPhotosController =
    new ListMainAnnouncementPhotosController();
const listAllAnnouncementPhotosController =
    new ListAllAnnouncementPhotosController();

// AnnouncementPhotos
announcementRoutes.post(
    "/:codanuncio/photos",
    isAuthenticated,
    middlewareUpload,
    createAnnouncementPhotosController.handle
);

announcementRoutes.get(
    "/:codanuncio/mainphoto",
    isAuthenticated,
    listMainAnnouncementPhotosController.handle
);
announcementRoutes.get(
    "/:codanuncio/photos",
    isAuthenticated,
    listAllAnnouncementPhotosController.handle
);
announcementRoutes.patch(
    "/photos/:codfotoanuncio",
    isAuthenticated,
    toggleMainAnnouncementPhotosController.handle
);

announcementRoutes.delete(
    "/photos/:codfotoanuncio",
    isAuthenticated,
    deleteAnnouncementPhotosController.handle
);

// Announcement
announcementRoutes.post(
    "/",
    isAuthenticated,
    createAnnouncementController.handle
);
announcementRoutes.patch(
    "/:codanuncio",
    isAuthenticated,
    updateAnnouncementController.handle
);
announcementRoutes.get(
    "/:codanuncio",
    isAuthenticated,
    getAnnouncementController.handle
);
announcementRoutes.get("/", listAllAnnouncementController.handle);

announcementRoutes.delete(
    "/:codanuncio",
    isAuthenticated,
    deleteAnnouncementController.handle
);

export { announcementRoutes };
