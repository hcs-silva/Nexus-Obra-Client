import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { useAuth } from "../hooks/useAuth";
import { AuthProvider } from "./authProvider";
import apiClient from "../api/httpClient";

vi.mock("../api/httpClient", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const AuthProbe = () => {
  const { user, isLoggedIn, isAuthLoading } = useAuth();

  return (
    <div>
      <div>loading:{String(isAuthLoading)}</div>
      <div>logged-in:{String(isLoggedIn)}</div>
      <div>username:{user?.username ?? "none"}</div>
    </div>
  );
};

describe("AuthProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("bootstraps session from /users/me and exposes authenticated state", async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      data: {
        clientId: "client-1",
        userId: "user-1",
        username: "admin",
        role: "Admin",
        resetPassword: false,
      },
    });

    render(
      <AuthProvider>
        <AuthProbe />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("loading:false")).toBeInTheDocument();
    });

    expect(screen.getByText("logged-in:true")).toBeInTheDocument();
    expect(screen.getByText("username:admin")).toBeInTheDocument();
  });
});
