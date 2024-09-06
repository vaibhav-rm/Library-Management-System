import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Avatar, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';

function Navbar({ onMenuClick }) {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar className="flex justify-between items-center">
        <div className="flex items-center">
          <IconButton edge="start" color="inherit" onClick={onMenuClick} className="mr-2">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="text-primary font-semibold">
            Library Management System
          </Typography>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="text-gray-400" />
            </div>
            <InputBase
              placeholder="Search books…"
              className="pl-10 pr-4 py-2 w-full md:w-[300px] bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
            />
          </div>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Avatar alt="User Name" src="/static/images/avatar/1.jpg" className="cursor-pointer" />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;