import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { InputField } from "components/form-fields";
import React from "react";
import LoginForm from "./components/LoginForm";
import { loginStyle } from "./styles/login-style";

export default function LoginPage() {
  const classes = loginStyle();

  return (
    <Box className={classes.root}>
      <Box borderRadius={8} boxShadow={2} className={classes.fromContainer}>
        <Box className={classes.form}>
          <Typography variant="h3">Login</Typography>
          <LoginForm />
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
