import React from 'react';
import { Typography, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

// Dummy data for demonstration
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Faculty', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Student', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Student', status: 'Active' },
];

export default function Users() {
  return (
    <Container maxWidth="xl" className="py-8">
      <Typography variant="h4" component="h1" className="mb-6 font-bold text-primary">
        Manage Users
      </Typography>
      <Paper elevation={3} className="p-8 bg-white rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <TextField
            placeholder="Search users..."
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            Add New User
          </Button>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={user.status === 'Active' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" size="small" className="mr-2">
                      Edit
                    </Button>
                    <Button variant="outlined" color="secondary" size="small">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}