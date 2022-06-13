import React from "react";
import {Box, Button, Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import classes from "./LoginPage.module.scss";
import {setSignedUpUser} from "../../redux/authReducer";
import SignInForm from "./SignInForm/SignInForm";
import SignUpForm from "./SignUpForm/SignUpForm";

const Login = () => {
  const isAuth = useSelector(state => state.auth.isAuth);
  const isSignedUp = useSelector(state => state.auth.isSignedUp);
  const dispatch = useDispatch();

  const handleSignUp = () => {
    dispatch(setSignedUpUser(false));
  }

  const handleSignIn = () => {
    dispatch(setSignedUpUser(true));
  }

  return (
    <>
      {!isAuth ? (
        <Box className={classes.container}>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            {isSignedUp ? (
              <Box component="h2">Sign In</Box>
            ) : (
              <Box component="h2">Sign Up</Box>
            )}
            {isSignedUp ? (
              <Box className={classes.wrapper} mb={2}><SignInForm /></Box>
            ) : (
              <Box className={classes.wrapper} mb={2}><SignUpForm /></Box>
            )}
            {isSignedUp ? (
              <Button onClick={handleSignUp}>or You Can Sign Up</Button>
            ) : (
              <Button onClick={handleSignIn}>already registered? sign in</Button>
            )}
          </Grid>
        </Box>
      ) : (
        <Navigate replace to="/contacts" />
      )}
    </>
  )
}

export default Login;
