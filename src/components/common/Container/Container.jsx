import React from 'react';
import classes from "./Container.module.scss";

const Container = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {props.children}
      </div>
    </div>
  );
};

export default Container;
