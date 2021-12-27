import React from "react";
import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  Button,
} from "@material-ui/core";

const App = () => {
  let memories =
    "https://raw.githubusercontent.com/adrianhajdin/project_mern_memories/master/client/src/images/memories.png?token=AF56X74XONEUGZ4FD2FUIA27UURPI";

  return (
    <Container maxidth="lg">
      <AppBar position="static" color="ingerit">
        <Typography align="center" variant="h2">
          Memories
        </Typography>
        <img src={memories} alt="memories" height="60" />
      </AppBar>
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
