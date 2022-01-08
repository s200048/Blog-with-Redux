import express from "express";
import { createPost, deletePost, getPosts, likePost, updatePosts } from "../controllers/post.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePosts);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likepost", auth, likePost);

export default router;
