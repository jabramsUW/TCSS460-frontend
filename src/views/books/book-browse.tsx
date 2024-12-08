'use client';

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Divider, List } from '@mui/material';

// project import
import axios from 'utils/axios';
import { IBook } from 'types/book';
import { IPagination } from 'types/pagination';
import BookSearchSelector from 'components/BookSearchSelector';
import { NoBook, BookListItem } from 'components/BookListItem';

const defaultTheme = createTheme();

let totalRecords = 0;

axios
  .get(`book/`)
  .then((response) => {
    totalRecords = parseInt(response.data.pagination.totalRecords);
  })
  .catch((error) => console.error(error));

export default function BooksBrowse() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [books, setBooks] = React.useState<IBook[]>([]);
  const [pagination, setPagination] = React.useState<IPagination>();
  const [sortOrder, setSortOrder] = React.useState('asc');

  const perPage = 10;
  const offset = (currentPage - 1) * perPage;
  const pageCount = pagination ? Math.ceil(parseInt(pagination.totalRecords) / perPage) : 0;

  React.useEffect(() => {
    axios
      .get(`book/?limit=${totalRecords}&offset=0`)

      .then((response) => {
        setBooks(response.data.entries);
        setPagination(response.data.pagination);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (isbn: number) => {
    axios
      .delete('book/isbn?isbn=' + isbn)
      .then((response) => {
        response.status == 200 && setBooks(books.filter((entry) => entry.isbn13 !== isbn));
      })
      .catch((error) => console.error(error));
  };

  const currentPageBooks = books.slice(offset, offset + perPage).map((bk, index, books) => (
    <React.Fragment key={'bk list item: ' + index}>
      <BookListItem book={bk} onDelete={handleDelete} />
      {index < books.length - 1 && <Divider variant="middle" component="li" />}
    </React.Fragment>
  ));

  const handleParameterClick = (event: React.MouseEvent<HTMLElement>, newKey: keyof IBook) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    // if (newKey === 'ratings') {
    //   newKey = 'ratings[average]';

    // }

    const sortedItems = [...books].sort((a, b) => {
      if (newKey === 'ratings') {
        const valueA = a.ratings.average;
        const valueB = b.ratings.average;
        if (valueA < valueB) {
          return sortOrder === 'asc' ? -1 : 1;
        } else if (valueA > valueB) {
          return sortOrder === 'asc' ? 1 : -1;
        }
      } else if (a[newKey] !== undefined && b[newKey] !== undefined) {
        const valueA = a[newKey] as string;
        const valueB = b[newKey] as string;
        if (valueA < valueB) {
          return sortOrder === 'asc' ? -1 : 1;
        } else if (valueA > valueB) {
          return sortOrder === 'asc' ? 1 : -1;
        }
      }
      return 0;
    });

    setBooks(sortedItems);
    setCurrentPage(1);
  };

  const handlePageClick = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4">Sort Books By</Typography>
          <BookSearchSelector onClick={handleParameterClick} />
          <Box sx={{ mt: 1 }}>
            <List>{currentPageBooks.length ? currentPageBooks : <NoBook />}</List>
          </Box>
          <Pagination count={pageCount} page={currentPage} onChange={handlePageClick} color="primary" />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
