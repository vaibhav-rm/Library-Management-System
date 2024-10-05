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

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<RedirectToLogin />} />
            <Route path="/register" element={<Register />} />
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

// This component checks the user state and redirects appropriately
const RedirectToLogin = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Optionally show a loading state
  }

  if (user) {
    return <Navigate to="/student" replace />; // Adjust this based on your app structure
  }

  return <Login />;
};

export default App;
    