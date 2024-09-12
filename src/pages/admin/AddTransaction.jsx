import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Paper, Snackbar, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { Alert } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

export default function AddTransaction() {
  const [transaction, setTransaction] = useState({
    status: '',
    borrowDate: null,
    dueDate: null,
    userId: '',
    bookId: '',
  });
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    // Fetch users and books from the API
    const fetchData = async () => {
      try {
        const [usersResponse, booksResponse] = await Promise.all([
          fetch('/api/users'),
          fetch('/api/books')
        ]);
        const usersData = await usersResponse.json();
        const booksData = await booksResponse.json();
        setUsers(usersData);
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction(prevTransaction => ({ ...prevTransaction, [name]: value }));
  };

  const handleDateChange = (name) => (date) => {
    setTransaction(prevTransaction => ({ ...prevTransaction, [name]: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction),
      });
      if (response.ok) {
        setSnackbar({ open: true, message: 'Transaction added successfully!', severity: 'success' });
        setTransaction({ status: '', borrowDate: null, dueDate: null, userId: '', bookId: '' });
      } else {
        throw new Error('Failed to add transaction');
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to add transaction. Please try again.', severity: 'error' });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Add New Transaction
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                name="status"
                value={transaction.status}
                onChange={handleChange}
                required
              >
                <MenuItem value="borrowed">Borrowed</MenuItem>
                <MenuItem value="returned">Returned</MenuItem>
                <MenuItem value="overdue">Overdue</MenuItem>
              </Select>
            </FormControl>
            <DatePicker
              label="Borrow Date"
              value={transaction.borrowDate}
              onChange={handleDateChange('borrowDate')}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
            />
            <DatePicker
              label="Due Date"
              value={transaction.dueDate}
              onChange={handleDateChange('dueDate')}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="user-label">User</InputLabel>
              <Select
                labelId="user-label"
                name="userId"
                value={transaction.userId}
                onChange={handleChange}
                required
              >
                {users.map(user => (
                  <MenuItem key={user._id} value={user._id}>{user.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="book-label">Book</InputLabel>
              <Select
                labelId="book-label"
                name="bookId"
                value={transaction.bookId}
                onChange={handleChange}
                required
              >
                {books.map(book => (
                  <MenuItem key={book._id} value={book._id}>{book.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Add Transaction
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
    </LocalizationProvider>
  );
}