import { Button } from '@mui/material';
import { Box, styled } from '@mui/system';

export const Root = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
export const Container = styled(Box)(({ theme }) => ({
  overflow: 'auto',
  display: 'grid',
  backgroundColor: '#fff',
  padding: theme.spacing(2, 4),
  width: '60%',
  height: '70%',
  gridTemplateRows: '1fr auto',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateAreas: '"image form" "register login"',
}));
export const ImageArea = styled(Box)({
  gridArea: 'image',
  overflow: 'hidden',
  '& img': {
    objectFit: 'contain',
    width: '100%',
    height: '100%',
  },
});
export const RegisterArea = styled(Box)({
  gridArea: 'register',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
export const LoginArea = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gridArea: 'login',
});
export const CustomLoginButton = styled(Button)(({ theme }) => ({
  minWidth: 'fit-content',
  padding: theme.spacing(1),
  margin: theme.spacing(0, 1),
  '&.facebook': {
    backgroundColor: '#3b5998',
  },
  '&.twitter': {
    backgroundColor: '#1da0f2',
  },
  '&.linkedIn': {
    backgroundColor: '#0a66c2',
  },
  '& span': {
    color: 'white',
  },
}));
