"use client";

import { createContext, useContext, useState } from "react";
import { loginUser, logoutUser } from "@/app/actions/auth";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const { success, user: userData } = await loginUser(null, { email, password });
    if (success) setUser(userData);
    return success;
  };

  const logout = async () => {
    const { success } = await logoutUser();
    if (success) setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
