import React from "react";
import {Box, Button, Grid} from "@material-ui/core";
import LoginForm from "./LoginForm/LoginForm";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import classes from "./LoginPage.module.scss";
import {setSignedUpUser} from "../../redux/authReducer";

const Login = () => {
  const isAuth = useSelector(state => state.auth.isAuth);
  const isSignedUp = useSelector(state => state.auth.isSignedUp);
  const dispatch = useDispatch();

  const handleSignUp = () => {
    dispatch(setSignedUpUser(false));
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
            <Box mb={2}>
              <LoginForm />
            </Box>
            {isSignedUp && <Button onClick={handleSignUp}>or You Can Sign Up</Button>}
          </Grid>
        </Box>
      ) : (
        <Redirect to={"/contacts"} />
      )}
    </>
  )
}

export default Login;
