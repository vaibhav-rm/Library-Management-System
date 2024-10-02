import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/student/Home';
import Books from './pages/student/Books';
import Users from './pages/admin/Users';
import Admin from './pages/admin/Admin';
import StudentLayout from './Layouts/StudentLayout';
import AdminLayout from './Layouts/AdminLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthGuard from './components/AuthGuard'; // Import AuthGuard

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Fetch user authentication status (e.g., check token validity)
    const checkAuthentication = async () => {
      try {
        const response = await fetch('/api/auth/check-auth', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          setAuthenticated(true); // User is authenticated
        } else {
          setAuthenticated(false); // User is not authenticated
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setAuthenticated(false); // Default to not authenticated
      }
    };

    checkAuthentication();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/student/*" element={
              <AuthGuard isAuthenticated={isAuthenticated}>
                <StudentLayout />
              </AuthGuard>
            } />
            <Route path="/admin/*" element={
              <AuthGuard isAuthenticated={isAuthenticated}>
                <AdminLayout />
              </AuthGuard>
            } />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
