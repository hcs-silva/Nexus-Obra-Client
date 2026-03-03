import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
  requireClientMatch?: boolean;
}

export type ProtectedRouteDecision =
  | { kind: "allow" }
  | { kind: "redirect"; to: "/login" | "/"; shouldLogout?: boolean };

interface ProtectedRouteEvaluationInput {
  isLoggedIn: boolean;
  isAuthLoading: boolean;
  user: {
    role: string;
    clientId?: string;
  } | null;
  requiredRoles?: string[];
  requireClientMatch?: boolean;
  clientIdFromUrl?: string;
}

export const evaluateProtectedRouteAccess = ({
  isLoggedIn,
  isAuthLoading,
  user,
  requiredRoles,
  requireClientMatch = false,
  clientIdFromUrl,
}: ProtectedRouteEvaluationInput): ProtectedRouteDecision | null => {
  if (isAuthLoading) {
    return null;
  }

  if (!isLoggedIn || !user) {
    return { kind: "redirect", to: "/login" };
  }

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return { kind: "redirect", to: "/" };
  }

  if (requireClientMatch && user.role !== "masterAdmin") {
    if (!clientIdFromUrl) {
      return { kind: "redirect", to: "/login", shouldLogout: true };
    }

    if (user.clientId !== clientIdFromUrl) {
      return { kind: "redirect", to: "/" };
    }
  }

  return { kind: "allow" };
};

/**
 * ProtectedRoute component ensures:
 * 1. Only authenticated users can access protected routes
 * 2. Users can only access data for their assigned client (unless masterAdmin)
 * 3. masterAdmin users have full access to all routes
 *
 * Usage:
 * <ProtectedRoute requireClientMatch={true}>
 *   <YourComponent />
 * </ProtectedRoute>
 *
 * or with role restrictions:
 * <ProtectedRoute requiredRoles={['Admin', 'masterAdmin']}>
 *   <YourComponent />
 * </ProtectedRoute>
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles,
  requireClientMatch = false,
}) => {
  const { user, isLoggedIn, isAuthLoading, logout } = useAuth();
  const params = useParams();

  const decision = evaluateProtectedRouteAccess({
    isLoggedIn,
    isAuthLoading,
    user,
    requiredRoles,
    requireClientMatch,
    clientIdFromUrl: params.clientId,
  });

  if (decision === null) {
    return null;
  }

  if (decision.kind === "redirect") {
    if (decision.shouldLogout) {
      logout();
    }

    return <Navigate to={decision.to} replace />;
  }

  // All checks passed, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
