import React from 'react';
import { Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

function BookRow({ books, branch }) {
  const navigate = useNavigate();

  const handleBookClick = (bookId) => {
    navigate(`/student/books/${bookId}`);
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h5" className="font-semibold text-primary">{branch}</Typography>
        <Button endIcon={<ArrowForwardIcon />} color="primary">
          View All
        </Button>
      </div>
      <div className="flex overflow-x-auto space-x-4 pb-6">
        {books.slice(0, 10).map((book) => (
          <div
            key={book.id}
            className="min-w-[150px] flex-shrink-0 transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => handleBookClick(book.id)}
          >
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-[200px] object-cover rounded-lg shadow-md"
            />
            <Typography variant="body2" className="mt-2 font-medium text-center truncate">
              {book.title}
            </Typography>
          </div>    
        ))}
      </div>
    </div>
  );
}

export default BookRow;