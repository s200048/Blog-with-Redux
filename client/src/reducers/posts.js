import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH } from "../constants/actionTypes";

export default (posts = [], action) => {
  console.log(action);
  // people prefer switch statement
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload];
    case UPDATE:
      console.log(action.payload._id);
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    case DELETE:
      console.log(action.payload);
      return posts.filter((items) => items._id !== action.payload);
    case FETCH_BY_SEARCH:
      return action.payload;
    default:
      return posts;
  }
};
