import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Box, InputBase, alpha } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function StudentNavbar({ onMenuClick, isSidebarOpen }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function
      navigate('/login'); // Redirect to login page after successful logout
    } catch (error) {
      console.error('Logout failed:', error);
      // Optionally, you can show an error message to the user here
    }
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label={isSidebarOpen ? "close drawer" : "open drawer"}
          edge="start"
          onClick={onMenuClick} // Toggle sidebar on button click
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ display: { xs: 'none', sm: 'block' }, color: 'white' }}>
          Student Library Portal
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default StudentNavbar;
