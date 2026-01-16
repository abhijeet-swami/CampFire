import { Router } from "express";

import { createCamp } from "../controllers/camp.controller.js";

const router = Router();

router.post("/create", createCamp);

export default router;
