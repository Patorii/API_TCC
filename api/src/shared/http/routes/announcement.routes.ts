import { CreateAnnouncementController } from "@modules/annoucement/useCases/announcement/createAnnouncement/CreateAnnouncementController";
import { DeleteAnnouncementController } from "@modules/annoucement/useCases/announcement/deleteAnnouncement/DeleteAnnouncementController";
import { GetAnnouncementController } from "@modules/annoucement/useCases/announcement/getAnnouncement/GetAnnouncementController";
import { ListAllAnnouncementController } from "@modules/annoucement/useCases/announcement/listAllAnnouncement/ListAllAnnouncementController";
import { UpdateAnnouncementController } from "@modules/annoucement/useCases/announcement/updateAnnoucement/UpdateAnnoucementController";
import { Router } from "express";

import { isAuthenticated } from "../middlewares/isAuthenticated";

const announcementRoutes = Router();

const createAnnouncementController = new CreateAnnouncementController();
const updateAnnouncementController = new UpdateAnnouncementController();
const deleteAnnouncementController = new DeleteAnnouncementController();
const listAllAnnouncementController = new ListAllAnnouncementController();
const getAnnouncementController = new GetAnnouncementController();

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
announcementRoutes.get(
    "/",
    isAuthenticated,
    listAllAnnouncementController.handle
);
announcementRoutes.delete(
    "/:codanuncio",
    isAuthenticated,
    deleteAnnouncementController.handle
);

export { announcementRoutes };
