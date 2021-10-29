import React, {useState} from "react";
import {Box, IconButton, TableCell, TextField} from "@material-ui/core";
import {ReactComponent as DeleteIcon} from "../../../assets/images/delete-icon.svg";
import {ReactComponent as EditIcon} from "../../../assets/images/edit-icon.svg";
import {ReactComponent as SaveIcon} from "../../../assets/images/save-icon.svg";
import {useDispatch} from "react-redux";
import {updateContact} from "../../../redux/contactsReducer";
import classes from "./Contact.module.scss";

const Contact = ({id, user, onDelete}) => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  const handleEditMode = () => {
    setEditMode(true);
  }

  const handleSaveEdit = () => {
    const fetchData = async () => {
      try {
        await dispatch(updateContact({id, name, phone, email, address}));
        setEditMode(false);
        setIsError(false);
      } catch(err) {
        setIsError(true);
      }
    };

    fetchData();

    return () => {
      setIsError(false);
    };
  }

  return (
    <>
      <TableCell>
        {editMode ? (
          <TextField name="name" value={name} onChange={(e) => setName(e.target.value)} />
        ) : (
          <Box component="span">{user.name}</Box>
        )}
      </TableCell>
      <TableCell>
        {editMode ? (
          <TextField name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        ) : (
          <Box component="span">{user.phone}</Box>
        )}
      </TableCell>
      <TableCell>
        {editMode ? (
          <TextField name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        ) : (
          <Box component="span">{user.email}</Box>
        )}
      </TableCell>
      <TableCell>
        {editMode ? (
          <TextField name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
        ) : (
          <Box component="span">{user.address}</Box>
        )}
      </TableCell>
      <TableCell>
        {editMode ? (
          <IconButton onClick={handleSaveEdit}>
            <SaveIcon width={16} height={16} fill="#3edcb0" />
          </IconButton>
        ) : (
          <IconButton onClick={handleEditMode}>
            <EditIcon width={16} height={16} fill="#3edcb0" />
          </IconButton>
        )}
      </TableCell>
      <TableCell>
        <IconButton onClick={onDelete}>
          <DeleteIcon width={16} height={16} fill="#f15c5c" />
        </IconButton>
      </TableCell>
      {isError ? (
        <TableCell className={classes.error}>
          Something Went Wrong:(
        </TableCell>
      ) : null}
    </>
  )
}

export default Contact;
