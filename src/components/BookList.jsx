import React, { useState, useEffect } from 'react';
import BookRow from './BookRow';
import { Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/books');
      const booksWithMetadata = await Promise.all(
        response.data.data.map(async (book) => {
          try {
            if (!book.isbn) {
              console.warn(`Book ${book._id} has no ISBN`);
              return book;
            }
            const googleBooksResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn}`);
            const googleBookData = googleBooksResponse.data.items?.[0]?.volumeInfo;
            if (!googleBookData) {
              console.warn(`No Google Books data found for ISBN: ${book.isbn}`);
              return book;
            }
            return {
              ...book,
              coverImage: googleBookData?.imageLinks?.thumbnail || '/placeholder.svg',
              description: googleBookData?.description || book.description,
              rating: googleBookData?.averageRating,
            };
          } catch (error) {
            console.error('Error fetching Google Books data:', error);
            return book;
          }
        })
      );
      setBooks(booksWithMetadata);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Failed to fetch books. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!books || books.length === 0) {
    return <Typography>No books available at the moment.</Typography>;
  }

  const branches = [...new Set(books.map(book => book.branch.name))];

  return (
    <div className="p-8">
      <Typography variant="h4" className="mb-8 font-bold text-primary">Book Catalog</Typography>
      {branches.map(branch => (
        <BookRow 
          key={branch} 
          books={books.filter(book => book.branch.name === branch)} 
          branch={branch} 
        />
      ))}
    </div>
  );
}

export default BookList;