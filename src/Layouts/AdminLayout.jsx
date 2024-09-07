import React, { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import Dashboard from '../components/Dashboard';
import BookManagement from '../pages/admin/BookManagement';
import UserManagement from '../pages/admin/UserManagement';
import BorrowingManagement from '../pages/admin/BorrowingManagement';
import Reports from '../pages/admin/Reports';
import Settings from '../pages/admin/Settings';

function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminNavbar onMenuClick={() => setSidebarOpen(!isSidebarOpen)} />
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%', marginTop: '64px' }}>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="books" element={<BookManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="borrowings" element={<BorrowingManagement />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminLayout;