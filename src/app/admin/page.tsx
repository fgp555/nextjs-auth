"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios/axiosInstance";

interface IUserData {
  _id: number;
  name: string;
  email: string;
  role: string;
}

export default function AdminPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<IUserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/api/users/findAll");
        setUsers(response.data.results); // ⬅️ Ajuste aquí
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (_id: number) => {
    try {
      await axiosInstance.delete(`/api/users/remove/${_id}`);
      setUsers((prev) => prev.filter((u) => u._id !== _id));
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
                <tr key={u._id}>
                  <td>{u._id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button onClick={() => deleteUser(u._id)}>Delete</button>
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
