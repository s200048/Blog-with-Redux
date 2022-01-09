import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

// All Status code
// https://www.restapitutorial.com/httpstatuscodes.html

export const getPosts = async (req, res) => {
  try {
    const postMessage = await PostMessage.find();
    // console.log(postMessage);
    res.status(200).json(postMessage);
  } catch (err) {
    console.log(err);
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePosts = async (req, res) => {
  // console.log(req.params);
  // console.log(req.body);
  const { id: _id } = req.params;
  const post = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");

    let updatedPost = await PostMessage.findOneAndUpdate(_id, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");

    const deletedPost = await PostMessage.deleteOne({ id: _id });
    res.json(`${deletedPost} has been deleted`);
  } catch (err) {
    console.log(err);
  }
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  // console.log(_id);
  console.log("LikePost: " + req.userId);

  try {
    if (!req.userId) return res.json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");

    const post = await PostMessage.findById(_id);
    // console.log(post._id);
    // console.log(post);

    // 對下個post.like 入邊有冇login 果個user like 過
    const index = post.likes.findIndex((id) => id === String(req.userId));
    console.log(index);

    if (index === -1) {
      //like the post (user 冇like 過)
      post.likes.push(req.userId);
      console.log(0);
    } else {
      //dislike the post (user like 過)
      // remove Id from array
      console.log(1);
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findOneAndUpdate({ _id: _id }, post, {
      new: true,
    });
    console.log(updatedPost._id);
    res.json(updatedPost);
  } catch (err) {
    console.log(err);
  }
};
