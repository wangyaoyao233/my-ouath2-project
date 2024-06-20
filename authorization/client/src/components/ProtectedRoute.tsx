// protected-route.js
import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, recordLastUrl } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      const currentUrl = `${location.pathname}${location.search}${location.hash}`;
      recordLastUrl(currentUrl);
    }
  }, [isAuthenticated, location, recordLastUrl]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
