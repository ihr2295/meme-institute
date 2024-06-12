// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
  const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);

  const loginUser = async (username, password) => {
    const response = await axios.post('http://127.0.0.1:8001/dj-rest-auth/login/', {
      username,
      password
    });
    setAuthTokens(response.data);
    setUser(jwtDecode(response.data.access));
    localStorage.setItem('authTokens', JSON.stringify(response.data));
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
  };

  const contextData = {
    user,
    loginUser,
    logoutUser,
    authTokens
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
