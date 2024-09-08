import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Grid, Paper, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// In a real application, you would fetch this data from an API
import { dummyBooks } from '../../components/dummyBooks';

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the book with the matching id
  const book = dummyBooks.find(book => book.id === parseInt(id));

  if (!book) {
    return <Typography>Book not found</Typography>;
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
              src={book.coverImage}
              alt={book.title}
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" className="mb-4 font-bold text-primary">{book.title}</Typography>
            <Typography variant="h6" className="mb-2 text-gray-600">by {book.author}</Typography>
            <Chip label={book.category} className="mb-4" />
            <Typography variant="body1" className="mb-4">{book.description}</Typography>
            <Typography variant="body2" className="mb-2">ISBN: {book.isbn}</Typography>
            <Typography variant="body2" className="mb-2">Publication Year: {book.publicationYear}</Typography>
            <Typography variant="body2" className="mb-4">Available Quantity: {book.quantity}</Typography>
            <Button variant="contained" color="primary">
              Borrow Book
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}