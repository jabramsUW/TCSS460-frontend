'use client';

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Button, Divider, Grid, List, MenuItem, TextField } from '@mui/material';

// project import
import axios from 'utils/axios';
import { IBook } from 'types/book';
import { NoBook, BookListItem } from 'components/BookListItem';

const defaultTheme = createTheme();

export default function BookSearch() {
  const [books, setBooks] = React.useState<IBook[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [error, setError] = React.useState('');
  const [searchBy, setSearchBy] = React.useState('title');

  const terms = [
    {
      value: 'title',
      label: 'Title'
    },
    {
      value: 'author',
      label: 'Author'
    },
    {
      value: 'publication year',
      label: 'Year'
    },
    {
      value: 'ISBN',
      label: 'ISBN'
    },
    {
      value: 'minimum rating (0-5)',
      label: 'Rating'
    }
  ];

  const handleSearch = () => {
    if (!searchTerm) {
      setError(`${searchBy} was not provided.`);
      return;
    }

    let url = '';
    switch (searchBy) {
      case 'title':
        url = 'book/title?title=' + searchTerm.trim();
        break;
      case 'author':
        url = 'book/authors/' + searchTerm.trim();
        break;
      case 'publication year':
        url = 'book/year?year_min=' + searchTerm.trim() + '&year_max=' + searchTerm.trim();
        break;
      case 'ISBN':
        window.location.href = `/books/view?isbn=` + searchTerm.trim()
        break;
      case 'minimum rating (0-5)':
        url = 'book/rating?rating_min=' + searchTerm.trim();
        break;
    }

    axios
      .get(url)
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
          <Grid item xs={2}>
            <TextField
              fullWidth
              variant="outlined"
              label="Search by"
              defaultValue="title"
              select
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchBy(e.target.value)}
            >
              {terms.map((term) => (
                <MenuItem key={term.value} value={term.value}>
                  {term.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              variant="outlined"
              label={`Enter book ${searchBy}`}
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
