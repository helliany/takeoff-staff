import React, {useState} from "react";
import { Form, Field } from "react-final-form";
import { Box, Button, Grid, TextField } from "@material-ui/core";
import {useDispatch} from "react-redux";
import {login} from "../../../redux/authReducer";
import {minLength, required} from "../../../utils/validators";
import classes from "./SignInForm.module.scss";

const SignInForm = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState();

  const onSubmit = async (values) => {
    const fetchData = async () => {
      try {
        await dispatch(login(values.email, values.password))
      } catch(err) {
        if (err.response && err.response.data) {
          setErrorMessage(err.response.data);
        }
      }
    };

    fetchData();
  };

  const composeValidators = (...validators) => (value) =>
    validators.reduce((error, validator) => error || validator(value), undefined);

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, invalid }) => (
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Field name="email" validate={composeValidators(required, minLength(3))}>
                {({input, meta}) => (
                  <>
                    <TextField {...input} label="Email" variant="outlined" fullWidth className={classes.input} />
                    {meta.error && meta.touched && (
                      <Box color="error.main" p={0.4}>{meta.error}</Box>
                    )}
                  </>
                )}
              </Field>
            </Grid>
            <Grid item>
              <Field type="password" name="password" validate={composeValidators(required, minLength(4))}>
                {({input, meta}) => (
                  <>
                    <TextField {...input} label="Password" variant="outlined" fullWidth className={classes.input} />
                    {meta.error && meta.touched && (
                      <Box color="error.main" p={0.4}>{meta.error}</Box>
                    )}
                  </>
                )}
              </Field>
            </Grid>
            {errorMessage && (
              <Grid item>
                <Box color="error.main">{errorMessage}</Box>
              </Grid>
            )}
            <Grid item>
              <Button
                className={classes.button}
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

export default SignInForm;
