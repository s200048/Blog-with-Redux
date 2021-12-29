import React, { useEffect } from "react";
import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  Button,
} from "@material-ui/core";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import useStyles from "./styles";
// Dispatch an action
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // console.log(classes);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  let memories =
    "https://raw.githubusercontent.com/adrianhajdin/project_mern_memories/master/client/src/images/memories.png?token=AF56X74XONEUGZ4FD2FUIA27UURPI";

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="ingerit">
        <Typography align="center" variant="h2">
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={4}
          >
            <Grid item xd={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xd={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
      <h1>Hi</h1>
      <Button
        variant="contained"
        color="primary"
        target="_blank"
        href="https://www.youtube.com/watch?v=ngc9gnGgUdA&ab_channel=JavaScriptMastery"
      >
        tutorial web
      </Button>
    </Container>
  );
};

export default App;
