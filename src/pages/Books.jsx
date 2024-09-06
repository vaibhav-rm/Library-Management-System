import React from 'react';
import { Typography, Container, Paper, TextField, InputAdornment, Grid, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BookList from '../components/BookList';

const categories = ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Technology', 'Art', 'Philosophy'];

export default function Books() {
  return (
    <Container maxWidth="xl" className="py-8">
      <Typography variant="h4" component="h1" className="mb-6 font-bold text-primary">
        Book Catalog
      </Typography>
      <Paper elevation={3} className="p-8 bg-white rounded-lg mb-8">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for books..."
          className="mb-6"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Typography variant="h6" className="mb-4">
          Categories
        </Typography>
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Chip key={category} label={category} onClick={() => {}} className="cursor-pointer" />
          ))}
        </div>
      </Paper>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={3}>
          <Paper elevation={3} className="p-4 bg-white rounded-lg">
            <Typography variant="h6" className="mb-4">
              Filters
            </Typography>
            {/* Add filter options here */}
          </Paper>
        </Grid>
        <Grid item xs={12} lg={9}>
          <Paper elevation={3} className="p-8 bg-white rounded-lg">
            <BookList />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}