"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin@gmail.com");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login({ email, password });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <aside>
        <h2>Login</h2>

        {error && <div className="error">{error}</div>}
        <div>
          <Input type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div>
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <Button type="submit" loading={loading} className="btn btn-primary">
            Login
          </Button>
        </div>

        <p>
          Don't have an account?{" "}
          <a href="/register" className="link">
            Register here
          </a>
        </p>
      </aside>
    </form>
  );
};
