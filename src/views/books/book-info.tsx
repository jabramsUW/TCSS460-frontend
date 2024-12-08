'use client';
import { IBook } from 'types/book';
import { useEffect, useState } from 'react';
import axios from 'utils/axios';
import Rating from '@mui/material/Rating';
import CircularLoader from 'components/CircularLoader';
import Link from 'next/link';

interface BookInfoProps {
  isbn: string;
}

const BookInfo: React.FC<BookInfoProps> = ({ isbn }) => {
  const [bookData, setBookData] = useState<IBook | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookInfo = async () => {
      try {
        console.log('Fetching book information for ISBN:', isbn); // Debugging line

        // Replace with the actual API endpoint
        const response = await axios.get(`/book/isbn/?isbn=${isbn}`);

        // Log the response data for debugging
        console.log('Response data:', response.data);

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
            position: response.data.entry.series_info?.positon ?? -1
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
      <>
        <h1
          style={{
            fontSize: '1.5em',
            textAlign: 'left',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '100%',
            margin: '0px'
          }}
          title={bookData?.title} // Tooltip for the full title
        >
          {bookData?.title}
        </h1>

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
                  <strong>Series:</strong> {bookData?.series_info.name} (Position {bookData?.series_info.position})
                </p>
              )}
              <div>
                <Rating name="bookRating" value={bookData?.ratings.average} precision={0.2} size="medium" readOnly />
                <br /> ({bookData?.ratings.count} reviews)
              </div>
              <strong>Rating:</strong> {bookData?.ratings.average}
              <div>
                {bookData?.ratings.rating_5} 5* reviews <br />
                {bookData?.ratings.rating_4} 4* reviews <br />
                {bookData?.ratings.rating_3} 3* reviews <br />
                {bookData?.ratings.rating_2} 2* reviews <br />
                {bookData?.ratings.rating_1} 1* reviews
              </div>
            </p>
          </div>
        </div>
      </>
    </div>
  );
};

export default BookInfo;
