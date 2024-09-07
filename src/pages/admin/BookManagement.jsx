import React, { useState } from 'react';
import { Container, Typography, Button, Grid, TextField, InputAdornment } from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import BookForm from '../../components/BookForm';
import BookTable from '../../components/BookTable';

// Dummy data for demonstration
const initialBooks = [
  { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780446310789', category: 'Fiction', publicationYear: 1960, quantity: 5 },
  { id: 2, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', category: 'Fiction', publicationYear: 1925, quantity: 3 },
  // Add more dummy books as needed
];

export default function BookManagement() {
  const [books, setBooks] = useState(initialBooks);
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddBook = (newBook) => {
    setBooks([...books, { ...newBook, id: books.length + 1 }]);
    setIsAddingBook(false);
  };

  const handleEditBook = (updatedBook) => {
    setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
    setEditingBook(null);
  };

  const handleDeleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm)
  );

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