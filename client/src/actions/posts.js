import * as api from "../api";
import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";
// import all things from the actions as api
// able the use the variable in api

// Action Creators
// 因為axios 係 async fn ，Thunk 要係fn 後邊再加一個async fn 去dispatch 佢
// Thunk Motivation
export const getPosts = () => async (dispatch) => {
  try {
    // 係api 拎到response，係response 入邊一定有data object，data = posts
    const { data } = await api.fetchPosts();
    // console.log(data);
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
  //   const action = { type: "FETCH_ALL", payload: [] };
  //   dispatch(action);
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = (id, updatedpost) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, updatedpost);
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
    console.log(err);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    console.log(data);
    dispatch({ type: UPDATE, payload: data });
  } catch (err) {
    console.log(err);
  }
};
