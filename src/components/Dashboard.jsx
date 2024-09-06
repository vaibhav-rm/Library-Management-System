import React from 'react';
import { Card, CardContent, Typography, Grid, Paper } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';
import BookmarkIcon from '@mui/icons-material/Bookmark';

function Dashboard() {
  return (
    <div className="p-8">
      <Typography variant="h4" className="mb-8 font-bold text-primary">Admin Dashboard</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card className="bg-blue-100">
            <CardContent className="flex items-center justify-between">
              <div>
                <Typography variant="h6" className="text-blue-800">Total Books</Typography>
                <Typography variant="h4" className="text-blue-900 font-bold">1,200</Typography>
              </div>
              <BookIcon className="text-blue-500 text-4xl" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="bg-green-100">
            <CardContent className="flex items-center justify-between">
              <div>
                <Typography variant="h6" className="text-green-800">Total Users</Typography>
                <Typography variant="h4" className="text-green-900 font-bold">350</Typography>
              </div>
              <PeopleIcon className="text-green-500 text-4xl" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="bg-red-100">
            <CardContent className="flex items-center justify-between">
              <div>
                <Typography variant="h6" className="text-red-800">Books Borrowed</Typography>
                <Typography variant="h4" className="text-red-900 font-bold">200</Typography>
              </div>
              <BookmarkIcon className="text-red-500 text-4xl" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper className="mt-8 p-6">
        <Typography variant="h6" className="mb-4 font-semibold">Borrowing Trends</Typography>
        {/* Placeholder for a chart */}
        <div className="h-64 bg-gray-200 rounded"></div>
      </Paper>
    </div>
  );
}

export default Dashboard;