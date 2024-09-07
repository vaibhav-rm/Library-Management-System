import React, { useState } from 'react';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';

export default function BorrowingHistory() {
  const [borrowings] = useState([
    { id: 1, bookTitle: 'To Kill a Mockingbird', borrowDate: '2023-05-01', returnDate: '2023-05-15', status: 'Returned' },
    { id: 2, bookTitle: '1984', borrowDate: '2023-05-10', returnDate: '2023-05-24', status: 'Returned' },
    { id: 3, bookTitle: 'The Great Gatsby', borrowDate: '2023-06-01', returnDate: null, status: 'Borrowed' },
    { id: 4, bookTitle: 'Pride and Prejudice', borrowDate: '2023-06-05', returnDate: null, status: 'Overdue' },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Returned':
        return 'success';
      case 'Borrowed':
        return 'primary';
      case 'Overdue':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Borrowing History
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="borrowing history table">
          <TableHead>
            <TableRow>
              <TableCell>Book Title</TableCell>
              <TableCell>Borrow Date</TableCell>
              <TableCell>Return Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {borrowings.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.bookTitle}
                </TableCell>
                <TableCell>{row.borrowDate}</TableCell>
                <TableCell>{row.returnDate || 'Not returned yet'}</TableCell>
                <TableCell>
                  <Chip label={row.status} color={getStatusColor(row.status)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}