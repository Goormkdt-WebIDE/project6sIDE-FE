import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactElement;
};

export default function AuthRedirect({ children }: Props) {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
