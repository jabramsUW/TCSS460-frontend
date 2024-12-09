'use client';
import { IBook } from 'types/book';
import { useEffect, useState } from 'react';
import axios from 'utils/axios';
import Rating from '@mui/material/Rating';
import CircularLoader from 'components/CircularLoader';
import MainCard from 'components/MainCard';
import { useRouter } from 'next/navigation'; // Use next/navigation for routing
import RatingsSliders from 'components/RatingSliders';
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Alert } from '@mui/material';
import { Box } from '@mui/system';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
interface BookInfoProps {
  isbn: string;
}

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

const BookInfo: React.FC<BookInfoProps> = ({ isbn }) => {
  const [bookData, setBookData] = useState<IBook | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false); // Dialog open state
  const router = useRouter(); // Get router instance
  const [alert, setAlert] = useState(EMPTY_ALERT);
  const [userRating, setUserRating] = useState<number | null>(null); // User-selected rating
  const [ratingColor, setRatingColor] = useState('#ff9800'); // Default star color

  const onSuccess = (message: string) => {
    setAlert({
      showAlert: true,
      alertMessage: message,
      alertSeverity: 'success'
    });
  };

  const onError = (message: string) => {
    setAlert({
      showAlert: true,
      alertMessage: message,
      alertSeverity: 'error'
    });
  };

  const handleBackButton = () => {
    router.back(); // Navigate back to the previous page
  };

  const handleDelete = async () => {
    try {
      // API call to delete the book
      await axios.delete(`/book/isbn/?isbn=${isbn}`);
      onSuccess('Book was deleted!');
      handleBackButton(); // Navigate back after successful deletion
    } catch (err) {
      console.error('Error deleting book:', err);
      onError('Could not delete book: ' + err);
      setConfirmOpen(false);
    }
  };

  const handleRatingChange = async (newRating: number) => {
    setUserRating(newRating); // Update locally immediately
    try {
      // Send the rating to the backend
      await axios.put('book', {
        isbn: bookData?.isbn13,
        [`new_star${newRating}`]: 1
      });
      fetchBookInfo(); // Re-fetch the book data to update the average rating and count
      setAlert({ showAlert: true, alertMessage: 'Rating updated successfully!', alertSeverity: 'success' });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error updating rating:', err);
        setAlert({ showAlert: true, alertMessage: 'Failed to update rating: ' + err.message, alertSeverity: 'error' });
      }
      // Reset the color to red if the update fails
      setRatingColor('#f44336'); // Red for error
      setTimeout(() => setRatingColor('#ff9800'), 2000); // Reset to default
    }
  };

  const fetchBookInfo = async () => {
    try {
      const response = await axios.get(`/book/isbn/?isbn=${isbn}`);

      // Access data inside 'entry' and map it to the IBook interface
      const book: IBook = {
        isbn13: response.data.entry.isbn13,
        authors: response.data.entry.authors,
        publication: response.data.entry.publication,
        title: response.data.entry.title,
        ratings: {
          average: response.data.entry.ratings?.average ?? 0, // Optional chaining and fallback for undefined/null
          count: response.data.entry.ratings?.count ?? 0,
          rating_1: response.data.entry.ratings?.rating_1 ?? 0,
          rating_2: response.data.entry.ratings?.rating_2 ?? 0,
          rating_3: response.data.entry.ratings?.rating_3 ?? 0,
          rating_4: response.data.entry.ratings?.rating_4 ?? 0,
          rating_5: response.data.entry.ratings?.rating_5 ?? 0
        },
        icons: response.data.entry.icons,
        series_info: {
          name: response.data.entry.series_info?.name ?? '',
          position: response.data.entry.series_info?.position
        }
      };

      setBookData(book); // Set the state with properly mapped data
      setUserRating(book.ratings.average);
    } catch (err) {
      console.error('Error fetching book data:', err); // Log the error
      setError('Failed to fetch book information');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookInfo();

    if (isbn) {
      fetchBookInfo();
    }
  }, [isbn]);

  if (loading) {
    return <CircularLoader />;
  }

  if (error) {
    return (
      <>
        {alert.showAlert && (
          <Alert severity={alert.alertSeverity as any} onClose={() => setAlert(EMPTY_ALERT)}>
            {alert.alertMessage}
          </Alert>
        )}

        <p>{error}</p>
      </>
    );
  }

  return (
    <>
      {alert.showAlert && (
        <Alert severity={alert.alertSeverity as any} onClose={() => setAlert(EMPTY_ALERT)}>
          {alert.alertMessage}
        </Alert>
      )}

      {/* Back Button */}
      <button onClick={handleBackButton} style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer' }}>
        Back
      </button>

      <MainCard title={bookData?.title}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          {/* Container for the image and text */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', maxWidth: '100%', flexShrink: 0 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                marginRight: 2
              }}
            >
              {/* Image */}
              <Box
                component="img"
                src={bookData?.icons.large}
                alt={`${bookData?.title} cover`}
                sx={{
                  width: 150,
                  height: 'auto',
                  borderRadius: '4px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />

              {/* Delete Button */}
              <Button variant="contained" color="error" onClick={() => setConfirmOpen(true)}>
                Delete Book
              </Button>
            </Box>
            {/* Text Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '300px' }}>
              <p style={{ margin: 0 }}>
                <strong>Author(s):</strong> {bookData?.authors}
              </p>
              <p style={{ margin: 0 }}>
                <strong>Year:</strong> {bookData?.publication}
              </p>
              <p style={{ margin: 0 }}>
                <strong>ISBN13:</strong> {bookData?.isbn13}
              </p>
              <p style={{ margin: 0 }}>
                {/* Series Information */}
                {bookData?.series_info && bookData.series_info.name !== '' && (
                  <p style={{ margin: 0 }}>
                    <strong>Series:</strong> {bookData?.series_info.name} (Book {bookData.series_info?.position})
                  </p>
                )}
                <div>
                  <strong>Rating:</strong> {(bookData?.ratings?.average ?? 0).toFixed(2)} <br />
                  <Rating
                    value={userRating}
                    onChange={(event, newValue) => {
                      if (newValue !== null) {
                        // Prevent deselecting
                        handleRatingChange(newValue);
                      }
                    }}
                    size="large"
                    precision={1}
                    icon={<StarIcon style={{ color: ratingColor }} />} // Use dynamic color
                    emptyIcon={<StarBorderIcon style={{ color: '#ccc' }} />} // Default empty star color
                  />
                  <br /> <small>({bookData?.ratings.count} reviews)</small>
                </div>
                {bookData && <RatingsSliders book={bookData} />}
              </p>
            </div>
          </div>
        </div>
      </MainCard>
      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this book? This cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookInfo;
