import { Router } from "express";

import { announcementRoutes } from "./announcement.routes";
import { signinRoutes } from "./signin.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use(signinRoutes);
router.use("/users", usersRoutes);
router.use("/announcements", announcementRoutes);

export { router };
