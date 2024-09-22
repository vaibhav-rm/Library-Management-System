import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, TextField, InputAdornment, CircularProgress } from '@mui/material';
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

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/books');
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
      setLoading(false);
    }
  };

  const handleAddBook = async (newBook) => {
    try {
      const response = await axios.post('http://localhost:8000/api/books', newBook);
      setBooks([...books, response.data]);
      setIsAddingBook(false);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleEditBook = async (updatedBook) => {
    try {
      await axios.put(`/api/books/${updatedBook._id}`, updatedBook);
      setBooks(books.map((book) => (book._id === updatedBook._id ? updatedBook : book)));
      setEditingBook(null);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/books/${id}`);
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    </Container>
  );
}