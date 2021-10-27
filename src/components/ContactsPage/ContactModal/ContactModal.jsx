import * as React from 'react';
import {Modal, Box, Button} from '@material-ui/core';
import classes from "./ContactModal.module.scss";
import ContactForm from "../ContactForm/ContactForm";

const ContactModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Add Contact</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box className={classes.modal}>
          <Box mb={2} textAlign="center" fontSize={24}>
            Add Contact
          </Box>
          <ContactForm onCloseModal={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}

export default ContactModal;
