"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import styles from "@/styles/components/_auth.module.scss";

export const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register(formData);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.authForm}>
      <h2>Register</h2>

      {error && <div className={styles.error}>{error}</div>}

      <Input type="text" name="name" label="Full Name" value={formData.name} onChange={handleChange} required />

      <Input type="email" name="email" label="Email" value={formData.email} onChange={handleChange} required />

      <Input
        type="password"
        name="password"
        label="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <Button type="submit" loading={loading}>
        Register
      </Button>

      <p>
        Already have an account?{" "}
        <a href="/login" className={styles.link}>
          Login here
        </a>
      </p>
    </form>
  );
};
