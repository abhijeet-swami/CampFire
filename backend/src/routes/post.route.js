import { Router } from "express";
import { validateUser } from "../middlewares/validateUser.middleware.js";

import {
  createPost,
  getPosts,
  editPost,
  deletePost,
} from "../controllers/post.controller.js";

const router = Router();

router.post("/create/:id", validateUser, createPost);
router.get("/get/:id", validateUser, getPosts);
router.patch("/edit/:id", validateUser, editPost);
router.delete("/delete/:id", validateUser, deletePost);

export default router;
