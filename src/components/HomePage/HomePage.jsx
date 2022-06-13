import React from "react";
import {Box} from "@material-ui/core";
import {useSelector} from "react-redux";
import {Link, Navigate} from "react-router-dom";
import HomeImage from "../../assets/images/home.jfif";
import classes from "./HomePage.module.scss";

const HomePage = () => {
  const isAuth = useSelector((state) => state.auth.isAuth)

  return (
    <>
      {!isAuth ? (
        <Navigate replace to="/login" />
      ) : (
        <Box textAlign="center" p={4}>
          <h1>Welcome To Your Contacts!</h1>
          <Link className={classes.link} to={"/contacts"}>
            <img className={classes.image} src={HomeImage} alt=""/>
          </Link>
        </Box>
      )}
    </>
  )
}

export default HomePage;
