import React from "react";
import { Button, Container } from "@material-ui/core";
// import Form from "./components/Form/Form";
// import Posts from "./components/Posts/Posts";

// Dispatch an action

import Nav from "./components/Nav/Nav";
import { BrowserRouter as Routes, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
  return (
    <Routes>
      <Container maxWidth="lg">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Container>
      <Button variant="contained" color="primary" target="_blank" href="https://www.youtube.com/watch?v=46NRrn4xi5Y&list=PL6QREj8te1P7VSwhrMf3D3Xt4V6_SRkhu&index=6&ab_channel=JavaScriptMastery">
        Tutorial Page
      </Button>
    </Routes>
  );
};

export default App;
