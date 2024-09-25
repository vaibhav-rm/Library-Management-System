import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Grid, Paper, Chip, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/books/${id}`);
      const bookData = response.data.data;

      if (!bookData) {
        throw new Error('Book not found in the database');
      }

      setBook(bookData);
      setLoading(false);

      // Fetch additional metadata from Google Books API
      if (bookData.isbn) {
        try {
          const googleBooksResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${bookData.isbn}`);
          const googleBookData = googleBooksResponse.data.items?.[0]?.volumeInfo;

          if (googleBookData) {
            setBook(prevBook => ({
              ...prevBook,
              coverImage: googleBookData?.imageLinks?.thumbnail || '/placeholder.svg',
              description: googleBookData?.description || prevBook.description,
              rating: googleBookData?.averageRating,
            }));
          }
        } catch (googleError) {
          console.error('Error fetching Google Books data:', googleError);
        }
      }
    } catch (error) {
      console.error('Error fetching book details:', error);
      if (error.response && error.response.status === 404) {
        setError('Book not found. It may have been removed from the library.');
      } else {
        setError('Failed to fetch book details. Please try again later.');
      }
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" className="py-8 flex justify-center items-center">
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Typography color="error">{error}</Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} className="mt-4">
          Back to Books
        </Button>
      </Container>
    );
  }

  if (!book) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Typography>Book not found</Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} className="mt-4">
          Back to Books
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} className="mb-4">
        Back to Books
      </Button>
      <Paper elevation={3} className="p-8">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <img
              src={book.coverImage || '/placeholder.svg'}
              alt={book.title}
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" className="mb-4 font-bold text-primary">{book.title}</Typography>
            <Typography variant="h6" className="mb-2 text-gray-600">by {book.author.map(a => a.name).join(', ')}</Typography>
            <Chip label={book.branch.name} className="mb-4" />
            <Typography variant="body1" className="mb-4">{book.description || 'No description available.'}</Typography>
            <Typography variant="body2" className="mb-2">ISBN: {book.isbn || 'N/A'}</Typography>
            <Typography variant="body2" className="mb-2">Publication Year: {book.publicationYear || 'N/A'}</Typography>
            <Typography variant="body2" className="mb-2">Available Copies: {book.copies - book.borrowedCopies}</Typography>
            {book.rating && (
              <Typography variant="body2" className="mb-2">Rating: {book.rating}/5</Typography>
            )}
            <Button variant="contained" color="primary" className="mt-4">
              Borrow Book
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}