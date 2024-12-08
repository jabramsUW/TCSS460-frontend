'use client';

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Button, Divider, Grid, List, TextField } from '@mui/material';

// project import
import axios from 'utils/axios';
import { IBook } from 'types/book';
import { NoBook, BookListItem } from 'components/BookListItem';

const defaultTheme = createTheme();

export default function BookSearch() {
  const [books, setBooks] = React.useState<IBook[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSearch = () => {
    if (!searchTerm) {
      setError('Title was not provided.');
      return;
    }

    axios
      .get('book/title?title=' + searchTerm.trim())
      .then((response) => {
        setBooks(response.data.entries);
        setError('');
      })
      .catch((error) => setError(error.message));
  };

  const handleDelete = (isbn: number) => {
    axios
      .delete('book/isbn?isbn=' + isbn)
      .then((response) => {
        response.status == 200 && setBooks(books.filter((entry) => entry.isbn13 !== isbn));
      })
      .catch((error) => console.error(error));
  };

  const booksAsComponents = books.map((bk, index, books) => (
    <React.Fragment key={'bk list item: ' + index}>
      <BookListItem book={bk} onDelete={handleDelete} />
      {index < books.length - 1 && <Divider variant="middle" component="li" />}
    </React.Fragment>
  ));

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Typography variant="h4" gutterBottom>
          Book Search
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              fullWidth
              variant="outlined"
              label="Enter book title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(ev) => {
                if (ev.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" color="primary" onClick={handleSearch} fullWidth>
              Search
            </Button>
          </Grid>
        </Grid>

        {error && (
          <Alert severity="error" style={{ marginTop: '20px' }}>
            {error}
          </Alert>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ mt: 1 }}>
            <List>{booksAsComponents.length ? booksAsComponents : <NoBook />}</List>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
