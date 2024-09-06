import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, Tab, Tabs } from '@mui/material';
import { School, Work } from '@mui/icons-material';

export default function Login() {
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    studentId: '',
    facultyKgid: '',
    password: '',
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the login logic
    console.log('Login submitted:', formData);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Login to Library Management System
        </Typography>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="user type tabs" sx={{ mb: 3 }}>
          <Tab icon={<School />} label="Student" />
          <Tab icon={<Work />} label="Faculty" />
        </Tabs>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {tabValue === 0 ? (
            <TextField
              margin="normal"
              required
              fullWidth
              id="studentId"
              label="Student ID"
              name="studentId"
              autoComplete="studentId"
              autoFocus
              value={formData.studentId}
              onChange={handleInputChange}
            />
          ) : (
            <TextField
              margin="normal"
              required
              fullWidth
              id="facultyKgid"
              label="Faculty KGID"
              name="facultyKgid"
              autoComplete="facultyKgid"
              autoFocus
              value={formData.facultyKgid}
              onChange={handleInputChange}
            />
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2">
              Don't have an account?{' '}
              <Button color="primary" href="/register">
                Register here
              </Button>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}