import React from 'react';
import { Card, CardContent, Typography, Grid, Paper } from '@mui/material';

function Dashboard() {
  return (
    <div className="p-4">
      <Typography variant="h4" className="mb-4">Admin Dashboard</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card className="bg-blue-500 text-white">
            <CardContent>
              <Typography variant="h5">Total Books</Typography>
              <Typography variant="h4">1200</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="bg-green-500 text-white">
            <CardContent>
              <Typography variant="h5">Total Users</Typography>
              <Typography variant="h4">350</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="bg-red-500 text-white">
            <CardContent>
              <Typography variant="h5">Books Borrowed</Typography>
              <Typography variant="h4">200</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <div className="mt-8">
        <Paper className="p-4">
          <Typography variant="h6" className="mb-4">Borrowing Trends</Typography>
          {/* Placeholder for a chart */}
          <div className="h-64 bg-gray-200"></div>
        </Paper>
      </div>
    </div>
  );
}

export default Dashboard;
