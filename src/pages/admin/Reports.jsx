import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Dummy data for demonstration
const popularBooksData = [
  { title: 'To Kill a Mockingbird', borrowCount: 25 },
  { title: 'The Great Gatsby', borrowCount: 20 },
  { title: '1984', borrowCount: 18 },
  { title: 'Pride and Prejudice', borrowCount: 15 },
  { title: 'The Catcher in the Rye', borrowCount: 12 },
];

const overdueBooksData = [
  { title: 'The Hobbit', userName: 'John Doe', dueDate: '2023-05-30', daysOverdue: 7 },
  { title: 'Brave New World', userName: 'Jane Smith', dueDate: '2023-06-01', daysOverdue: 5 },
  { title: 'The Odyssey', userName: 'Bob Johnson', dueDate: '2023-06-02', daysOverdue: 4 },
];

export default function Reports() {
  const [reportType, setReportType] = useState('popularBooks');

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
  };

  const renderReport = () => {
    switch (reportType) {
      case 'popularBooks':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={popularBooksData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="borrowCount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'overdueBooks':
        return (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="overdue books table">
              <TableHead>
                <TableRow>
                  <TableCell>Book Title</TableCell>
                  <TableCell>User Name</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Days Overdue</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {overdueBooksData.map((book, index) => (
                  <TableRow key={index}>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.userName}</TableCell>
                    <TableCell>{book.dueDate}</TableCell>
                    <TableCell>{book.daysOverdue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Select
            value={reportType}
            onChange={handleReportTypeChange}
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="popularBooks">Popular Books</MenuItem>
            <MenuItem value="overdueBooks">Overdue Books</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={6} container justifyContent="flex-end">
          <Button variant="contained" color="primary">
            Generate Report
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            {renderReport()}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}