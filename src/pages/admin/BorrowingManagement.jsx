import React, { useState, useEffect } from 'react';
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
  DialogTitle,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';

export default function BorrowingManagement() {
  const [requests, setRequests] = useState([]);
  const [activeBorrowings, setActiveBorrowings] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [action, setAction] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchPendingRequests();
    fetchActiveBorrowings();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/transactions/pending', { withCredentials: true });
      setRequests(response.data.data);
    } catch (error) {
      console.error('Error fetching pending requests:', error);
      setError('Failed to fetch pending requests');
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveBorrowings = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/transactions/active', { withCredentials: true });
      setActiveBorrowings(response.data.data);
    } catch (error) {
      console.error('Error fetching active borrowings:', error);
      setError('Failed to fetch active borrowings');
    }
  };

  const handleAction = (item, actionType) => {
    setSelectedItem(item);
    setAction(actionType);
    setOpenDialog(true);
  };

  const handleConfirmAction = async () => {
    try {
      if (action === 'approve' || action === 'reject') {
        await axios.patch(`http://localhost:8000/api/v1/transactions/${selectedItem._id}`, 
          { status: action === 'approve' ? 'approved' : 'rejected' },
          { withCredentials: true }
        );
        setRequests(requests.filter(req => req._id !== selectedItem._id));
        if (action === 'approve') {
          setActiveBorrowings([...activeBorrowings, { ...selectedItem, status: 'approved' }]);
        }
        setSnackbar({ open: true, message: `Request ${action}d successfully`, severity: 'success' });
      } else if (action === 'return') {
        await axios.patch(`http://localhost:8000/api/v1/transactions/${selectedItem._id}/return`, 
          {}, 
          { withCredentials: true }
        );
        setActiveBorrowings(activeBorrowings.filter(borrow => borrow._id !== selectedItem._id));
        setSnackbar({ open: true, message: 'Book returned successfully', severity: 'success' });
      } else if (action === 'issue') {
        await axios.patch(`http://localhost:8000/api/v1/transactions/${selectedItem._id}/issue`, 
          {}, 
          { withCredentials: true }
        );
        setActiveBorrowings(activeBorrowings.map(borrow => 
          borrow._id === selectedItem._id ? { ...borrow, status: 'borrowed' } : borrow
        ));
        setSnackbar({ open: true, message: 'Book issued successfully', severity: 'success' });
      }
    } catch (error) {
      console.error('Error updating transaction:', error);
      setSnackbar({ open: true, message: `Failed to ${action} request: ${error.response?.data?.message || error.message}`, severity: 'error' });
    } finally {
      setOpenDialog(false);
    }
  };

  // ... (rest of the component code remains the same)

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
              <TableRow key={request._id}>
                <TableCell>{request.userId.name}</TableCell>
                <TableCell>{request.bookId.title}</TableCell>
                <TableCell>{new Date(request.requestDate).toLocaleDateString()}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>
                  {request.status === 'pending' && (
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
            {activeBorrowings.map((borrowing) => (
              <TableRow key={borrowing._id}>
                <TableCell>{borrowing.userId.name}</TableCell>
                <TableCell>{borrowing.bookId.title}</TableCell>
                <TableCell>{borrowing.borrowDate ? new Date(borrowing.borrowDate).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell>{borrowing.dueDate ? new Date(borrowing.dueDate).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell>{borrowing.status}</TableCell>
                <TableCell>
                  {borrowing.status === 'approved' && (
                    <Button 
                      color="primary" 
                      onClick={() => handleAction(borrowing, 'issue')}
                    >
                      Issue Book
                    </Button>
                  )}
                  {borrowing.status === 'borrowed' && (
                    <Button 
                      color="secondary" 
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
            Are you sure you want to {action} the book "{selectedItem?.bookId.title}" {action === 'return' || action === 'issue' ? 'for' : 'requested by'} {selectedItem?.userId.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmAction} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

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

