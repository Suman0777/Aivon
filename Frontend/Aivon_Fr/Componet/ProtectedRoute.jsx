import { Navigate } from "react-router";
import { useAuth } from "../src/context/AuthContext";

/*
 * ProtectedRoute Component
 * Wraps routes that require authentication
 * Redirects to login if user is not authenticated
 */
export const ProtectedRoute = ({ element }) => {
  const { isAuth, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return isAuth ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
