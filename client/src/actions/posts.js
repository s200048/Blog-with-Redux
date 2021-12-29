import * as api from "../api";
// import all things from the actions as api

// Action Creators
export const getPosts = () => async (dispatch) => {
  try {
    // 係api 拎到response，係response 入邊一定有data object，data = posts
    const { data } = await api.fetchPosts();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
  //   const action = { type: "FETCH_ALL", payload: [] };
  //   dispatch(action);
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: "CREATE", payload: data });
  } catch (err) {
    console.log(err);
  }
};
