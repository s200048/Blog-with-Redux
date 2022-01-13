import React from "react";
import Post from "./Post/Post";
import useStyles from "./postSstyles";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";

const Posts = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  // 要destructing 先拎到data，因為係reducer 入邊 merge咗幾個Object
  const { posts, isLoading } = useSelector((state) => state.posts); // 以前 [] --> 依家 {isLoading, post:[]};

  // console.log(posts);

  if (!posts.length && !isLoading) return "No Posts";

  return isLoading ? (
    <>
      <CircularProgress />
      <h1>Loading</h1>
    </>
  ) : (
    <Grid className={classes.continer} container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} currentId={currentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
