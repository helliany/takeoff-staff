import React from "react";
import {Box} from "@material-ui/core";
import {connect} from "react-redux";
import {NavLink, Redirect} from "react-router-dom";

const HomePage = ({isAuth}) => {
  return (
    <>
      {!isAuth ? (
        <Redirect to={"/login"} />
      ) : (
        <Box>
          <NavLink to={"/users"}>Users</NavLink>
        </Box>
      )}
    </>
  )
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, null)(HomePage);
