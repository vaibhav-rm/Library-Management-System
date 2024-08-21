import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';

function BookCard({ book }) {
  return (
    <Card className="h-full transform transition-transform hover:scale-105 hover:shadow-lg">
      <CardContent>
        <Typography variant="h5" className="text-gray-800">{book.title}</Typography>
        <Typography variant="subtitle1" className="text-gray-600">{book.author}</Typography>
        <Typography variant="subtitle2" className="text-gray-500">{book.category}</Typography>
      </CardContent>
      <CardActions className="justify-end p-2">
        <Button variant="contained" color="primary" size="small">
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default BookCard;
