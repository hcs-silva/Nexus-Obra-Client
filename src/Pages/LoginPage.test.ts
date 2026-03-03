import { describe, expect, it } from "vitest";
import { resolvePostLoginPath } from "./LoginPage";
import { evaluateProtectedRouteAccess } from "../components/ProtectedRoute";

describe("login flow + protected navigation", () => {
  it("resolves admin login destination and allows protected route", () => {
    const user = {
      clientId: "client-88",
      userId: "user-1",
      username: "admin",
      role: "Admin" as const,
      resetPassword: false,
    };

    const loginPath = resolvePostLoginPath(user);
    expect(loginPath).toBe("/dashboard/client-88");

    const decision = evaluateProtectedRouteAccess({
      isLoggedIn: true,
      isAuthLoading: false,
      user,
      requireClientMatch: true,
      clientIdFromUrl: "client-88",
    });

    expect(decision).toEqual({ kind: "allow" });
  });
});
