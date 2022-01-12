import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import memories from "../../images/memories.png";
import { AppBar, Avatar, Button, Fade, Toolbar, Tooltip, Typography } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

const Nav = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  // console.log(classes.appBar);
  console.log(user);

  const logout = () => {
    if (window.confirm("Are you sure to logout?")) {
      dispatch({ type: "LOGOUT" });
      history.push("/");
      setUser(null);
    }
  };

  const forceLogout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      // console.log(decodedToken.iat);
      // console.log(decodedToken.exp);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        alert("Token expired You need to login again.");
        return forceLogout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="ingerit">
      <div className="{classes.brandContainer}">
        <Typography component={Link} className={classes.heading} to="/" align="center" variant="h2" align="center">
          Howard's Blog
        </Typography>

        {/* <img className={classes.image} src={memories} alt="memories" height="60" /> */}
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button className={classes.logout} variant="contained" color="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
