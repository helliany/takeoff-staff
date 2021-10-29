import React from 'react';
import {ReactComponent as LoaderIcon} from "../../assets/images/loader.svg";
import {Box} from "@material-ui/core";

const Loader = () => {
  return (
    <Box m="auto">
      <LoaderIcon width={150} />
    </Box>
  );
};

export default Loader;
