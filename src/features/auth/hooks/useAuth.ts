// src/features/auth/hooks/useAuth.ts

"use client";

import { useAuthContext } from "../context/AuthContext";

export const useAuth = () => {
  return useAuthContext();
};
