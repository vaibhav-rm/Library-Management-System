import React, { useState, useEffect } from 'react';
import { Typography, Container, Paper, TextField, InputAdornment, Grid, Chip, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BookList from '../../components/BookList';
import axios from 'axios';

const branches = ['All', 'CSE', 'END', 'ENC', 'CIVIL', 'MECH', 'AUTO'];

export default function Books() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/books');
      setBooks(response.data.data);
      setFilteredBooks(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Failed to fetch books. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    filterBooks();
  }, [selectedBranch, searchTerm, books]);

  const filterBooks = () => {
    let filtered = books;

    if (selectedBranch !== 'All') {
      filtered = filtered.filter(book => book.branch.name === selectedBranch);
    }

    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(lowercasedTerm) ||
        book.author.some(author => author.name.toLowerCase().includes(lowercasedTerm)) ||
        book.isbn.toLowerCase().includes(lowercasedTerm)
      );
    }

    setFilteredBooks(filtered);
  };

  const handleBranchClick = (branch) => {
    setSelectedBranch(branch);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return (
      <Container maxWidth="xl" className="py-8 flex justify-center items-center">
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" className="py-8">
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

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
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Typography variant="h6" className="mb-4">
          Branches
        </Typography>
        <div className="flex flex-wrap gap-2 mb-6">
          {branches.map((branch) => (
            <Chip
              key={branch}
              label={branch}
              onClick={() => handleBranchClick(branch)}
              color={selectedBranch === branch ? "primary" : "default"}
              className="cursor-pointer"
            />
          ))}
        </div>
      </Paper>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={3}>
          <Paper elevation={3} className="p-4 bg-white rounded-lg">
            <Typography variant="h6" className="mb-4">
              Filters
            </Typography>
            {/* Add additional filter options here if needed */}
          </Paper>
        </Grid>
        <Grid item xs={12} lg={9}>
          <Paper elevation={3} className="p-8 bg-white rounded-lg">
            <BookList books={filteredBooks} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}