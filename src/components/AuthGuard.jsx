// src/components/AuthGuard.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children, isAuthenticated }) => {
    if (!isAuthenticated) {
        // Redirect to login page if user is not authenticated
        return <Navigate to="/login" replace />;
    }

    return children; // Render children if authenticated
};

export default AuthGuard;
