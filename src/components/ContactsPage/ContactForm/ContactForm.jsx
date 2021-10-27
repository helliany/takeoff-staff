import React from "react";
import { Form, Field } from "react-final-form";
import { Box, Button, Grid, TextField } from "@material-ui/core";
import {useDispatch} from "react-redux";
import {addContact} from "../../../redux/contactsReducer";

const ContactForm = ({onCloseModal}) => {
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    await dispatch(addContact(values));
    onCloseModal();
  };

  const required = (value) => (value ? undefined : "Required");
  const minValue = (min) => (value) =>
    isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
  const composeValidators = (...validators) => (value) =>
    validators.reduce((error, validator) => error || validator(value), undefined);

  return (
    <Form
      onSubmit={onSubmit}
      // validate={validate}
      render={({ handleSubmit, invalid }) => (
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Field name="name" validate={composeValidators(required, minValue(8))}>
                {({input, meta}) => (
                  <>
                    <TextField {...input} fullWidth label="Name" variant="outlined" />
                    {meta.error && meta.touched && (
                      <Box color="error.main">{meta.error}</Box>
                    )}
                  </>
                )}
              </Field>
            </Grid>
            <Grid item>
              <Field type="tel" name="phone" validate={composeValidators(required, minValue(8))}>
                {({input, meta}) => (
                  <>
                    <TextField {...input} fullWidth label="Phone" variant="outlined" />
                    {meta.error && meta.touched && (
                      <Box color="error.main">{meta.error}</Box>
                    )}
                  </>
                )}
              </Field>
            </Grid>
            <Grid item>
              <Field type="email" name="email" validate={composeValidators(required, minValue(8))}>
                {({input, meta}) => (
                  <>
                    <TextField {...input} fullWidth label="Email" variant="outlined" />
                    {meta.error && meta.touched && (
                      <Box color="error.main">{meta.error}</Box>
                    )}
                  </>
                )}
              </Field>
            </Grid>
            <Grid item>
              <Field type="text" name="address" validate={composeValidators(required, minValue(1))}>
                {({input, meta}) => (
                  <>
                    <TextField {...input} fullWidth label="Address" variant="outlined" />
                    {meta.error && meta.touched && (
                      <Box color="error.main">{meta.error}</Box>
                    )}
                  </>
                )}
              </Field>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disableElevation
                disabled={invalid}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    />
  )
}

export default ContactForm;
