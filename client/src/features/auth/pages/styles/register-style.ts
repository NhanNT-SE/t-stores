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
  gridTemplateAreas: '"form image" "form login"',
}));

export const FormArea = styled(Box)({
  gridArea: 'form',
  display: 'flex',
  flexDirection: 'column',
});
export const ImageArea = styled(Box)({
  gridArea: 'image',
  overflow: 'hidden',
  '& img': {
    objectFit: 'contain',
    width: '100%',
    height: '100%',
  },
});
export const LoginArea = styled(Box)({
  gridArea: 'login',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
