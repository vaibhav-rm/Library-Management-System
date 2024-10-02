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
  const [error, setError] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = tabValue === 0 
        ? { username: formData.studentId, password: formData.password }
        : { email: formData.facultyKgid, password: formData.password };

      const response = await fetch('http:/localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
        credentials: 'include', // Include cookies for authentication
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      // Optionally, redirect or update the state with user data here
    } catch (err) {
      setError(err.message);
      console.error('Login error:', err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Login to Library Management System
        </Typography>
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
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
