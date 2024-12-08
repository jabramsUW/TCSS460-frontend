'use client';

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Divider, List } from '@mui/material';

// project import
import axios from 'utils/axios';
import { IBook } from 'types/book';
import { NoBook, BookListItem } from 'components/BookListItem';

const defaultTheme = createTheme();

export default function BooksBySeries() {
  const [books, setBooks] = React.useState<IBook[]>([]);
  const searchParams = new URLSearchParams(document.location.search);
  if (!searchParams.has('name')) {
    window.location.href = '/books/by-series';
  }
  const seriesName = searchParams.get('name');

  React.useEffect(() => {
    axios
      .get('book/series/' + seriesName)
      .then((response) => {
        setBooks(response.data.entries);
      })
      .catch((error) => console.error(error));
  }, [seriesName]);

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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4">Select Book</Typography>
          <Box sx={{ mt: 1 }}>
            <List>{booksAsComponents.length ? booksAsComponents : <NoBook />}</List>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
