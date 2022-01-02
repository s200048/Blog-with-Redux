import express from "express";
import { createPost, getPosts, updatePosts } from "../controllers/post.js";
const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePosts);

export default router;
