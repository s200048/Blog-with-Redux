import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid, Button } from "@material-ui/core";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import useStyles from "./styles";
// Dispatch an action
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";
import Nav from "./components/Nav/Nav";

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [currentId, setCurrentId] = useState(null);

  // console.log(classes);

  // console.log(getPosts);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <Nav />
      <Grow in>
        <Container>
          <Grid container className={classes.mainContainer} justify="space-between" alignItems="stretch" spacing={4}>
            <Grid item xd={12} sm={7}>
              <Posts currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xd={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
      <Button variant="contained" color="primary" target="_blank" href="https://www.youtube.com/watch?v=ngc9gnGgUdA&ab_channel=JavaScriptMastery">
        tutorial web
      </Button>
    </Container>
  );
};

export default App;
