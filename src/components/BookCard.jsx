import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';

function BookCard({ book }) {
  return (
    <Card className="h-full flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardContent>
        <Typography variant="h6" className="text-primary mb-2 line-clamp-2">{book.title}</Typography>
        <Typography variant="body2" className="text-gray-600 mb-2">{book.author}</Typography>
        <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-4">
          {book.category}
        </div>
        <Typography variant="body2" className="text-gray-500 line-clamp-3">{book.description}</Typography>
      </CardContent>
      <CardActions className="justify-end p-2">
        <Button variant="outlined" color="primary" size="small">
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default BookCard;