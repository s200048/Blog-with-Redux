import React from "react";
import { Button, Container } from "@material-ui/core";
// import Form from "./components/Form/Form";
// import Posts from "./components/Posts/Posts";

// Dispatch an action

import Nav from "./components/Nav/Nav";
import { BrowserRouter as Routes, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Routes>
      <Container maxWidth="xl">
        <Nav />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path="/auth" exact component={() => (user ? <Redirect to="/posts" /> : <Auth />)} />
        </Switch>
      </Container>
      <Button variant="contained" color="primary" target="_blank" href="https://www.youtube.com/watch?v=46NRrn4xi5Y&list=PL6QREj8te1P7VSwhrMf3D3Xt4V6_SRkhu&index=6&ab_channel=JavaScriptMastery">
        Tutorial Page
      </Button>
    </Routes>
  );
};

export default App;
