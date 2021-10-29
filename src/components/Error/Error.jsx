import React from 'react';
import SadImage from "../../assets/images/sad-cat.jfif";
import classes from "./Error.module.scss";
import {Box} from "@material-ui/core";

const Error = () => {
  return (
    <div className={classes.error}>
      <Box component="h2" mt={0} textAlign="center">Something Went Wrong:(</Box>
      <img className={classes.errorImage} src={SadImage} alt=""/>
    </div>
  );
};

export default Error;
