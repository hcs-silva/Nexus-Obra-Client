import type { UserRole } from "../config/roleConfig";

export type User = {
  clientId: string;
  userId: string;
  username: string;
  // isAdmin: boolean;
  // masterAdmin: boolean;
  role: UserRole;
  resetPassword: boolean;
};

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
  isAuthLoading: boolean;
  setUser: (user: User | null) => void;
}

export interface Client {
  _id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  subStatus: boolean;
}
