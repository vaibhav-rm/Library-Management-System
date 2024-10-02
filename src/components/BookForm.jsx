import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Select, MenuItem, Paper, Typography, Snackbar, CircularProgress, InputLabel, FormControl, Box } from '@mui/material';
import { Alert } from '@mui/material';
import axios from 'axios';

export default function BookForm({ book, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    author: [],
    isbn: '',
    copies: '',
    borrowedCopies: 0,
    location: '',
    branch: '',
    description: '',
    publishedDate: '',
    pageCount: '',
    categories: [],
    averageRating: '',
    language: '',
    imageLinks: { smallThumbnail: '', thumbnail: '' },
  });
  const [authors, setAuthors] = useState([]);
  const [branches, setBranches] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchingGoogleData, setFetchingGoogleData] = useState(false);

  useEffect(() => {
    fetchAuthors();
    fetchBranches();
  }, []);

  useEffect(() => {
    if (book) {
      setFormData({
        ...book,
        author: Array.isArray(book.author) 
          ? book.author.map(a => typeof a === 'object' ? a._id : a)
          : book.author ? [book.author] : [],
        branch: typeof book.branch === 'object' ? book.branch._id : book.branch || '',
        categories: Array.isArray(book.categories) ? book.categories : book.categories ? [book.categories] : [],
        publishedDate: book.publishedDate || '',
        copies: book.copies ? book.copies.toString() : '',
        borrowedCopies: book.borrowedCopies ? book.borrowedCopies.toString() : '0',
        pageCount: book.pageCount ? book.pageCount.toString() : '',
        averageRating: book.averageRating ? book.averageRating.toString() : '',
        imageLinks: book.imageLinks || { smallThumbnail: '', thumbnail: '' },
      });
    }
  }, [book]);

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
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const submissionData = {
          ...formData,
          copies: Number(formData.copies),
          borrowedCopies: Number(formData.borrowedCopies),
          pageCount: formData.pageCount ? Number(formData.pageCount) : undefined,
          averageRating: formData.averageRating ? Number(formData.averageRating) : undefined,
          categories: formData.categories.filter(cat => cat.trim() !== ''),
        };
        console.log('Submitting form data:', submissionData);
        const response = await onSubmit(submissionData);
        setSnackbar({ open: true, message: book ? 'Book updated successfully' : 'Book added successfully', severity: 'success' });
        onCancel();
      } catch (error) {
        console.error('Error submitting form:', error);
        let errorMessage = 'An error occurred while submitting the form.';
        if (error.response) {
          console.error('Error response:', error.response);
          if (error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }
          if (error.response.status === 400) {
            setErrors(error.response.data.errors || {});
            errorMessage = 'Please correct the errors in the form.';
          }
        }
        setSnackbar({ open: true, message: errorMessage, severity: 'error' });
      } finally {
        setLoading(false);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['title', 'isbn', 'copies', 'branch', 'author'];
    
    for (const field of requiredFields) {
      if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    }

    if (formData.copies < 0) {
      newErrors.copies = 'Copies must be a non-negative number';
    }

    if (formData.borrowedCopies < 0) {
      newErrors.borrowedCopies = 'Borrowed copies must be a non-negative number';
    }

    if (formData.averageRating && (formData.averageRating < 0 || formData.averageRating > 5)) {
      newErrors.averageRating = 'Average rating must be between 0 and 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchGoogleBooksData = async () => {
    if (!formData.isbn) {
      setSnackbar({ open: true, message: 'Please enter an ISBN first', severity: 'warning' });
      return;
    }

    setFetchingGoogleData(true);
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${formData.isbn}`);
      if (response.data.items && response.data.items.length > 0) {
        const bookData = response.data.items[0].volumeInfo;
        setFormData(prevData => ({
          ...prevData,
          title: bookData.title || prevData.title,
          author: prevData.author,
          description: bookData.description || prevData.description,
          publishedDate: bookData.publishedDate || prevData.publishedDate,
          pageCount: bookData.pageCount ? bookData.pageCount.toString() : prevData.pageCount,
          categories: bookData.categories || prevData.categories,
          averageRating: bookData.averageRating ? bookData.averageRating.toString() : prevData.averageRating,
          language: bookData.language || prevData.language,
          imageLinks: bookData.imageLinks || prevData.imageLinks,
        }));
        setSnackbar({ open: true, message: 'Book information fetched successfully', severity: 'success' });
      } else {
        setSnackbar({ open: true, message: 'No book found with this ISBN', severity: 'warning' });
      }
    } catch (error) {
      console.error('Error fetching Google Books data:', error);
      setSnackbar({ open: true, message: 'Error fetching book information', severity: 'error' });
    } finally {
      setFetchingGoogleData(false);
    }
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
              label="ISBN"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              required
              error={!!errors.isbn}
              helperText={errors.isbn}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={fetchGoogleBooksData}
                disabled={fetchingGoogleData}
                sx={{ mt: 2 }}
              >
                {fetchingGoogleData ? <CircularProgress size={24} /> : 'Fetch Google Books Data'}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              error={!!errors.title}
              helperText={errors.title}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.author} margin="normal">
              <InputLabel id="author-label">Authors</InputLabel>
              <Select
                labelId="author-label"
                multiple
                value={formData.author}
                onChange={(e) => setFormData(prevData => ({ ...prevData, author: e.target.value }))}
                renderValue={(selected) => selected.map(id => authors.find(a => a._id === id)?.name || id).join(', ')}
              >
                {authors.map((author) => (
                  <MenuItem key={author._id} value={author._id}>
                    {author.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.author && <Typography color="error" variant="caption">{errors.author}</Typography>}
            </FormControl>
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
              error={!!errors.copies}
              helperText={errors.copies}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Borrowed Copies"
              name="borrowedCopies"
              type="number"
              value={formData.borrowedCopies}
              onChange={handleChange}
              error={!!errors.borrowedCopies}
              helperText={errors.borrowedCopies}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              error={!!errors.location}
              helperText={errors.location}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.branch} margin="normal">
              <InputLabel id="branch-label">Branch</InputLabel>
              <Select
                labelId="branch-label"
                value={formData.branch}
                onChange={(e) => setFormData(prevData => ({ ...prevData, branch: e.target.value }))}
                displayEmpty
              >
                <MenuItem value="" disabled>Select a branch</MenuItem>
                {branches.map((branch) => (
                  <MenuItem key={branch._id} value={branch._id}>
                    {branch.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.branch && <Typography color="error" variant="caption">{errors.branch}</Typography>}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Published Date"
              name="publishedDate"
              value={formData.publishedDate}
              onChange={handleChange}
              error={!!errors.publishedDate}
              helperText={errors.publishedDate}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Page Count"
              name="pageCount"
              type="number"
              value={formData.pageCount}
              onChange={handleChange}
              error={!!errors.pageCount}
              helperText={errors.pageCount}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Categories (comma-separated)"
              name="categories"
              value={formData.categories.join(', ')}
              onChange={(e) => setFormData(prevData => ({ ...prevData, categories: e.target.value.split(',').map(cat => cat.trim()) }))}
              error={!!errors.categories}
              helperText={errors.categories}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Average Rating"
              name="averageRating"
              type="number"
              inputProps={{ min: 0, max: 5, step: 0.1 }}
              value={formData.averageRating}
              onChange={handleChange}
              error={!!errors.averageRating}
              helperText={errors.averageRating}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              error={!!errors.language}
              helperText={errors.language}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" sx={{ mr: 1 }} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : (book ? 'Update Book' : 'Add Book')}
            </Button>
            <Button variant="outlined" onClick={onCancel} disabled={loading}>
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