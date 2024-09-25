import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, MenuItem, Paper, Typography, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import axios from 'axios';

export default function BookForm({ book, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(book || {
    title: '',
    author: [],
    isbn: '',
    publicationYear: '',
    copies: '',
    borrowedCopies: 0,
    location: '',
    branch: '',
  });
  const [authors, setAuthors] = useState([]);
  const [branches, setBranches] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchAuthors();
    fetchBranches();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/authors');
      setAuthors(response.data.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
      setSnackbar({ open: true, message: 'Error fetching authors', severity: 'error' });
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/branches');
      setBranches(response.data.data);
    } catch (error) {
      console.error('Error fetching branches:', error);
      setSnackbar({ open: true, message: 'Error fetching branches', severity: 'error' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ ...formData, borrowedCopies: 0 });
    }
  };

  const validateForm = () => {
    const requiredFields = ['title', 'author', 'isbn', 'publicationYear', 'copies', 'branch'];
    for (const field of requiredFields) {
      if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
        setSnackbar({ open: true, message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`, severity: 'error' });
        return false;
      }
    }
    return true;
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {book ? 'Edit Book' : 'Add New Book'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Authors"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              variant="outlined"
              SelectProps={{
                multiple: true,
              }}
            >
              {authors.map((author) => (
                <MenuItem key={author._id} value={author._id}>
                  {author.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="ISBN"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Publication Year"
              name="publicationYear"
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              value={formData.publicationYear}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid> 
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Copies"
              name="copies"
              type="number"
              value={formData.copies}
              InputProps={{ inputProps: { min: 1 } }}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
              variant="outlined"
            >
              {branches.map((branch) => (
                <MenuItem key={branch._id} value={branch._id}>
                  {branch.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" sx={{ mr: 1 }}>
              {book ? 'Update Book' : 'Add Book'}
            </Button>
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}