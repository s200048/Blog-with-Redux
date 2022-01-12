import axios from "axios";

// const url = "http://localhost:8000/post";
// 轉做用API

const API = axios.create({ baseURL: "http://localhost:8000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
  }

  return req;
});

export const fetchPosts = () => API.get("/post");
export const createPost = (newPost) => API.post("/post", newPost);
export const updatePost = (id, updatedPost) => API.patch(`/post/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/post/${id}`);
export const likePost = (id) => {
  // console.log(id);
  return API.patch(`/post/${id}/likepost`);
};

export const signIn = (formData) => API.post(`/user/signin`, formData);
export const signUp = (formData) => API.post(`/user/signup`, formData);

export const fetchPostsBySearch = (searchQuery) => API.get(`/post/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags}`);
