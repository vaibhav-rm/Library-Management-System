// BookManagement.jsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, TextField, InputAdornment, CircularProgress, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import BookForm from '../../components/BookForm';
import BookTable from '../../components/BookTable';
import axios from 'axios';

export default function BookManagement() {
  const [books, setBooks] = useState([]);
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

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
      setSnackbar({ open: true, message: `Error fetching books: ${error.response?.data?.message || error.message}`, severity: 'error' });
      setLoading(false);
    }
  };

  const handleAddBook = async (newBook) => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/books', newBook);
      setBooks([...books, response.data.data]);
      setIsAddingBook(false);
      setSnackbar({ open: true, message: 'Book added successfully', severity: 'success' });
      return response.data;
    } catch (error) {
      console.error('Error adding book:', error);
      let errorMessage = 'Error adding book';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage += ': ' + (Array.isArray(error.response.data.message) 
          ? error.response.data.message.join(', ') 
          : error.response.data.message);
      } else if (error.message) {
        errorMessage += ': ' + error.message;
      }
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
      throw error;
    }
  };

  const handleEditBook = async (updatedBook) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/v1/books/${updatedBook._id}`, updatedBook);
      setBooks(books.map((book) => (book._id === updatedBook._id ? response.data.data : book)));
      setEditingBook(null);
      setSnackbar({ open: true, message: 'Book updated successfully', severity: 'success' });
    } catch (error) {
      console.error('Error updating book:', error);
      let errorMessage = 'Error updating book';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage += ': ' + (Array.isArray(error.response.data.message) 
          ? error.response.data.message.join(', ') 
          : error.response.data.message);
      } else if (error.message) {
        errorMessage += ': ' + error.message;
      }
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/books/${id}`);
      setBooks(books.filter((book) => book._id !== id));
      setSnackbar({ open: true, message: 'Book deleted successfully', severity: 'success' });
    } catch (error) {
      console.error('Error deleting book:', error);
      let errorMessage = 'Error deleting book';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage += ': ' + (Array.isArray(error.response.data.message) 
          ? error.response.data.message.join(', ') 
          : error.response.data.message);
      } else if (error.message) {
        errorMessage += ': ' + error.message;
      }
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.some(author => author.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      book.isbn.includes(searchTerm)
  );

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Book Management
      </Typography>
      <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} container justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => setIsAddingBook(true)}
          >
            Add New Book
          </Button>
        </Grid>
      </Grid>

      {(isAddingBook || editingBook) && (
        <BookForm
          book={editingBook}
          onSubmit={editingBook ? handleEditBook : handleAddBook}
          onCancel={() => {
            setIsAddingBook(false);
            setEditingBook(null);
          }}
        />
      )}

      <BookTable
        books={filteredBooks}
        onEdit={setEditingBook}
        onDelete={handleDeleteBook}
      />

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