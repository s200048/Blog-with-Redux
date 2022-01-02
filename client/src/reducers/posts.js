export default (posts = [], action) => {
  // people prefer switch statement
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...posts, action.payload];
    case "UPDATE":
      return action.payload;
    default:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
  }
};
