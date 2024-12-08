'use client';
import React, { useState, useEffect } from 'react';
import getRandomBook from 'utils/randomBook';
import Rating from '@mui/material/Rating';

interface Book {
  isbn13: string;
  authors: string;
  publication: number;
  title: string;
  ratings: {
    average: number;
    count: number;
    rating_1: number;
    rating_2: number;
    rating_3: number;
    rating_4: number;
    rating_5: number;
  };
  icons: {
    large: string;
    small: string;
  };
}

const RandomBook = () => {
  const [randomBook, setRandomBook] = useState<Book | null>(null);

  const fetchRandomBook = async () => {
    try {
      const book = await getRandomBook();
      setRandomBook(book);
    } catch (error) {
      console.error('Error fetching random book:', error);
    }
  };

  // Fetch on page component load
  useEffect(() => {
    fetchRandomBook();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
      {randomBook ? (
        <>
          {/* Title */}
          <h1
            style={{
              fontSize: '1.5em',
              textAlign: 'left',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: '100%',
              marginBottom: '10px'
            }}
            title={randomBook.title} // Tooltip for the full title
          >
            {randomBook.title}
          </h1>

          {/* Container for the image and text */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', maxWidth: '100%', flexShrink: 0 }}>
            {/* Image */}
            <img
              src={randomBook.icons.large}
              alt={`${randomBook.title} cover`}
              style={{ width: '150px', height: 'auto', marginRight: '20px' }}
            />

            {/* Text Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <p style={{ margin: 0 }}>
                <strong>Author:</strong> {randomBook.authors}
              </p>
              <p style={{ margin: 0 }}>
                <strong>Publication Year:</strong> {randomBook.publication}
              </p>
              <p style={{ margin: 0 }}>
                <strong>Average Rating:</strong> {randomBook.ratings.average} ({randomBook.ratings.count} reviews)
                <div>
                  <Rating name="bookRating" value={randomBook.ratings.average} precision={0.2} size="small" readOnly />
                </div>
              </p>
            </div>
          </div>
        </>
      ) : (
        <p>Loading random book...</p>
      )}
    </div>
  );
};

export default RandomBook;
