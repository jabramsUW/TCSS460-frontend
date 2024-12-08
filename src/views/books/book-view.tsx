'use client';

import { useState } from 'react';
import axios from 'utils/axios';
import { IBook } from 'types/book';
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Box,
  LinearProgress
} from '@mui/material';

export default function BookSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [book, setBook] = useState<IBook | null>(null);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSearch = async () => {
    if (!searchTerm) {
      setError('Title was not provided.');
      return;
    }

    try {
      const response = await axios.get('book/title', { params: { title: searchTerm.trim() } });
      if (response.data && response.data.entries.length > 0) {
        setBook(response.data.entries[0]);
        setError('');
      } else {
        setError('No books found for that given title.');
        setBook(null);
      }
    } catch (err: any) {
      setError(
        err.response?.status === 400
          ? 'Title was not provided.'
          : err.response?.status === 404
            ? 'No books found for that given title.'
            : err.response?.status === 401
              ? 'Unauthorized access. Please provide a valid token.'
              : err.response?.status === 500
                ? 'Internal Server Error. Please try again later.'
                : 'An error occurred while fetching book data.'
      );
      setBook(null);
    }
  };

  const handleLeaveReviewClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedRating(null);
  };

  const handleRateBook = async () => {
    if (!book?.isbn13 || selectedRating === null) return;

    try {
      const response = await axios.put('book', {
        isbn: book.isbn13,
        [`new_star${selectedRating}`]: 1
      });

      if (response.status === 200) {
        setFeedbackMessage('Rating submitted successfully!');
        setIsSuccess(true);
        setSnackbarOpen(true);

        let timer = 0;
        const interval = setInterval(() => {
          timer += 20;
          setProgress((prev) => prev + 2);
          if (timer >= 5000) {
            clearInterval(interval);
            setSnackbarOpen(false);
            setProgress(0);
          }
        }, 100);

        const updatedResponse = await axios.get('book/title', { params: { title: searchTerm.trim() } });
        if (updatedResponse.data && updatedResponse.data.entries.length > 0) {
          setBook(updatedResponse.data.entries[0]);
        }
        setDialogOpen(false);
      } else {
        throw new Error('Failed to submit rating.');
      }
    } catch (error) {
      console.error('Failed to submit rating:', error);
      setFeedbackMessage('Failed to submit rating. Please try again.');
      setIsSuccess(false);
      setSnackbarOpen(true);
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
            {book.icons?.large && (
              <Grid item xs={12} sm={4}>
                <CardMedia
                  component="img"
                  image={book.icons.large}
                  alt={book.title}
                  style={{ height: '100%', objectFit: 'cover', padding: '10px' }}
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
                {book.ratings && (
                  <div>
                    <Typography variant="body1">
                      <strong>Average Rating:</strong> {book.ratings.average || 'Not available'}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Total Ratings Count:</strong> {book.ratings.count || 'Not available'}
                      <Button size="small" color="primary" onClick={handleLeaveReviewClick} style={{ marginLeft: '10px' }}>
                        Leave a Review
                      </Button>
                    </Typography>
                    <Typography variant="body1">
                      <strong>1-Star Ratings:</strong> {book.ratings.rating_1 || 'N/A'}
                    </Typography>
                    <Typography variant="body1">
                      <strong>2-Star Ratings:</strong> {book.ratings.rating_2 || 'N/A'}
                    </Typography>
                    <Typography variant="body1">
                      <strong>3-Star Ratings:</strong> {book.ratings.rating_3 || 'N/A'}
                    </Typography>
                    <Typography variant="body1">
                      <strong>4-Star Ratings:</strong> {book.ratings.rating_4 || 'N/A'}
                    </Typography>
                    <Typography variant="body1">
                      <strong>5-Star Ratings:</strong> {book.ratings.rating_5 || 'N/A'}
                    </Typography>
                  </div>
                )}
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      )}

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Leave a Review</DialogTitle>
        <DialogContent>
          <DialogContentText>Select a rating (1 to 5 stars) for this book:</DialogContentText>
          <Box display="flex" justifyContent="space-around" marginTop="20px">
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                variant={selectedRating === star ? 'contained' : 'outlined'}
                color="primary"
                onClick={() => setSelectedRating(star)}
              >
                {star} Star{star > 1 ? 's' : ''}
              </Button>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleRateBook} color="primary">
            Rate
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Box position="relative" width="100%">
          <Alert onClose={() => setSnackbarOpen(false)} severity={isSuccess ? 'success' : 'error'} sx={{ width: '100%' }}>
            {feedbackMessage}
          </Alert>
          <LinearProgress variant="determinate" value={progress} style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }} />
        </Box>
      </Snackbar>
    </Container>
  );
}
