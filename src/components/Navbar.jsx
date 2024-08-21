import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Avatar, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';

function Navbar({ onMenuClick }) {
  return (
    <AppBar position="static" color="primary">
      <Toolbar className="flex justify-between">
        <div className="flex items-center">
          <IconButton edge="start" color="inherit" onClick={onMenuClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="ml-2">Library Management System</Typography>
        </div>
        <div className="flex items-center">
          <div className="relative bg-gray-200 rounded-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="text-gray-500" />
            </div>
            <InputBase
              placeholder="Search books…"
              className="pl-10 pr-4 py-1 w-full rounded-full text-sm text-gray-700 focus:outline-none"
            />
          </div>
          <IconButton color="inherit" className="ml-4">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" className="ml-4">
            <Avatar alt="User Name" src="/static/images/avatar/1.jpg" />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
