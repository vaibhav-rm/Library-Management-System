import React from 'react';
import { Typography, Container, Paper, useTheme, useMediaQuery } from '@mui/material';
import BookList from '../../components/BookList';

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container 
      maxWidth="xl" 
      sx={{ 
        width: isMobile ? '100%' : '80%', // Set width to 100% on mobile and 80% on larger screens
        padding: isMobile ? theme.spacing(2) : theme.spacing(8),
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          padding: isMobile ? theme.spacing(4) : theme.spacing(8),
          margin: isMobile ? theme.spacing(-5) : theme.spacing(-7),
          backgroundColor: 'white', 
          borderRadius: '8px' 
        }}
      >
        <Typography 
          variant={isMobile ? "h4" : "h3"} 
          component="h1" 
          sx={{ 
            marginBottom: isMobile ? theme.spacing(4) : theme.spacing(8),
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'primary.main',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            hyphens: 'auto',
          }}
        >
          Welcome to the Library Management System
        </Typography>
        <Typography 
          variant={isMobile ? "h6" : "h5"} 
          sx={{ 
            marginBottom: isMobile ? theme.spacing(4) : theme.spacing(6),
            textAlign: 'center',
            color: 'text.secondary',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            hyphens: 'auto',
          }}
        >
          Explore our vast collection of books across various categories
        </Typography>
        <BookList />
      </Paper>
    </Container>
  );
}
