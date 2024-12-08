'use client';
import { IBook } from 'types/book';
import { useEffect, useState } from 'react';
import axios from 'utils/axios';
import Rating from '@mui/material/Rating';
import CircularLoader from 'components/CircularLoader';
import Link from 'next/link';
import MainCard from 'components/MainCard';
import { useRouter } from 'next/navigation'; // Use next/navigation for routing
import RatingsSliders from 'components/RatingSliders';

interface BookInfoProps {
  isbn: string;
}

const BookInfo: React.FC<BookInfoProps> = ({ isbn }) => {
  const [bookData, setBookData] = useState<IBook | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Get router instance
  const handleBackButton = () => {
    router.back(); // Navigate back to the previous page
  };

  useEffect(() => {
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
      } catch (err) {
        console.error('Error fetching book data:', err); // Log the error
        setError('Failed to fetch book information');
      } finally {
        setLoading(false);
      }
    };

    if (isbn) {
      fetchBookInfo();
    }
  }, [isbn]);

  if (loading) {
    return <CircularLoader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {/* Back Button */}
      <button onClick={handleBackButton} style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer' }}>
        Back
      </button>
      <MainCard title={bookData?.title}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          {/* Container for the image and text */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', maxWidth: '100%', flexShrink: 0 }}>
            {/* Image */}
            <Link href={`/books/view?isbn=${bookData?.isbn13}`}>
              <img
                src={bookData?.icons.large}
                alt={`${bookData?.title} cover`}
                style={{
                  minWidth: '150px',
                  width: '150px',
                  height: 'auto',
                  marginRight: '20px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  borderRadius: '4px'
                }}
              />
            </Link>

            {/* Text Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <p style={{ margin: 0 }}>
                <strong>Author(s):</strong> {bookData?.authors}
              </p>
              <p style={{ margin: 0 }}>
                <strong>Year:</strong> {bookData?.publication}
              </p>
              <p style={{ margin: 0 }}>
                {/* Series Information */}
                {bookData?.series_info && bookData.series_info.name !== '' && (
                  <p style={{ margin: 0 }}>
                    <strong>Series:</strong> {bookData?.series_info.name} (Book {bookData.series_info?.position})
                  </p>
                )}
                <div>
                  <strong>Rating:</strong> {bookData?.ratings.average} <br />
                  <Rating name="bookRating" value={bookData?.ratings.average} precision={0.2} size="medium" readOnly />
                  <br /> <small>({bookData?.ratings.count} reviews)</small>
                </div>
                {bookData && <RatingsSliders book={bookData} />}
              </p>
            </div>
          </div>
        </div>
      </MainCard>
    </>
  );
};

export default BookInfo;
