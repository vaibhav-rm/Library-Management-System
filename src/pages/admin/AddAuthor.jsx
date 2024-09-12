import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

export default function AddAuthor() {
  const [author, setAuthor] = useState({ name: '', bio: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor(prevAuthor => ({ ...prevAuthor, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/authors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(author),
      });
      if (response.ok) {
        setSnackbar({ open: true, message: 'Author added successfully!', severity: 'success' });
        setAuthor({ name: '', bio: '' });
      } else {
        throw new Error('Failed to add author');
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to add author. Please try again.', severity: 'error' });
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Author
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Author Name"
            name="name"
            value={author.name}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Biography"
            name="bio"
            value={author.bio}
            onChange={handleChange}
            multiline
            rows={4}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Add Author
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