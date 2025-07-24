"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <ProtectedRoute>
      <div style={{ padding: "2rem" }}>
        <h1>Dashboard</h1>
        <p>Welcome, {user?.name}!</p>
        <p>Role: {user?.role}</p>
        <Button onClick={handleLogout} variant="secondary">
          Logout
        </Button>
      </div>
    </ProtectedRoute>
  );
}
