import { Box, Button, Typography } from "@material-ui/core";
import { Facebook, LinkedIn, Twitter } from "@material-ui/icons";
import { LoginInput } from "models/input-model";
import React from "react";
import { Link } from "react-router-dom";
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
            alt="login"
          />
        </Box>
        <Box className={classes.register}>
          <Link to="/register">
            <Typography>Create an account</Typography>
          </Link>
        </Box>
        <Box className={classes.login}>
          <Typography>Or login with</Typography>
          <Box ml={2}>
            <Button
              variant="contained"
              className={`${classes.button} facebook`}
            >
              <Facebook fontSize="small" />
            </Button>
            <Button variant="contained" className={`${classes.button} twitter`}>
              <Twitter fontSize="small" />
            </Button>
            <Button
              variant="contained"
              className={`${classes.button} linkedIn`}
            >
              <LinkedIn fontSize="small" />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
