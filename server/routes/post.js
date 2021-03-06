import express from "express";
import { createPost, deletePost, getPosts, getPostsBySearch, likePost, updatePosts, getPost } from "../controllers/post.js";
import auth from "../middleware/auth.js";
const router = express.Router();

// 如果係auth route前邊有middleware，入邊return 嘅嘢會繼承比之後
// populate request and thave access to that request
// 所以係controllers 入邊可以用到req.userId --> req.userId 係decoded後data

router.get("/", getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePosts);
router.delete("/:id", deletePost);
router.patch("/:id/likepost", auth, likePost);
router.get("/search", getPostsBySearch);
router.get("/:id", getPost);

export default router;
