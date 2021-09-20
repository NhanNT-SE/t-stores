import { Facebook, LinkedIn, Twitter } from '@mui/icons-material';
import { Typography, Box } from '@mui/material';
import { authApi } from 'api/auth-api';
import { useAppDispatch } from 'app/hooks';
import { LoginInput } from 'models';
import React from 'react';
import { Link } from 'react-router-dom';
import { authActions } from '../auth-slice';
import LoginForm from './components/LoginForm';
import { Root, Container, ImageArea, RegisterArea, LoginArea, CustomLoginButton } from './styles/login-style';

export default function LoginPage() {
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
    <Root>
      <Container borderRadius={8} boxShadow={2}>
        <Box sx={{gridArea:'form'}}>
          <Typography variant="h3">Login</Typography>
          <LoginForm onSubmit={onFormSubmit} />
        </Box>
        <ImageArea>
          <img src={process.env.PUBLIC_URL + '/images/bg_login.png'} alt="login" />
        </ImageArea>
        <RegisterArea>
          <Link to="/register">
            <Typography>Create an account</Typography>
          </Link>
        </RegisterArea>
        <LoginArea>
          <Typography>Or login with</Typography>
          <Box ml={2}>
            <CustomLoginButton variant="contained" className='facebook'>
              <Facebook fontSize="small" />
            </CustomLoginButton>
            <CustomLoginButton variant="contained" className='twitter'>
              <Twitter fontSize="small" />
            </CustomLoginButton>
            <CustomLoginButton variant="contained" className='linkedIn'>
              <LinkedIn fontSize="small" />
            </CustomLoginButton>
          </Box>
        </LoginArea>
      </Container>
    </Root>
  );
}
