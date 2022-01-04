import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
  likePost,
  updatePosts,
} from "../controllers/post.js";
const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePosts);
router.delete("/:id", deletePost);
router.patch("/:id/likepost", likePost);

export default router;
