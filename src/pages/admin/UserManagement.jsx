import React, { useState } from 'react';
import { Container, Typography, Button, Grid, TextField, InputAdornment } from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import UserTable from '../../components/UserTable';

// Dummy data for demonstration
const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', userType: 'Student', studentId: 'S12345', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', userType: 'Faculty', facultyKgid: 'F67890', status: 'Active' },
  // Add more dummy users as needed
];

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEditUser = (user) => {
    // Implement edit user logic
    console.log('Edit user:', user);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.studentId && user.studentId.includes(searchTerm)) ||
      (user.facultyKgid && user.facultyKgid.includes(searchTerm))
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} container justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => console.log('Add new user')}
          >
            Add New User
          </Button>
        </Grid>
      </Grid>

      <UserTable
        users={filteredUsers}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />
    </Container>
  );
}