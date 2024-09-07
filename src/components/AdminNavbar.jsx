import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Box, InputBase, alpha } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function AdminNavbar({ onMenuClick, isSidebarOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout logic here
    navigate('/login');
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label={isSidebarOpen ? "close drawer" : "open drawer"}
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ display: { xs: 'none', sm: 'block' }, color: 'white' }}>
          Library Admin
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{
            position: 'relative',
            borderRadius: 1,
            backgroundColor: alpha('#fff', 0.15),
            '&:hover': { backgroundColor: alpha('#fff', 0.25) },
            marginRight: 2,
            marginLeft: 0,
            width: '100%',
            [theme => theme.breakpoints.up('sm')]: { marginLeft: 3, width: 'auto' },
          }}>
            <Box sx={{ padding: theme => theme.spacing(0, 2), height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SearchIcon />
            </Box>
            <InputBase
              placeholder="Search…"
              sx={{
                color: 'inherit',
                '& .MuiInputBase-input': {
                  padding: theme => theme.spacing(1, 1, 1, 0),
                  paddingLeft: `calc(1em + ${theme => theme.spacing(4)})`,
                  transition: theme => theme.transitions.create('width'),
                  width: '100%',
                  [theme => theme.breakpoints.up('md')]: { width: '20ch' },
                },
              }}
            />
          </Box>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default AdminNavbar;