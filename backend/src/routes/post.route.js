import { Router } from "express";
import { validateUser } from "../middlewares/validateUser.middleware.js";

import {
  createPost,
  getPosts,
  editPost,
  deletePost,
} from "../controllers/post.controller.js";
import upload from "../utils/multer.util.js";

const router = Router();

router.post("/create/:campId", validateUser, upload.single("post"), createPost);
router.get("/get/:campId", validateUser, getPosts);
router.patch("/edit/:postId", validateUser, editPost);
router.delete("/delete/:postId", validateUser, deletePost);

export default router;
