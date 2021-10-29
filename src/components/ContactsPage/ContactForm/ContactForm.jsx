import React, {useState} from "react";
import { Form, Field } from "react-final-form";
import { Box, Button, Grid, TextField } from "@material-ui/core";
import {useDispatch} from "react-redux";
import {addContact} from "../../../redux/contactsReducer";
import {minLength, required} from "../../../utils/validators";

const ContactForm = ({onCloseModal}) => {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);

  const onSubmit = async (values) => {
    const fetchData = async () => {
      try {
        await dispatch(addContact(values));
        setIsError(false);
        onCloseModal();
      } catch(err) {
        setIsError(true);
      }
    };

    fetchData();

    return () => {
      setIsError(false);
    };
  };

  const composeValidators = (...validators) => (value) =>
    validators.reduce((error, validator) => error || validator(value), undefined);

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, invalid }) => (
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Field name="name" validate={required}>
                {({input, meta}) => (
                  <>
                    <TextField {...input} fullWidth label="Name" variant="outlined" />
                    {meta.error && meta.touched && (
                      <Box color="error.main" p={0.4}>{meta.error}</Box>
                    )}
                  </>
                )}
              </Field>
            </Grid>
            <Grid item>
              <Field type="tel" name="phone" validate={composeValidators(required, minLength(4))}>
                {({input, meta}) => (
                  <>
                    <TextField {...input} fullWidth label="Phone" variant="outlined" />
                    {meta.error && meta.touched && (
                      <Box color="error.main" p={0.4}>{meta.error}</Box>
                    )}
                  </>
                )}
              </Field>
            </Grid>
            <Grid item>
              <Field type="email" name="email" validate={composeValidators(required, minLength(3))}>
                {({input, meta}) => (
                  <>
                    <TextField {...input} fullWidth label="Email" variant="outlined" />
                    {meta.error && meta.touched && (
                      <Box color="error.main" p={0.4}>{meta.error}</Box>
                    )}
                  </>
                )}
              </Field>
            </Grid>
            <Grid item>
              <Field type="text" name="address" validate={composeValidators(required, minLength(4))}>
                {({input, meta}) => (
                  <>
                    <TextField {...input} fullWidth label="Address" variant="outlined" />
                    {meta.error && meta.touched && (
                      <Box color="error.main" p={0.4}>{meta.error}</Box>
                    )}
                  </>
                )}
              </Field>
            </Grid>
            {isError && (
              <Grid item>
                <Box color="error.main">Something Went Wrong:(</Box>
              </Grid>
            )}
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
