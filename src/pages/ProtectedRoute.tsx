import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactElement;
};

export default function ProtectedRoute({ children }: Props) {
  const { user, isInitializing } = useAuthContext();

  if (!user && !isInitializing) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
