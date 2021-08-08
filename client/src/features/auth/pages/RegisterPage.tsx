import { Box, Typography } from "@material-ui/core";
import { RegisterInput } from "models/input-model";
import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import { registerStyle } from "./styles/register-style";

export default function RegisterPage() {
  const classes = registerStyle();
  const initialValue: RegisterInput = {
    username: "",
    password: "",
    email: "",
    passwordConfirm: "",
  };
  const onFormSubmit = (formValue: RegisterInput) => {
    delete formValue.passwordConfirm;
    console.log("form submit", formValue);
  };
  return (
    <Box className={classes.root}>
      <Box className={classes.fromContainer}>
        <Box className={classes.form}>
          <Typography variant="h3">Register</Typography>
          <RegisterForm initialValue={initialValue} onSubmit={onFormSubmit} />
        </Box>
        <Box className={classes.image}>
          <img
            src={process.env.PUBLIC_URL + "/images/bg_register.png"}
            alt="register"
          />
        </Box>

        <Box className={classes.login}>
          <Link to="/login">
            <Typography>I am already member</Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
