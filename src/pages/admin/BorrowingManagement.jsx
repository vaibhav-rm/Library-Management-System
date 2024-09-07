import React, { useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search } from '@mui/icons-material';

// Dummy data for demonstration
const initialBorrowings = [
  { id: 1, bookTitle: 'To Kill a Mockingbird', userName: 'John Doe', borrowDate: '2023-06-01', dueDate: '2023-06-15', status: 'Borrowed' },
  { id: 2, bookTitle: 'The Great Gatsby', userName: 'Jane Smith', borrowDate: '2023-05-25', dueDate: '2023-06-08', status: 'Overdue' },
  // Add more dummy borrowings as needed
];

export default function BorrowingManagement() {
  const [borrowings, setBorrowings] = useState(initialBorrowings);
  const [searchTerm, setSearchTerm] = useState('');

  const handleReturn = (id) => {
    setBorrowings(
      borrowings.map((borrowing) =>
        borrowing.id === id ? { ...borrowing, status: 'Returned' } : borrowing
      )
    );
  };

  const filteredBorrowings = borrowings.filter(
    (borrowing) =>
      borrowing.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      borrowing.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Borrowing Management
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search borrowings..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="borrowing table">
          <TableHead>
            <TableRow>
              <TableCell>Book Title</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Borrow Date</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBorrowings.map((borrowing) => (
              <TableRow key={borrowing.id}>
                <TableCell>{borrowing.bookTitle}</TableCell>
                <TableCell>{borrowing.userName}</TableCell>
                <TableCell>{borrowing.borrowDate}</TableCell>
                <TableCell>{borrowing.dueDate}</TableCell>
                <TableCell>{borrowing.status}</TableCell>
                <TableCell>
                  {borrowing.status === 'Borrowed' || borrowing.status === 'Overdue' ? (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleReturn(borrowing.id)}
                    >
                      Return
                    </Button>
                  ) : (
                    '-'
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}