import { Router } from "express";

import { createCamp, joinCamp } from "../controllers/camp.controller.js";
import { validateUser } from "../middlewares/validateUser.middleware.js";

const router = Router();

router.post("/create", validateUser, createCamp);
router.post("/join/:id", validateUser, joinCamp);

export default router;
