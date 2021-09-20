import { Typography } from '@mui/material';
import { RegisterInput } from 'models';
import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import { Container, FormArea, ImageArea, LoginArea, Root } from './styles/register-style';

export default function RegisterPage() {
  const onFormSubmit = (formValue: RegisterInput) => {
    delete formValue.passwordConfirm;
    console.log('form submit', formValue);
  };
  return (
    <Root>
      <Container>
        <FormArea>
          <Typography variant="h3">Register</Typography>
          <RegisterForm onSubmit={onFormSubmit} />
        </FormArea>
        <ImageArea>
          <img src={process.env.PUBLIC_URL + '/images/bg_register.png'} alt="register" />
        </ImageArea>

        <LoginArea>
          <Link to="/login">
            <Typography>I am already member</Typography>
          </Link>
        </LoginArea>
      </Container>
    </Root>
  );
}
