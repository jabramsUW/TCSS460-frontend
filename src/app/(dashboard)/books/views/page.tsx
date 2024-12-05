'use client';

import { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Card, CardContent, CardMedia, Grid, Alert } from '@mui/material';

const API_URL = 'http://localhost:4000/book/title';

type Book = {
  isbn13: string | null;
  authors: string;
  publication: number;
  title: string;
  ratings?: {
    average: number;
    count: number;
    rating_1: number;
    rating_2: number;
    rating_3: number;
    rating_4: number;
    rating_5: number;
  };
  series_info?: {
    name: string | null;
    position: number | null;
  };
  icons?: {
    large: string;
    small: string;
  };
};

export default function BookSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchTerm) {
      setError('Title was not provided.');
      return;
    }

    try {
      const response = await axios.get(API_URL, {
        params: {
          title: searchTerm.trim(),
        },
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoxLCJpZCI6MiwiaWF0IjoxNzMzMzk5ODE4LCJleHAiOjE3MzQ2MDk0MTh9.-87zOzEWvg91q-TorZRccNkbc9FdkpDod-yJCHRg0yc`,
        },
      });
      if (response.data && response.data.entries.length > 0) {
        // For simplicity, we'll assume we display only the first result found.
        setBook(response.data.entries[0]);
        setError('');
      } else {
        setError('No books found for that given title.');
        setBook(null);
      }
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        setError('Title was not provided.');
      } else if (err.response && err.response.status === 404) {
        setError('No books found for that given title.');
      } else if (err.response && err.response.status === 401) {
        setError('Unauthorized access. Please provide a valid token.');
      } else if (err.response && err.response.status === 500) {
        setError('Internal Server Error. Please try again later.');
      } else {
        setError('An error occurred while fetching book data.');
      }
      setBook(null);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '40px' }}>
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

      {book && (
        <Card style={{ marginTop: '40px' }}>
          <Grid container spacing={2} direction="row-reverse">
            {book.icons && book.icons.large && (
              <Grid item xs={12} sm={4}>
                <CardMedia
                  component="img"
                  image={book.icons.large}
                  alt={book.title}
                  style={{ height: '100%', objectFit: 'cover', padding: '10px'}}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={8}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {book.title}
                </Typography>
                <Typography variant="body1">
                  <strong>ISBN:</strong> {book.isbn13 || 'Not available'}
                </Typography>
                <Typography variant="body1">
                  <strong>Authors:</strong> {book.authors}
                </Typography>
                <Typography variant="body1">
                  <strong>Publication Year:</strong> {book.publication}
                </Typography>
                {book.series_info && (
                  <div>
                    <Typography variant="body1">
                      <strong>Series Name:</strong> {book.series_info.name ? book.series_info.name : 'Not available'}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Series Position:</strong> {book.series_info.position ? book.series_info.position : 'Not available'}
                    </Typography>
                  </div>
                )}
                {book.ratings && (
                  <div>
                    <Typography variant="body1">
                      <strong>Average Rating:</strong> {book.ratings.average}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Total Ratings Count:</strong> {book.ratings.count}
                    </Typography>
                    <Typography variant="body1">
                      <strong>5-Star Ratings:</strong> {book.ratings.rating_5}
                    </Typography>
                    <Typography variant="body1">
                      <strong>4-Star Ratings:</strong> {book.ratings.rating_4}
                    </Typography>
                    <Typography variant="body1">
                      <strong>3-Star Ratings:</strong> {book.ratings.rating_3}
                    </Typography>
                    <Typography variant="body1">
                      <strong>2-Star Ratings:</strong> {book.ratings.rating_2}
                    </Typography>
                    <Typography variant="body1">
                      <strong>1-Star Ratings:</strong> {book.ratings.rating_1}
                    </Typography>
                  </div>
                )}
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      )}
    </Container>
  );
}
