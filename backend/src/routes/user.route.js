import {
  changePassword,
  changeMetaData,
  addInterests,
  updateAvatar,
  getUser,
  removeAvatar,
} from "../controllers/user.controller.js";
import { validateUser } from "../middlewares/validateUser.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  userMetaSchema,
  passwordChangeSchema,
  userInterestsSchema,
} from "../utils/validate.util.js";

import express from "express";
import upload from "../utils/multer.util.js";

const router = express.Router();

router.post(
  "/update/password",
  validateUser,
  validate(passwordChangeSchema),
  changePassword,
);
router.post(
  "/update/profile",
  validateUser,
  validate(userMetaSchema),
  changeMetaData,
);
router.post(
  "/add/interests",
  validateUser,
  validate(userInterestsSchema),
  addInterests,
);
router.post(
  "/update/avatar",
  validateUser,
  upload.single("avatar"),
  updateAvatar,
);
router.delete("/update/avatar", validateUser, removeAvatar);
router.get("/me", validateUser, getUser);

export default router;
