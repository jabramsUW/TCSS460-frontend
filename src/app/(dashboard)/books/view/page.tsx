'use client';
import BooksView from 'views/books/book-browse';
import BookInfo from 'views/books/book-info';
import { useSearchParams } from 'next/navigation';
// ==============================|| PAGE ||============================== //

export default function BooksBrowseViewPage() {
  const searchParams = useSearchParams();
  const isbn = searchParams.get('isbn');

  if (isbn) {
    return <BookInfo isbn={isbn} />;
  }

  return <BooksView />;
}
