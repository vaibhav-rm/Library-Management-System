// BookForm.jsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, MenuItem, Paper, Typography, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import axios from 'axios';

export default function BookForm({ book, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(book || {
    title: '',
    author: [],
    isbn: '',
    copies: '',
    location: '',
    branch: '',
  });
  const [authors, setAuthors] = useState([]);
  const [branches, setBranches] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [errors, setErrors] = useState({});

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
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await onSubmit(formData);
        if (response.googleBooksData === null && !book) {
          setShowAdditionalFields(true);
          setSnackbar({ open: true, message: 'No Google Books data found. Please fill in additional information.', severity: 'warning' });
        } else {
          setSnackbar({ open: true, message: book ? 'Book updated successfully' : 'Book added successfully', severity: 'success' });
          onCancel();
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        if (error.response && error.response.data && error.response.data.message) {
          if (Array.isArray(error.response.data.message)) {
            const errorMessages = error.response.data.message.join(', ');
            setSnackbar({ open: true, message: `Validation errors: ${errorMessages}`, severity: 'error' });
          } else {
            setSnackbar({ open: true, message: `Error: ${error.response.data.message}`, severity: 'error' });
          }
        } else {
          setSnackbar({ open: true, message: `Error: ${error.message}`, severity: 'error' });
        }
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['title', 'author', 'isbn', 'copies', 'branch'];
    for (const field of requiredFields) {
      if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
              error={!!errors.title}
              helperText={errors.title}
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
              error={!!errors.author}
              helperText={errors.author}
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
              error={!!errors.isbn}
              helperText={errors.isbn}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Copies"
              name="copies"
              type="number"
              value={formData.copies}
              onChange={handleChange}
              required
              variant="outlined"
              error={!!errors.copies}
              helperText={errors.copies}
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
              error={!!errors.branch}
              helperText={errors.branch}
            >
              {branches.map((branch) => (
                <MenuItem key={branch._id} value={branch._id}>
                  {branch.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {(showAdditionalFields || book) && (
            <>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Published Date"
                  name="publishedDate"
                  value={formData.publishedDate || ''}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Page Count"
                  name="pageCount"
                  type="number"
                  value={formData.pageCount || ''}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Categories (comma-separated)"
                  name="categories"
                  value={formData.categories ? formData.categories.join(', ') : ''}
                  onChange={(e) => setFormData({ ...formData, categories: e.target.value.split(',').map(cat => cat.trim()) })}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Language"
                  name="language"
                  value={formData.language || ''}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
            </>
          )}
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