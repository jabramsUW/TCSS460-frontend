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
import { NoSeries, SeriesListItem } from 'components/SeriesListItem';
import { NoBook, BookListItem } from 'components/BookListItem';

const defaultTheme = createTheme();

export default function BooksBySeries() {
  const [series, setSeries] = React.useState<String[]>([]);
  const [books, setBooks] = React.useState<IBook[]>([]);
  const [parameter, setParameter] = React.useState(0);

  React.useEffect(() => {
    axios
      .get('book/series')
      .then((response) => {
        setSeries(response.data.series_names);
        // console.dir(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (seriesName: String) => {
    axios
      .delete('book/series?series=' + seriesName)
      .then((response) => {
        response.status == 200 && setSeries(series.filter((entryName) => entryName !== seriesName));
        // console.dir(response.status);
      })
      .catch((error) => console.error(error));
  };

  const seriesAsComponents = series
    // .filter((bk) => parameter == 0 || parameter == bk.parameter)
    .map((seriesName, index, series) => (
      <React.Fragment key={'seriesName list item: ' + index}>
        <SeriesListItem series={seriesName} onDelete={handleDelete} />
        {index < series.length - 1 && <Divider variant="middle" component="li" />}
      </React.Fragment>
    ));

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4">Select Series</Typography>
          <Box sx={{ mt: 1 }}>
            <List>{seriesAsComponents.length ? seriesAsComponents : <NoBook />}</List>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}