import { Box, Typography } from "@material-ui/core";
import { LoginInput } from "models/input-model";
import React from "react";
import LoginForm from "./components/LoginForm";
import { loginStyle } from "./styles/login-style";

export default function LoginPage() {
  const classes = loginStyle();
  const initialValue: LoginInput = {
    username: "",
    password: "",
    isRemember: false,
  };
  const onFormSubmit = (formValue: LoginInput) => {
    console.log("form submit", formValue);
  };
  return (
    <Box className={classes.root}>
      <Box borderRadius={8} boxShadow={2} className={classes.fromContainer}>
        <Box className={classes.form}>
          <Typography variant="h3">Login</Typography>
          <LoginForm initialValue={initialValue} onSubmit={onFormSubmit} />
        </Box>
        <Box className={classes.image}>
          <img
            src={process.env.PUBLIC_URL + "/images/bg_login.png"}
            alt="not found"
          />
        </Box>
        <Box className={classes.register}>Footer left</Box>
        <Box className={classes.login}>Footer right</Box>
      </Box>
    </Box>
  );
}
