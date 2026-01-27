import {
  changePassword,
  changeMetaData,
  addInterests,
} from "../controllers/user.controller.js";
import { validateUser } from "../middlewares/validateUser.middleware.js";
import express from "express";

const router = express.Router();

router.post("/update/password", validateUser, changePassword);
router.post("/update/profile", validateUser, changeMetaData);
router.post("/add/interests", validateUser, addInterests);

export default router;
