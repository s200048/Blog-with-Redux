import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

// All Status code
// https://www.restapitutorial.com/httpstatuscodes.html

export const getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 8;
    // req.query 會將frond-end 拎到query轉做string，依家要強制轉返做number
    // get the starting index of every page
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments({});
    // console.log(total);

    const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
    // console.log(postMessage);
    res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
  } catch (err) {
    console.log(err);
  }
};
export const getPost = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  console.log(id);

  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
  console.log(newPost);
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
  const { id } = req.params;
  const post = req.body;
  console.log(req.params.id);
  // console.log(post);

  // const { creator, title, message, likes, tags, selectedFile } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");

    // const updatePost = { creator, title, message, tags, likes, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, post, { new: true });

    // let updatedPost = await PostMessage.findOneAndUpdate({ id: _id }, post, {
    //   new: true,
    // });
    console.log(post);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");

    // console.log(req.params);
    // console.log(_id);
    const deletedPost = await PostMessage.deleteOne({ _id: id });
    // console.log(deletedPost);
    res.json(`${id} has been deleted`);
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
    // console.log(index);

    if (index === -1) {
      //like the post (user 冇like 過)
      post.likes.push(req.userId);
      // console.log(0);
    } else {
      //dislike the post (user like 過)
      // remove Id from array
      // console.log(1);
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findOneAndUpdate({ _id: _id }, post, {
      new: true,
    });
    // console.log(updatedPost);
    res.json(updatedPost);
  } catch (err) {
    console.log(err);
  }
};

// Query --> /posts?page = 1 --> page = 1
// Params --> /posts/:id --> id = ?123

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  // console.log(req.query);
  // console.log(searchQuery);
  // console.log(tags);

  try {
    // 令 Test = test = TEST  --> All posts match search result
    const title = new RegExp(searchQuery, "i");
    // console.log(title);

    // Find all posts that match those criteria ($or) --> 1 is title, 2 is one of the tags ($in in the array of tags equal to tags)
    const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(",") } }] });
    console.log(posts);

    res.json({ data: posts });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
