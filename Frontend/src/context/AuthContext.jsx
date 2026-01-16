import React, { createContext, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => localStorage.getItem("accessToken") || null);

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setUser(token); // reactive login
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null); // reactive logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
