import React from "react";
import { Form, Field } from "react-final-form";
import { Box, Button, Grid, TextField } from "@material-ui/core";
import {useDispatch} from "react-redux";
import {login} from "../../../redux/authReducer";

const LoginForm = () => {
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    dispatch(login(values.username, values.password))
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
              <Field name="username" validate={composeValidators(required, minValue(8))}>
                {({input, meta}) => (
                  <>
                    <TextField {...input} label="Name" variant="outlined" />
                    {meta.error && meta.touched && (
                      <Box color="error.main">{meta.error}</Box>
                    )}
                  </>
                )}
              </Field>
            </Grid>
            <Grid item>
              <Field type="password" name="password" validate={composeValidators(required, minValue(1))}>
                {({input, meta}) => (
                  <>
                    <TextField {...input} label="Password" variant="outlined" />
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

export default LoginForm;
