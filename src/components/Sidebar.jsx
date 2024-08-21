import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

function Sidebar({ isOpen, onClose }) {
  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <List className="w-64 pt-4">
        <ListItem button component={Link} to="/">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/books">
          <ListItemIcon><BookIcon /></ListItemIcon>
          <ListItemText primary="Books" />
        </ListItem>
        <ListItem button component={Link} to="/users">
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button component={Link} to="/admin">
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Admin" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
