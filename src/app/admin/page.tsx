"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios/axiosInstance";

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function AdminPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/api/users");
        setUsers(response.data.users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId: number) => {
    try {
      await axiosInstance.delete(`/api/users/${userId}`);
      setUsers(users.filter((u) => u.id !== userId));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div style={{ padding: "2rem" }}>
        <h1>Admin Panel</h1>
        <p>Welcome, {user?.name}!</p>

        <h2>Users Management</h2>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button onClick={() => deleteUser(u.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </ProtectedRoute>
  );
}
