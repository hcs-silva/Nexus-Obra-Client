import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import ProtectedRoute from "./ProtectedRoute";
import type { AuthContextType } from "../types/auth";

const renderWithAuth = (
  contextValue: AuthContextType,
  initialPath = "/dashboard/client-1",
) => {
  return render(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route
            path="/dashboard/:clientId"
            element={
              <ProtectedRoute requireClientMatch>
                <div>protected-content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>login-page</div>} />
          <Route path="/" element={<div>home-page</div>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>,
  );
};

describe("ProtectedRoute", () => {
  it("redirects unauthenticated users to login page", () => {
    renderWithAuth({
      user: null,
      login: vi.fn(),
      logout: vi.fn(),
      isLoggedIn: false,
      isAuthLoading: false,
      setUser: vi.fn(),
    });

    expect(screen.getByText("login-page")).toBeInTheDocument();
  });

  it("renders protected content when authenticated admin matches client path", () => {
    renderWithAuth({
      user: {
        role: "Admin",
        clientId: "client-1",
        userId: "user-1",
        username: "admin",
        resetPassword: false,
      },
      login: vi.fn(),
      logout: vi.fn(),
      isLoggedIn: true,
      isAuthLoading: false,
      setUser: vi.fn(),
    });

    expect(screen.getByText("protected-content")).toBeInTheDocument();
  });
});
