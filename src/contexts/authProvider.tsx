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
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Restore user from server session on mount
  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/users/me`);

        const userObj: User = {
          clientId: response.data.clientId,
          userId: response.data.userId,
          username: response.data.username,
          role: response.data.role,
          resetPassword: response.data.resetPassword,
        };

        setUser(userObj);
        setIsLoggedIn(true);
      } catch {
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setIsAuthLoading(false);
      }
    };

    bootstrapAuth();
  }, []);

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
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isLoggedIn, isAuthLoading, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
