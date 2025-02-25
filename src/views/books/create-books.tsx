'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Divider } from '@mui/material';

// Project imports
import SendBook from 'sections/books/book-forms/addBook';

const defaultTheme = createTheme();

interface IAlert {
  showAlert: boolean;
  alertMessage: string;
  alertSeverity: string;
}

const EMPTY_ALERT: IAlert = {
  showAlert: false,
  alertMessage: '',
  alertSeverity: ''
};

export default function BookSend() {
  const [alert, setAlert] = React.useState(EMPTY_ALERT);

  const onSuccess = () => {
    setAlert({
      showAlert: true,
      alertMessage: 'The book was added!',
      alertSeverity: 'success'
    });
  };

  const onError = (message: string) => {
    setAlert({
      showAlert: true,
      alertMessage: 'The book was NOT added! Error: ' + message,
      alertSeverity: 'error'
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {alert.showAlert && (
        <Alert severity={alert.alertSeverity as any} onClose={() => setAlert(EMPTY_ALERT)}>
          {alert.alertMessage}
        </Alert>
      )}
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LibraryAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add a New Book
          </Typography>
          <Divider sx={{ marginY: 3 }} />

          <Box sx={{ mt: 1 }}>
            <SendBook onSuccess={onSuccess} onError={onError} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
