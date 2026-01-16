import { useState } from "react";
import { AuthContext } from "./AuthContext";
import React from "react";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    () => localStorage.getItem("accessToken")
  );

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setUser(token); // 🔥 re-render
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null); // 🔥 re-render
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
