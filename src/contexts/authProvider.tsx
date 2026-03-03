import { useState, useEffect, type ReactNode } from "react";
import { toast } from "react-toastify";
import type { User } from "../types/auth";
import { AuthContext } from "./authContext";
import apiClient from "../api/httpClient";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthPayload {
  clientId: string;
  userId: string;
  username: string;
  role: User["role"];
  resetPassword: boolean;
}

export const mapAuthPayloadToUser = (payload: AuthPayload): User => ({
  clientId: payload.clientId,
  userId: payload.userId,
  username: payload.username,
  role: payload.role,
  resetPassword: payload.resetPassword,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Restore user from server session on mount
  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        const response = await apiClient.get("/users/me");

        const userObj = mapAuthPayloadToUser(response.data as AuthPayload);

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

  useEffect(() => {
    const handleUnauthorized = () => {
      setIsLoggedIn(false);
      setUser(null);
    };

    window.addEventListener("nexus-obra:unauthorized", handleUnauthorized);
    return () => {
      window.removeEventListener("nexus-obra:unauthorized", handleUnauthorized);
    };
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await apiClient.post("/users/login", {
        username,
        password,
      });

      setIsLoggedIn(true);
      const userObj = mapAuthPayloadToUser({
        ...(response.data as Omit<AuthPayload, "username">),
        username,
      });
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
    apiClient.post("/users/logout").catch(() => undefined);
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
