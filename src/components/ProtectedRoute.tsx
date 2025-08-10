"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalState } from '@/contexts/GlobalStateContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  redirectTo?: string;
}

export function ProtectedRoute({ 
  children, 
  requireAuth = true, 
  requireAdmin = false,
  redirectTo = "/auth" 
}: ProtectedRouteProps) {
  const { state } = useGlobalState();
  const router = useRouter();

  useEffect(() => {
    // If still loading, wait
    if (state.isLoading) {
      return;
    }

    // If authentication is required but user is not authenticated
    if (requireAuth && !state.isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    // If admin access is required but user is not admin (you might need to add admin check to your state)
    if (requireAdmin && !state.isAuthenticated) {
      router.push("/adminLogin");
      return;
    }

    // If user is authenticated but trying to access login page, redirect to dashboard
    if (state.isAuthenticated && (redirectTo === "/auth" || redirectTo === "/adminLogin")) {
      router.push("/assignment");
      return;
    }
  }, [state.isAuthenticated, state.isLoading, requireAuth, requireAdmin, redirectTo, router]);

  // Show loading state while checking authentication
  if (state.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If authentication is required but user is not authenticated, don't render children
  if (requireAuth && !state.isAuthenticated) {
    return null;
  }

  // If admin access is required but user is not admin, don't render children
  if (requireAdmin && !state.isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
