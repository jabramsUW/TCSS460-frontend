// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthResetPassword from 'sections/auth/auth-forms/AuthResetPassword';

// ================================|| RESET PASSWORD ||================================ //

export default function ResetPassword() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack sx={{ mb: { xs: -0.5, sm: 0.5 } }} spacing={1}>
            <Typography variant="h3">Change Password</Typography>
            <Typography color="secondary">Please choose your new password</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthResetPassword />
        </Grid>
      </Grid>
    </AuthWrapper>
    // <Container component="main" maxWidth="xs">
    //   <Box
    //     sx={{
    //       marginTop: 8,
    //       display: 'flex',
    //       flexDirection: 'column',
    //       alignItems: 'center'
    //     }}
    //   >
    //     <Typography component="h1" variant="h5">
    //       Change Password
    //     </Typography>

    //     <Box sx={{ mt: 1 }}>
    //       <AuthResetPassword />
    //     </Box>
    //   </Box>
    // </Container>
  );
}
