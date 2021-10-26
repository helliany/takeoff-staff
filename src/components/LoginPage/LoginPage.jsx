import React from "react";
import {Box, Grid} from "@material-ui/core";
import LoginForm from "./LoginForm/LoginForm";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

const Login = () => {
  const isAuth = useSelector(state => state.auth.isAuth);

  return (
    <>
      {!isAuth ? (
        <Box display="flex" margin="auto" height="100vh">
          <Grid container justifyContent="center" alignItems="center">
            <LoginForm />
          </Grid>
        </Box>
      ) : (
        <Redirect to={"/users"} />
      )}
    </>
  )
}

export default Login;
