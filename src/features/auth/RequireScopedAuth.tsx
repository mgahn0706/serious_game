// src/features/auth/RequireAuth.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { type AuthScope, isLoggedIn } from "./scopedSessionAuth";

export default function RequireAuth({
  scope,
  loginPath,
  children,
}: {
  scope: AuthScope;
  loginPath: string;
  children: React.ReactNode;
}) {
  const location = useLocation();

  if (!isLoggedIn(scope)) {
    return (
      <Navigate to={loginPath} replace state={{ from: location.pathname }} />
    );
  }

  return <>{children}</>;
}
