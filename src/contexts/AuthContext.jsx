import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      await refreshToken();
      setLoading(false);
    };

    initAuth();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await api.post('/users/refresh-token');
      console.log('Refresh token response:', response.data);
      if (response.data && response.data.data && response.data.data.user) {
        setUser(response.data.data.user);
      }
    } catch (error) {
      console.error('Error refreshing token:', error.response ? error.response.data : error.message);
      setUser(null);
      // Clear any stored tokens or user data here
      localStorage.removeItem('user');
    }
  };

  const login = async (loginData) => {
    try {
      const response = await api.post('/users/login', loginData);
      console.log('Login response:', response.data);
      if (response.data && response.data.data && response.data.data.user) {
        setUser(response.data.data.user);
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        return response.data.data.user;
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/users/logout');
      setUser(null);
      // Clear stored user data
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error.response ? error.response.data : error.message);
    }
  };

  // Set up an interceptor to refresh the token before each request
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            await refreshToken();
            return api(originalRequest);
          } catch (refreshError) {
            setUser(null);
            // Clear any stored tokens or user data here
            localStorage.removeItem('user');
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};