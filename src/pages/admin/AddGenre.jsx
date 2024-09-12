import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

export default function AddGenre() {
  const [genre, setGenre] = useState({ name: '', description: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGenre(prevGenre => ({ ...prevGenre, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/genres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(genre),
      });
      if (response.ok) {
        setSnackbar({ open: true, message: 'Genre added successfully!', severity: 'success' });
        setGenre({ name: '', description: '' });
      } else {
        throw new Error('Failed to add genre');
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to add genre. Please try again.', severity: 'error' });
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Genre
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Genre Name"
            name="name"
            value={genre.name}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={genre.description}
            onChange={handleChange}
            multiline
            rows={4}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Add Genre
          </Button>
        </form>
      </Paper>
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