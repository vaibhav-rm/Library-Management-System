import React from 'react';
import { Typography, List, ListItem, ListItemText, Avatar, Paper } from '@mui/material';

const borrowedBooks = [
  { id: 1, title: 'Borrowed Book 1', dueDate: '2023-08-20' },
  { id: 2, title: 'Borrowed Book 2', dueDate: '2023-09-15' },
];

function UserProfile() {
  return (
    <div className="p-4">
      <Paper className="p-4 mb-4">
        <div className="flex items-center">
          <Avatar alt="User Name" src="/static/images/avatar/1.jpg" className="mr-4" />
          <Typography variant="h5">User Name</Typography>
        </div>
      </Paper>

      <Paper className="p-4">
        <Typography variant="h6" className="mb-2">Borrowed Books</Typography>
        <List>
          {borrowedBooks.map((book) => (
            <ListItem key={book.id}>
              <ListItemText primary={book.title} secondary={`Due: ${book.dueDate}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
}

export default UserProfile;
