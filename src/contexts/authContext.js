import React, { createContext, useState, useMemo } from "react";
import AuthService from "../services/auth.service"; // Remember to import AuthService

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(AuthService.getCurrentUser());

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
