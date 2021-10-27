import React from "react";
import {Box} from "@material-ui/core";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import HomeImage from "../../assets/images/home.jfif";
import classes from "./HomePage.module.scss";

const HomePage = ({isAuth}) => {
  return (
    <>
      {!isAuth ? (
        <Redirect to={"/login"} />
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

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, null)(HomePage);
