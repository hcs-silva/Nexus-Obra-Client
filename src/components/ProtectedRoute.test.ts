import { describe, expect, it } from "vitest";
import { evaluateProtectedRouteAccess } from "./ProtectedRoute";

describe("evaluateProtectedRouteAccess", () => {
  it("redirects unauthenticated users to login", () => {
    const decision = evaluateProtectedRouteAccess({
      isLoggedIn: false,
      isAuthLoading: false,
      user: null,
    });

    expect(decision).toEqual({ kind: "redirect", to: "/login" });
  });

  it("allows matching client for authenticated admin", () => {
    const decision = evaluateProtectedRouteAccess({
      isLoggedIn: true,
      isAuthLoading: false,
      user: {
        role: "Admin",
        clientId: "client-1",
      },
      requireClientMatch: true,
      clientIdFromUrl: "client-1",
    });

    expect(decision).toEqual({ kind: "allow" });
  });
});
