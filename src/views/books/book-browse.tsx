'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Divider, List } from '@mui/material';

// project import
import axios from 'utils/axios';
import { IBook } from 'types/book';
import BookSearchSelector from 'components/BookSearchSelector';
import { NoBook, BookListItem } from 'components/BookListItem';

const defaultTheme = createTheme();

export default function BooksBrowse() {
  const [books, setBooks] = React.useState<IBook[]>([]);
  const [parameter, setParameter] = React.useState(0);

  React.useEffect(() => {
    axios
      .get('book/offset?limit=50&offset=0')
      .then((response) => {
        setBooks(response.data.entries);
        // console.dir(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (isbn: number) => {
    // axios
    //   .delete('c/message/' + name)
    //   .then((response) => {
    //     response.status == 200 && setMessages(messages.filter((msg) => msg.name !== name));
    //     // console.dir(response.status);
    //   })
    //   .catch((error) => console.error(error));
  };

  const handleParameterClick = (event: React.MouseEvent<HTMLElement>, newParameter: String) => setParameter(newParameter ?? '');

  const booksAsComponents = books
    // .filter((bk) => parameter == 0 || parameter == bk.parameter)
    .map((bk, index, books) => (
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
          <Typography variant="h4">Browse Books</Typography>
          <BookSearchSelector initialValue={'ISBN'} onClick={handleParameterClick} />
          <Box sx={{ mt: 1 }}>
            <List>{booksAsComponents.length ? booksAsComponents : <NoBook />}</List>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
