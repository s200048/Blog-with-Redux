import express from "express";
import { createPost, deletePost, getPosts, updatePosts } from "../controllers/post.js";
const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePosts);
router.delete("/:id", deletePost);

export default router;
