import React from 'react';
import { Container, Grid, Paper, Typography, Button } from '@mui/material';
import { Book, People, BookmarkAdded, TrendingUp } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
}));

const IconWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 64,
  height: 64,
  borderRadius: '50%',
  marginBottom: theme.spacing(2),
}));

// Dummy data for the chart
const borrowingData = [
  { name: 'Jan', Books: 400 },
  { name: 'Feb', Books: 300 },
  { name: 'Mar', Books: 500 },
  { name: 'Apr', Books: 280 },
  { name: 'May', Books: 390 },
  { name: 'Jun', Books: 430 },
];

export default function Dashboard() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom color="primary">
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StyledPaper elevation={3}>
            <IconWrapper sx={{ bgcolor: 'primary.light' }}>
              <Book fontSize="large" color="primary" />
            </IconWrapper>
            <Typography variant="h6" color="primary">Total Books</Typography>
            <Typography variant="h4" color="text.primary">1,200</Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledPaper elevation={3}>
            <IconWrapper sx={{ bgcolor: 'secondary.light' }}>
              <People fontSize="large" color="secondary" />
            </IconWrapper>
            <Typography variant="h6" color="secondary">Total Users</Typography>
            <Typography variant="h4" color="text.primary">350</Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledPaper elevation={3}>
            <IconWrapper sx={{ bgcolor: 'info.light' }}>
              <BookmarkAdded fontSize="large" color="info" />
            </IconWrapper>
            <Typography variant="h6" color="info.main">Books Borrowed</Typography>
            <Typography variant="h4" color="text.primary">200</Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledPaper elevation={3}>
            <IconWrapper sx={{ bgcolor: 'warning.light' }}>
              <TrendingUp fontSize="large" color="warning" />
            </IconWrapper>
            <Typography variant="h6" color="warning.main">Late Returns</Typography>
            <Typography variant="h4" color="text.primary">15</Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Borrowing Trends
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={borrowingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Books" fill="#7CB342" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}