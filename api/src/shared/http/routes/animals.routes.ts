import { CreateAnimalController } from "@modules/animal/useCases/animal/createAnimal/CreateAnimalController";
import { DeleteAnimalController } from "@modules/animal/useCases/animal/deleteAnimal/DeleteAnimalController";
import { GetAnimalController } from "@modules/animal/useCases/animal/getAnimal/GetAnimalController";
import { UpdateAnimalController } from "@modules/animal/useCases/animal/updateAnimal/UpdateAnimalController";
import { CreateAnnouncementController } from "@modules/annoucement/useCases/announcement/createAnnouncement/CreateAnnouncementController";
import { DeleteAnnouncementController } from "@modules/annoucement/useCases/announcement/deleteAnnouncement/DeleteAnnouncementController";
import { GetAnnouncementController } from "@modules/annoucement/useCases/announcement/getAnnouncement/GetAnnouncementController";
import { ListAllAnnouncementController } from "@modules/annoucement/useCases/announcement/listAllAnnouncement/ListAllAnnouncementController";
import { UpdateAnnouncementController } from "@modules/annoucement/useCases/announcement/updateAnnoucement/UpdateAnnoucementController";
import { Router } from "express";

import { isAuthenticated } from "../middlewares/isAuthenticated";

const animalRoutes = Router();

const createAnimalController = new CreateAnimalController();
const updateAnimalController = new UpdateAnimalController();
const deleteAnimalController = new DeleteAnimalController();

const getAnimalController = new GetAnimalController();

animalRoutes.post("/", isAuthenticated, createAnimalController.handle);
animalRoutes.patch(
    "/:codanimal",
    isAuthenticated,
    updateAnimalController.handle
);
animalRoutes.get("/:codanimal", isAuthenticated, getAnimalController.handle);

animalRoutes.delete(
    "/:codanimal",
    isAuthenticated,
    deleteAnimalController.handle
);

export { animalRoutes };
