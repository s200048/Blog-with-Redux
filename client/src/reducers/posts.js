import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH } from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {
  console.log(action);
  // people prefer switch statement
  switch (action.type) {
    case FETCH_ALL:
      return { ...state, posts: action.payload.data, currentPage: action.payload.currentPage, numberOfPages: action.payload.numberOfPages };
    case CREATE:
      // return [...state, action.payload];
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE:
      console.log(action.payload._id);
      return state.map((post) => (post._id === action.payload._id ? action.payload : post));
    case DELETE:
      console.log(action.payload);
      return state.filter((items) => items._id !== action.payload);
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload };
    default:
      return state;
  }
};
