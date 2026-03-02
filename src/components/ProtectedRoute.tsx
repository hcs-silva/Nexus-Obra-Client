import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
  requireClientMatch?: boolean;
}

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

  if (isAuthLoading) {
    return null;
  }

  // Check if user is authenticated
  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role
  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Check client match for non-masterAdmin users
  // masterAdmin users bypass client restrictions
  if (requireClientMatch && user.role !== "masterAdmin") {
    const clientIdFromUrl = params.clientId;

    if (!clientIdFromUrl) {
      // If route requires client match but no clientId in URL, logout and redirect to login
      // This updates the navbar to show login button
      logout();
      return <Navigate to="/login" replace />;
    }

    if (user.clientId !== clientIdFromUrl) {
      // User's client doesn't match the route's client
      console.warn(
        `Access denied: User with clientId ${user.clientId} tried to access clientId ${clientIdFromUrl}`,
      );
      return <Navigate to="/" replace />;
    }
  }

  // All checks passed, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
