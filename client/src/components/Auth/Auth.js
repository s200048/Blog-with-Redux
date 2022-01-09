import { Avatar, Button, Container, Grid, Paper, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import { GoogleLogin } from "react-google-login";
import Icon from "./icon";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signIn, signUp } from "../../actions/auth";

let initState = { firstname: "", lastname: "", email: "", password: "", confirmPassword: "" };

const Auth = () => {
  const [formData, setFormData] = useState(initState);
  const [isSignup, setSignup] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    if (isSignup) {
      dispatch(signUp(formData, history));
    } else {
      dispatch(signIn(formData, history));
    }
  };

  const handleChange = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPw = () => setShowPw((prev) => !prev);
  const switchMode = () => {
    setSignup(!isSignup);
    // handleShowPw(false);
  };
  const googleSuccess = async (res) => {
    console.log(res);
    // ?. = Optional chanining
    // that is not going to throw an error if we don't have access to
    // the rest object, sometime we do not have this res object
    // 如果 res.profileObj --> cannot get property profileObj
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  const googleError = (err) => {
    console.log(err);
    console.log("Google Login failed.");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstname" label="First Name" handleChange={handleChange} autoFocus half></Input>
                <Input name="lastname" label="Last Name" handleChange={handleChange} half></Input>
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email"></Input>
            <Input name="password" label="Password" handleChange={handleChange} type={showPw ? "text" : "password"} handleShowPw={handleShowPw}></Input>
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>
            <GoogleLogin
              clientId="10447942845-f441qlc5vh8umibunu7qmg0sl0q6pj08.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy="single_host_origin"
            />
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>{isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign Up"}</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
