// src/components/ProtectedRoute.tsx
// Why: This component acts as a guard for private routes.
// It redirects unauthenticated users to the login page.

import React from 'react';
import { useAuthStore } from '../store/authStore';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Why: Get the isAuthenticated status from our Zustand store.
  const { isAuthenticated } = useAuthStore();

  // Why: If the user is authenticated, render the children components.
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Why: If not authenticated, redirect them to the login page.
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;