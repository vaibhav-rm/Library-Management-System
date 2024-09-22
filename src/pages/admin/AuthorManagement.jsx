import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { Alert } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export default function AuthorManagement() {
  const [author, setAuthor] = useState({ name: '', bio: '' });
  const [authors, setAuthors] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [editingAuthor, setEditingAuthor] = useState(null);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/authors');
      if (response.ok) {
        const data = await response.json();
        setAuthors(data.data);
      } else {
        throw new Error('Failed to fetch authors');
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to fetch authors. Please try again.', severity: 'error' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor(prevAuthor => ({ ...prevAuthor, [name]: value }));
  };
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingAuthor 
        ? `http://localhost:8000/api/v1/authors/${editingAuthor._id}`
        : 'http://localhost:8000/api/v1/authors';
      const method = editingAuthor ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(author),
      });

      if (response.ok) {
        const result = await response.json();
        setSnackbar({ open: true, message: result.message, severity: 'success' });
        setAuthor({ name: '', bio: '' });
        setEditingAuthor(null);
        fetchAuthors();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add/update author');
      }
    } catch (error) {
      setSnackbar({ open: true, message: error.message, severity: 'error' });
    }
  };

  const handleEdit = (authorToEdit) => {
    setAuthor({ name: authorToEdit.name, bio: authorToEdit.bio || '' });
    setEditingAuthor(authorToEdit);
  };

  const handleDelete = async (authorId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/authors/${authorId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSnackbar({ open: true, message: 'Author deleted successfully', severity: 'success' });
        fetchAuthors();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete author');
      }
    } catch (error) {
      setSnackbar({ open: true, message: error.message, severity: 'error' });
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {editingAuthor ? 'Edit Author' : 'Add New Author'}
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
            {editingAuthor ? 'Update Author' : 'Add Author'}
          </Button>
          {editingAuthor && (
            <Button onClick={() => {
              setAuthor({ name: '', bio: '' });
              setEditingAuthor(null);
            }} variant="outlined" sx={{ mt: 2, ml: 2 }}>
              Cancel Edit
            </Button>
          )}
        </form>
      </Paper>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Existing Authors
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {authors.map((author) => (
                <TableRow key={author._id}>
                  <TableCell>{author.name}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(author)} size="small">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(author._id)} size="small">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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