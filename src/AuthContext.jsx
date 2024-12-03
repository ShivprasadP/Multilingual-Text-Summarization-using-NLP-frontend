import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('email'));

  const login = (email) => {
    sessionStorage.setItem('email', email);
    setIsLoggedIn(true);
  };

  const logout = () => {
    sessionStorage.removeItem('email');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};