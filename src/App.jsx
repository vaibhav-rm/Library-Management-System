import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentLayout from './Layouts/StudentLayout';
import AdminLayout from './Layouts/AdminLayout';
import theme from './theme';
import { CircularProgress, Box } from '@mui/material';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<RedirectIfAuthenticated element={<Login />} />} />
            <Route path="/register" element={<RedirectIfAuthenticated element={<Register />} />} />
            <Route path="/student/*" element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentLayout />
              </ProtectedRoute>
            } />
            <Route path="/admin/*" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            } />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

const RedirectIfAuthenticated = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />;
  }

  return element;
};

export default App;