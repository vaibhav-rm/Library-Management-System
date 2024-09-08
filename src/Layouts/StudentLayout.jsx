import React, { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import StudentNavbar from '../components/StudentNavbar';
import StudentSidebar from '../components/StudentSidebar';
import Home from '../pages/student/Home';
import Books from '../pages/student/Books';
import BookDetails from '../pages/student/BookDetails';
import Profile from '../pages/student/Profile';
import BorrowingHistory from '../pages/student/BorrowingHistory';

function StudentLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: 'flex' }}>
      <StudentNavbar onMenuClick={() => setSidebarOpen(!isSidebarOpen)} />
      <StudentSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)}  />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%', marginTop: '64px' }}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="profile" element={<Profile />} />
          <Route path="history" element={<BorrowingHistory />} />
        </Routes>
        <Outlet />
      </Box>
    </Box>
  );
}

export default StudentLayout;