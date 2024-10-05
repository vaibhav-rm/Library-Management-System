import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoggedIn();
  }, []);


  const checkLoggedIn = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/users/current-user', {
        withCredentials: true
      });
      if (response.data && response.data.data) {
        setUser(response.data.data); // Set user if found
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      setUser(null); // Ensure user is set to null on error
    } finally {
      setLoading(false);
    }
  };


  const login = async (loginData) => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/login', loginData, {
        withCredentials: true
      });
      setUser(response.data.data.user);
      return response.data.data.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (registerData) => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/register', registerData, {
        withCredentials: true
      });
      setUser(response.data.data.user);
      return response.data.data.user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:8000/api/v1/users/logout', {}, {
        withCredentials: true
      });
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
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