"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// TEMP hardcoded credentials — replace with a real API call later.
const DEMO_EMAIL = "demo@algobright.com";
const DEMO_PASSWORD = "password123";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // On first load, check if the user was already logged in (survives refresh)
  useEffect(() => {
    const saved = localStorage.getItem("isLoggedIn");
    if (saved === "true") setIsLoggedIn(true);
  }, []);

  function login(email: string, password: string) {
    const success = email === DEMO_EMAIL && password === DEMO_PASSWORD;
    if (success) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
    }
    return success;
  }

  function logout() {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook so components can just do: const { isLoggedIn, login, logout } = useAuth();
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside an AuthProvider");
  return context;
}
