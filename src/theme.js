// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5D4037',
      light: '#8B6B61',
      dark: '#321911',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#7CB342',
      light: '#AED581',
      dark: '#4B830D',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F5DC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333',
      secondary: '#5D4037',
    },
    info: {
      main: '#4FC3F7',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
      color: '#5D4037',
    },
    h2: {
      fontWeight: 500,
      color: '#5D4037',
    },
    h3: {
      fontWeight: 500,
      color: '#5D4037',
    },
    h4: {
      fontWeight: 500,
      color: '#5D4037',
    },
    h5: {
      fontWeight: 500,
      color: '#5D4037',
    },
    h6: {
      fontWeight: 500,
      color: '#5D4037',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#5D4037',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        contained: {
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

export default theme;