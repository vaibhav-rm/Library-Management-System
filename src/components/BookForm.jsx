import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, MenuItem, Paper, Typography } from '@mui/material';
import axios from 'axios';

export default function BookForm({ book, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(book || {
    title: '',
    author: '',
    isbn: '',
    branch: '',
    publicationYear: '',
    quantity: '',
  });
  const [authors, setAuthors] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    fetchAuthors();
    fetchBranches();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/authors');
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/branches');
      setBranches(response.data);
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
              label="Author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              variant="outlined"
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
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Publication Year"
              name="publicationYear"
              type="number"
              value={formData.publicationYear}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              required
              variant="outlined"
            />
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
    </Paper>
  );
}