import { useState, useEffect, type ReactNode } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import type { User } from "../types/auth";
import { AuthContext } from "./authContext";
import { BACKEND_URL } from "../config";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Restore user from storage on mount
  useEffect(() => {
    if (!user) {
      const storedUser =
        localStorage.getItem("user") || sessionStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setIsLoggedIn(true);
        } catch (e) {
          console.log("Failed to parse stored user:", e);
          setUser(null);
          setIsLoggedIn(false);
        }
      }
    }
  }, [user]);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/users/login`, {
        username,
        password,
      });

      localStorage.setItem("userId", response.data.userId);
      setIsLoggedIn(true);
      const userObj = {
        clientId: response.data.clientId,
        userId: response.data.userId,
        username,
        role: response.data.role,
        resetPassword: response.data.resetPassword,
      };
      setUser(userObj);
      localStorage.setItem("user", JSON.stringify(userObj));

      toast.success("Login successful!");
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Login failed. Please check your credentials.";
      toast.error(errorMessage);
      throw error;
    }
  };

  const logout = () => {
    axios.post(`${BACKEND_URL}/users/logout`).catch(() => undefined);
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
