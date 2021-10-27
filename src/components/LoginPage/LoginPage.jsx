import React from "react";
import {Box, Grid} from "@material-ui/core";
import LoginForm from "./LoginForm/LoginForm";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import classes from "./LoginPage.module.scss";

const Login = () => {
  const isAuth = useSelector(state => state.auth.isAuth);

  return (
    <>
      {!isAuth ? (
        <Box className={classes.container}>
          <Grid container justifyContent="center" alignItems="center">
            <LoginForm />
          </Grid>
        </Box>
      ) : (
        <Redirect to={"/contacts"} />
      )}
    </>
  )
}

export default Login;
