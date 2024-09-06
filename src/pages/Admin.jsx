import React from 'react';
import { Container, Grid, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Book, People, BookmarkAdded, TrendingUp } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Dummy data for the chart
const borrowingData = [
  { name: 'Jan', Books: 400 },
  { name: 'Feb', Books: 300 },
  { name: 'Mar', Books: 500 },
  { name: 'Apr', Books: 280 },
  { name: 'May', Books: 390 },
  { name: 'Jun', Books: 430 },
];

// Dummy data for recent activities
const recentActivities = [
  { id: 1, user: 'John Doe', action: 'Borrowed', book: 'The Great Gatsby', date: '2023-06-15' },
  { id: 2, user: 'Jane Smith', action: 'Returned', book: 'To Kill a Mockingbird', date: '2023-06-14' },
  { id: 3, user: 'Bob Johnson', action: 'Borrowed', book: '1984', date: '2023-06-13' },
];

export default function Admin() {
  return (
    <Container maxWidth="xl" className="py-8">
      <Typography variant="h4" component="h1" className="mb-6 font-bold text-primary">
        Admin Dashboard
      </Typography>
      <Grid container spacing={4}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper className="p-4 bg-blue-100 flex items-center justify-between">
            <div>
              <Typography variant="h6" className="text-blue-800">Total Books</Typography>
              <Typography variant="h4" className="text-blue-900 font-bold">1,200</Typography>
            </div>
            <Book className="text-blue-500 text-4xl" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className="p-4 bg-green-100 flex items-center justify-between">
            <div>
              <Typography variant="h6" className="text-green-800">Total Users</Typography>
              <Typography variant="h4" className="text-green-900 font-bold">350</Typography>
            </div>
            <People className="text-green-500 text-4xl" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className="p-4 bg-yellow-100 flex items-center justify-between">
            <div>
              <Typography variant="h6" className="text-yellow-800">Books Borrowed</Typography>
              <Typography variant="h4" className="text-yellow-900 font-bold">200</Typography>
            </div>
            <BookmarkAdded className="text-yellow-500 text-4xl" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className="p-4 bg-purple-100 flex items-center justify-between">
            <div>
              <Typography variant="h6" className="text-purple-800">Late Returns</Typography>
              <Typography variant="h4" className="text-purple-900 font-bold">15</Typography>
            </div>
            <TrendingUp className="text-purple-500 text-4xl" />
          </Paper>
        </Grid>

        {/* Borrowing Trends Chart */}
        <Grid item xs={12} md={8}>
          <Paper className="p-4">
            <Typography variant="h6" className="mb-4 font-semibold">Borrowing Trends</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={borrowingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Books" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={4}>
          <Paper className="p-4">
            <Typography variant="h6" className="mb-4 font-semibold">Recent Activities</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Book</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentActivities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>{activity.user}</TableCell>
                      <TableCell>{activity.action}</TableCell>
                      <TableCell>{activity.book}</TableCell>
                      <TableCell>{activity.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button variant="text" color="primary" className="mt-4">
              View All Activities
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}