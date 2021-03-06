import * as api from "../api";
import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_POST } from "../constants/actionTypes";
// import all things from the actions as api
// able the use the variable in api

// Action Creators
// 因為axios 係 async fn ，Thunk 要係fn 後邊再加一個async fn 去dispatch 佢
// Thunk Motivation
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    // 係api 拎到response，係response 入邊一定有data object，data = posts
    const { data } = await api.fetchPosts(page);
    console.log(data);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
  //   const action = { type: "FETCH_ALL", payload: [] };
  //   dispatch(action);
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    console.log(data);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
    console.log(error.response);
    return error.response;
  }
  //   const action = { type: "FETCH_ALL", payload: [] };
  //   dispatch(action);
};

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);
    history.push(`/posts/${data._id}`);

    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = (id, updatedpost) => async (dispatch) => {
  try {
    // console.log(id);
    const { data } = await api.updatePost(id, updatedpost);
    console.log(data);
    dispatch({ type: UPDATE, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (err) {
    console.log(err.response);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    // console.log(data);
    dispatch({ type: UPDATE, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const getPostBySearch = (searchQuery) => async (dispatch) => {
  try {
    console.log(searchQuery);
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    console.log(data);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};
