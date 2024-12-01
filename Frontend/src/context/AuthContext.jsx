import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null });

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setAuth({ token: storedToken });
    }
  }, []);

  const login = (token) => {
    setAuth({ token });
    localStorage.setItem("authToken", token);
  };

  const logout = () => {
    setAuth({ token: null });
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth: login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
