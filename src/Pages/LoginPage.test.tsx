import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../contexts/authContext";
import LoginPage from "./LoginPage";
import ProtectedRoute from "../components/ProtectedRoute";
import type { AuthContextType, User } from "../types/auth";

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

const buildAuthContext = (
  user: User | null,
  login: AuthContextType["login"],
): AuthContextType => ({
  user,
  login,
  logout: vi.fn(),
  isLoggedIn: Boolean(user),
  isAuthLoading: false,
  setUser: vi.fn(),
});

const LoginFlowHarness = () => {
  const [user, setUser] = useState<User | null>(null);

  const login: AuthContextType["login"] = async (username) => {
    setUser({
      clientId: "client-1",
      userId: "user-1",
      username,
      role: "Admin",
      resetPassword: false,
    });
  };

  return (
    <AuthContext.Provider value={buildAuthContext(user, login)}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard/:clientId"
          element={
            <ProtectedRoute requireClientMatch>
              <div>dashboard-screen</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthContext.Provider>
  );
};

describe("LoginPage interaction + protected navigation", () => {
  it("submits credentials and navigates admin user to protected dashboard", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <LoginFlowHarness />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText("Username:"), "admin");
    await user.type(screen.getByLabelText("Password:"), "password123");
    await user.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(screen.getByText("dashboard-screen")).toBeInTheDocument();
    });
  });
});
