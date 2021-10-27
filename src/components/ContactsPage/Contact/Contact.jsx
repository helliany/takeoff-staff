import React from "react";
import {IconButton, TableCell} from "@material-ui/core";
import {ReactComponent as DeleteIcon} from "../../../assets/images/delete-icon.svg";

const Contact = ({user, onDelete}) => {
  return (
    <>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.phone}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.address}</TableCell>
      <TableCell>
        <IconButton onClick={onDelete}>
          <DeleteIcon width={16} height={16} fill="#f15c5c" />
        </IconButton>
      </TableCell>
    </>
  )
}

export default Contact;
