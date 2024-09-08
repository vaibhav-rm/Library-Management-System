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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

// Mock data for borrowing requests and active borrowings
const initialRequests = [
  { id: 1, studentName: 'John Doe', bookTitle: 'To Kill a Mockingbird', requestDate: '2023-06-10', status: 'Pending' },
  { id: 2, studentName: 'Jane Smith', bookTitle: '1984', requestDate: '2023-06-11', status: 'Pending' },
  // Add more requests as needed
];

const initialBorrowings = [
  { id: 1, studentName: 'Alice Johnson', bookTitle: 'Pride and Prejudice', borrowDate: '2023-06-01', dueDate: '2023-06-15', status: 'Borrowed' },
  { id: 2, studentName: 'Bob Williams', bookTitle: 'The Great Gatsby', borrowDate: '2023-06-05', dueDate: '2023-06-19', status: 'Borrowed' },
  // Add more borrowings as needed
];

export default function BorrowingManagement() {
  const [requests, setRequests] = useState(initialRequests);
  const [borrowings, setBorrowings] = useState(initialBorrowings);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [action, setAction] = useState('');

  const handleAction = (item, actionType) => {
    setSelectedItem(item);
    setAction(actionType);
    setOpenDialog(true);
  };

  const handleConfirmAction = () => {
    if (action === 'approve' || action === 'reject') {
      setRequests(requests.map(req => 
        req.id === selectedItem.id 
          ? { ...req, status: action === 'approve' ? 'Approved' : 'Rejected' } 
          : req
      ));
    } else if (action === 'return') {
      setBorrowings(borrowings.map(borrow => 
        borrow.id === selectedItem.id 
          ? { ...borrow, status: 'Returned' } 
          : borrow
      ));
    }
    setOpenDialog(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Borrowing Management
      </Typography>
      <Typography variant="h6" gutterBottom>
        Pending Requests
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Book Title</TableCell>
              <TableCell>Request Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.studentName}</TableCell>
                <TableCell>{request.bookTitle}</TableCell>
                <TableCell>{request.requestDate}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>
                  {request.status === 'Pending' && (
                    <>
                      <Button 
                        color="primary" 
                        onClick={() => handleAction(request, 'approve')}
                      >
                        Approve
                      </Button>
                      <Button 
                        color="secondary" 
                        onClick={() => handleAction(request, 'reject')}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Active Borrowings
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Book Title</TableCell>
              <TableCell>Borrow Date</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {borrowings.map((borrowing) => (
              <TableRow key={borrowing.id}>
                <TableCell>{borrowing.studentName}</TableCell>
                <TableCell>{borrowing.bookTitle}</TableCell>
                <TableCell>{borrowing.borrowDate}</TableCell>
                <TableCell>{borrowing.dueDate}</TableCell>
                <TableCell>{borrowing.status}</TableCell>
                <TableCell>
                  {borrowing.status === 'Borrowed' && (
                    <Button 
                      color="primary" 
                      onClick={() => handleAction(borrowing, 'return')}
                    >
                      Return
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {action} the {action === 'return' ? 'book' : 'borrowing request'} "{selectedItem?.bookTitle}" {action === 'return' ? 'from' : 'by'} {selectedItem?.studentName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmAction} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}