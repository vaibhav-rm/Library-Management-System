import React from 'react';
import BookRow from './BookRow';
import { dummyBooks } from './dummyBooks';
import { Typography } from '@mui/material';

function BookList() {
  const CSE = dummyBooks.slice(0, 20);
  const ENC = dummyBooks.slice(20, 40);

  return (
    <div className="p-8">
      <Typography variant="h4" className="mb-8 font-bold text-primary">Book Catalog</Typography>
      <BookRow books={CSE} branch="Computer Science & Engineering" />
      <BookRow books={ENC} branch="Electronics & Communication" />
      <BookRow books={CSE} branch="Information Technology" />
      <BookRow books={ENC} branch="Electrical Engineering" />
    </div>
  );
}

export default BookList;