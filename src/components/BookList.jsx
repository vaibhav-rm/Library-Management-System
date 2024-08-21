import React from 'react';
import BookRow from './BookRow';
import { dummyBooks } from './dummyBooks';

function BookList() {
  const CSE = dummyBooks.slice(0, 20);
  const ENC = dummyBooks.slice(20, 40);

  return (
    <div className="p-4">
      <BookRow books={CSE} branch="CSE Section" />
      <BookRow books={ENC} branch="ENC Section" />
      <BookRow books={CSE} branch="CSE Section" />
      <BookRow books={ENC} branch="ENC Section" />
    </div>
  );
}

export default BookList;
