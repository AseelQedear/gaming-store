// src/components/PublicOnlyRoute.tsx

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // ✅ Use AuthContext

interface PublicOnlyRouteProps {
  children: React.ReactNode;
}

const PublicOnlyRoute: React.FC<PublicOnlyRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PublicOnlyRoute;
