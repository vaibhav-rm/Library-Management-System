import React, { useState } from 'react';
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
import StudentLayout from './Layouts/StudentLayout'
import AdminLayout from './Layouts/AdminLayout'
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="p-4">
        <Routes>
          <Route path="/student/*" element={<StudentLayout />} />
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
