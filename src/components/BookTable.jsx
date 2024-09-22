import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export default function BookTable({ books, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>ISBN</TableCell>
            <TableCell>Branch</TableCell>
            <TableCell>Publication Year</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book._id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author.name}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.branch.name}</TableCell>
              <TableCell>{book.publicationYear}</TableCell>
              <TableCell>{book.quantity}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(book)} size="small">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => onDelete(book._id)} size="small">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}