import { Box, Button, Typography } from '@material-ui/core';
import { Facebook, LinkedIn, Twitter } from '@material-ui/icons';
import { authApi } from 'api/auth-api';
import { useAppDispatch } from 'app/hooks';
import { LoginInput } from 'models';
import React from 'react';
import { Link } from 'react-router-dom';
import { authActions } from '../auth-slice';
import LoginForm from './components/LoginForm';
import { loginStyle } from './styles/login-style';

export default function LoginPage() {
  const classes = loginStyle();
  const dispatch = useAppDispatch();

  // const checkAuth = async () => {
  //   // const response = await authApi.checkAuth();
  //   // console.log('Check auth api', response);
  //   dispatch(authActions.checkAuth());
  // };

  const onFormSubmit = async (formValue: LoginInput) => {
    try {
      delete formValue.isRemember;
      console.log('form submit', formValue);
      const response = await authApi.login(formValue);
      console.log('response', response.data);
    } catch (error) {
      console.log('login failed:', error);
    }
  };
  return (
    <Box className={classes.root}>
      <Box borderRadius={8} boxShadow={2} className={classes.fromContainer}>
        <Box className={classes.form}>
          <Typography variant="h3">Login</Typography>
          <LoginForm onSubmit={onFormSubmit} />
        </Box>
        <Box className={classes.image}>
          <img src={process.env.PUBLIC_URL + '/images/bg_login.png'} alt="login" />
        </Box>
        <Box className={classes.register}>
          <Link to="/register">
            <Typography>Create an account</Typography>
          </Link>
        </Box>
        <Box className={classes.login}>
          <Typography>Or login with</Typography>
          <Box ml={2}>
            <Button variant="contained" className={`${classes.button} facebook`}>
              <Facebook fontSize="small" />
            </Button>
            <Button variant="contained" className={`${classes.button} twitter`}>
              <Twitter fontSize="small" />
            </Button>
            <Button variant="contained" className={`${classes.button} linkedIn`}>
              <LinkedIn fontSize="small" />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
