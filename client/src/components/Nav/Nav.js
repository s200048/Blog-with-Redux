import React from "react";
import useStyles from "./styles";
import memories from "../../images/memories.png";
import { AppBar, Typography } from "@material-ui/core";

const Nav = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="static" color="ingerit">
      <Typography align="center" variant="h2">
        My Blog
      </Typography>
      <img className={classes.image} src={memories} alt="memories" height="60" />
    </AppBar>
  );
};

export default Nav;
