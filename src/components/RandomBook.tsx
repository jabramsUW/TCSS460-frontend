'use client';
import React, { useState, useEffect } from 'react';
import getRandomBook from 'utils/randomBook';

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
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
      {randomBook ? (
        <>
          <img src={randomBook.icons.large} alt={`${randomBook.title} cover`} style={{ width: '150px', height: 'auto', flexShrink: 0 }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexGrow: 1 }}>
            <h1>{randomBook.title}</h1>
            <p>
              <strong>Author:</strong> {randomBook.authors}
            </p>
            <p>
              <strong>Publication Year:</strong> {randomBook.publication}
            </p>
            <p>
              <strong>Average Rating:</strong> {randomBook.ratings.average} ({randomBook.ratings.count} reviews)
            </p>
          </div>
        </>
      ) : (
        <p>Loading random book...</p>
      )}
      {/*
      <button onClick={fetchRandomBook}>Get Random Book</button> */}
    </div>
  );
};

export default RandomBook;
