'use client';

import { useEffect, useState, SyntheticEvent } from 'react';

// next
import { useRouter } from 'next/navigation';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

import axios from 'utils/axios';

import { openSnackbar } from 'api/snackbar';
import useScriptRef from 'hooks/useScriptRef';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// types
import { SnackbarProps } from 'types/snackbar';
import { StringColorProps } from 'types/password';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import { APP_DEFAULT_PATH } from 'config';

// ============================|| STATIC - RESET PASSWORD ||============================ //

export default function AuthResetPassword() {
  const scriptedRef = useScriptRef();
  const router = useRouter();

  const [level, setLevel] = useState<StringColorProps>();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <Formik
      initialValues={{
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        currentPassword: Yup.string().max(255).required('Current password is required'),
        newPassword: Yup.string()
          .required('New password is required')
          .test(
            'different-password',
            'New password cannot be the same as the current password',
            (newPassword, yup) => yup.parent.currentPassword !== newPassword
          )
          .test('no-leading-trailing-whitespace', 'Password cannot start or end with spaces', (value) => value === value.trim())
          .min(15, 'Password must be at least 15 characters with a special character and digits adding to 20')
          .max(255, 'Password must be less than 255 characters'),
        confirmPassword: Yup.string()
          .required('Confirm Password is required')
          .test('confirmPassword', 'Both passwords must match!', (confirmPassword, yup) => yup.parent.newPassword === confirmPassword)
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        axios
          .post('credentials/changePassword', { email: values.email, oldPassword: values.currentPassword, newPassword: values.newPassword })
          .then((response) => {
            setStatus({ success: true });
            setSubmitting(false);
            openSnackbar({
              open: true,
              message: 'Successfuly changed password.',
              variant: 'alert',
              alert: {
                color: 'success'
              }
            } as SnackbarProps);
            router.push(APP_DEFAULT_PATH);
          })
          .catch((err: any) => {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          });
        // try {
        //   // password reset
        //   if (scriptedRef.current) {
        //     setStatus({ success: true });
        //     setSubmitting(false);

        //     openSnackbar({
        //       open: true,
        //       message: 'Successfuly reset password.',
        //       variant: 'alert',
        //       alert: {
        //         color: 'success'
        //       }
        //     } as SnackbarProps);

        //     setTimeout(() => {
        //       router.push('/login');
        //     }, 1500);
        //   }
        // } catch (err: any) {
        //   console.error(err);
        //   if (scriptedRef.current) {
        //     setStatus({ success: false });
        //     setErrors({ submit: err.message });
        //     setSubmitting(false);
        //   }
        // }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email-reset">Email Address</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                  id="email-reset"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter user email"
                />
              </Stack>
              {touched.email && errors.email && (
                <FormHelperText error id="helper-text-password-reset-email">
                  {errors.email}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password-reset-current">Current Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.currentPassword && errors.currentPassword)}
                  id="password-reset-current"
                  type={showPassword ? 'text' : 'password'}
                  value={values.currentPassword}
                  name="currentPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Enter current password"
                />
              </Stack>
              {touched.currentPassword && errors.currentPassword && (
                <FormHelperText error id="helper-text-password-reset">
                  {errors.currentPassword}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password-reset-new">New Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.newPassword && errors.newPassword)}
                  id="password-reset-new"
                  type={showPassword ? 'text' : 'password'}
                  value={values.newPassword}
                  name="newPassword"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    changePassword(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Enter new password"
                />
              </Stack>
              {touched.newPassword && errors.newPassword && (
                <FormHelperText error id="helper-text-password-reset">
                  {errors.newPassword}
                </FormHelperText>
              )}
              <FormControl fullWidth sx={{ mt: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" fontSize="0.75rem">
                      {level?.label}
                    </Typography>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="confirm-password-reset">Confirm Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                  id="confirm-password-reset"
                  type="password"
                  value={values.confirmPassword}
                  name="confirmPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter confirm password"
                />
              </Stack>
              {touched.confirmPassword && errors.confirmPassword && (
                <FormHelperText error id="helper-text-confirm-password-reset">
                  {errors.confirmPassword}
                </FormHelperText>
              )}
            </Grid>

            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}
            <Grid item xs={12}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                  Reset Password
                </Button>
              </AnimateButton>
            </Grid>
            <Grid item xs={12}>
              <Button disableElevation fullWidth size="large" onClick={() => router.push(APP_DEFAULT_PATH)}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
