"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import styles from "@/styles/components/_auth.module.scss";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("123456");
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
    <form onSubmit={handleSubmit} className={styles.authForm}>
      <h2>Login</h2>

      {error && <div className={styles.error}>{error}</div>}

      <Input type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <Input type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

      <Button type="submit" loading={loading}>
        Login
      </Button>

      <p>
        Don't have an account?{" "}
        <a href="/register" className={styles.link}>
          Register here
        </a>
      </p>
    </form>
  );
};
