import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Box, InputBase, alpha } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import the useAuth hook

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function AdminNavbar({ onMenuClick, isSidebarOpen }) {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Use the logout function from AuthContext

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
            <Search>  
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
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