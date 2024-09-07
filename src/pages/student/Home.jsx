import React from 'react';
import { Typography, Container, Paper } from '@mui/material';
import BookList from '../../components/BookList';

export default function Home() {
  return (
    <Container maxWidth="xl" className="py-8">
      <Paper elevation={3} className="p-8 bg-white rounded-lg">
        <Typography variant="h3" component="h1" className="mb-8 text-center font-bold text-primary">
          Welcome to the Library Management System
        </Typography>
        <Typography variant="h5" className="mb-6 text-center text-gray-600">
          Explore our vast collection of books across various categories
        </Typography>
        <BookList />
      </Paper>
    </Container>
  );
}