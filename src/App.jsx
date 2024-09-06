import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Books from './pages/Books';
import Users from './pages/Users';
import Admin from './pages/Admin';
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

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

 
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/users" element={<Users />} />
          <Route path="/admin" element={<Admin />} />

        </Routes>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
