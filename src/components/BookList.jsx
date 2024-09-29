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
      setBooks(response.data.data);
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