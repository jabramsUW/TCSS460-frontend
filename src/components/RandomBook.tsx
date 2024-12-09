'use client';
import React, { useState, useEffect } from 'react';
import getRandomBook from 'utils/randomBook';
import Rating from '@mui/material/Rating';
import CircularLoader from './CircularLoader';
import Link from 'next/link';
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
              margin: '0px'
            }}
            title={randomBook.title}
          >
            <a
              href={`/books/view?isbn=${randomBook.isbn13}`} // Replace this with the link you want
              style={{
                textDecoration: 'none',
                color: 'inherit',
                margin: 0,
                padding: 0
              }}
              title={randomBook.title} // Tooltip for the full title
            >
              {randomBook.title}
            </a>
          </h1>

          {/* Container for the image and text */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', maxWidth: '100%', flexShrink: 0 }}>
            {/* Image */}
            <Link href={`/books/view?isbn=${randomBook.isbn13}`}>
              <img
                src={randomBook.icons.large}
                alt={`${randomBook.title} cover`}
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
                <strong>Author(s):</strong> {randomBook.authors}
              </p>
              <p style={{ margin: 0 }}>
                <strong>Year:</strong> {randomBook.publication}
              </p>
              <p style={{ margin: 0 }}>
                <strong>Rating:</strong> {randomBook.ratings.average}
                <div>
                  <Rating name="bookRating" value={randomBook.ratings.average} precision={0.2} size="medium" readOnly />
                  <br /> ({randomBook.ratings.count} reviews)
                </div>
              </p>
            </div>
          </div>
        </>
      ) : (
        <CircularLoader />
      )}
    </div>
  );
};

export default RandomBook;
