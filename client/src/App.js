import React from "react";
import { Container } from "@material-ui/core";
// import Form from "./components/Form/Form";
// import Posts from "./components/Posts/Posts";

// Dispatch an action

import Nav from "./components/Nav/Nav";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
