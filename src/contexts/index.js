import React from "react";
import { AuthProvider } from "./authContext";

export function AppProvider({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default AppProvider;
