// src/app/(auth)/layout.tsx
import React from "react";
import "./auth-layout.scss"; // si tienes estilos para auth

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  console.log("AuthLayout");
  return (
    <div className="auth-layout">
      <main>{children}</main>
    </div>
  );
}
