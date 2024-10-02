import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Paper, 
  Chip, 
  CircularProgress, 
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openBorrowDialog, setOpenBorrowDialog] = useState(false);
  const [borrowing, setBorrowing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

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

      // Fetch author names based on author IDs
      const authorIds = bookData.author;
      const authorPromises = authorIds.map(authorId => axios.get(`http://localhost:8000/api/v1/authors/${authorId}`));
      
      const authorResponses = await Promise.all(authorPromises);
      const authorNames = authorResponses.map(res => res.data.data.name);
      setAuthors(authorNames);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching book or author details:', error);
      if (error.response && error.response.status === 404) {
        setError('Book not found. It may have been removed from the library.');
      } else {
        setError('Failed to fetch book details. Please try again later.');
      }
      setLoading(false);
    }
  };

  const handleBorrowBook = async () => {
    setBorrowing(true);
    try {
      await axios.post(`http://localhost:8000/api/v1/books/${id}/borrow`);
      setSnackbar({ open: true, message: 'Book borrowed successfully!', severity: 'success' });
      setOpenBorrowDialog(false);
      fetchBookDetails();
    } catch (error) {
      console.error('Error borrowing book:', error);
      setSnackbar({ open: true, message: 'Failed to borrow book. Please try again.', severity: 'error' });
    } finally {
      setBorrowing(false);
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
      <Paper elevation={3} className="p-4 sm:p-8">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <img
              src={book.imageLinks?.thumbnail || '/placeholder.svg'}
              alt={book.title}
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" className="mb-4 font-bold text-primary break-words">
              {book.title}
            </Typography>
            <Typography variant="h6" className="mb-2 text-gray-600">
              by {authors.join(', ')}
            </Typography>
            <Chip label={book.branch.name} className="mb-4" />
            <Typography variant="body1" className="mb-4">{book.description || 'No description available.'}</Typography>
            <Typography variant="body2" className="mb-2">ISBN: {book.isbn || 'N/A'}</Typography>
            <Typography variant="body2" className="mb-2">Published Year: {book.publicationYear || 'N/A'}</Typography>
            <Typography variant="body2" className="mb-2">Available Copies: {book.copies - book.borrowedCopies}</Typography>
            {book.averageRating && (
              <Typography variant="body2" className="mb-2">Rating: {book.averageRating}/5</Typography>
            )}
            <Button 
              variant="contained" 
              color="primary" 
              className="mt-4"
              onClick={() => setOpenBorrowDialog(true)}
              disabled={book.copies - book.borrowedCopies === 0}
            >
              {book.copies - book.borrowedCopies === 0 ? 'Not Available' : 'Borrow Book'}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Dialog
        open={openBorrowDialog}
        onClose={() => setOpenBorrowDialog(false)}
      >
        <DialogTitle>Borrow Book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to borrow "{book.title}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBorrowDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleBorrowBook} color="primary" disabled={borrowing}>
            {borrowing ? 'Borrowing...' : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
