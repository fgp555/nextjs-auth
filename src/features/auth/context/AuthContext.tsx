// src/features/auth/context/AuthContext.tsx

"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, AuthContextType, LoginCredentials, RegisterCredentials, AuthResponse } from "../types/auth.types";
import axiosInstance from "@/lib/axios/axiosInstance";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  // Check if user is authenticated on mount
  useEffect(() => {
    const initAuth = async () => {
      const accessToken = sessionStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken && refreshToken) {
        try {
          const response = await axiosInstance.get("/api/auth/me");
          setUser(response.data.user);
        } catch (error) {
          // Token invalid, try to refresh
          try {
            await refreshTokenFunc();
          } catch (refreshError) {
            // Refresh failed, clear tokens
            clearTokens();
          }
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const clearTokens = () => {
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      const response = await axiosInstance.post<AuthResponse>("/api/auth/login", credentials);
      const { accessToken, refreshToken, user } = response.data;

      sessionStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setUser(user);
    } catch (error) {
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<void> => {
    try {
      const response = await axiosInstance.post<AuthResponse>("/api/auth/register", credentials);
      const { accessToken, refreshToken, user } = response.data;

      sessionStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setUser(user);
    } catch (error) {
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await axiosInstance.post("/api/auth/logout", { refreshToken });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearTokens();
    }
  };

  const refreshTokenFunc = async (): Promise<void> => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await axiosInstance.post("/api/auth/refresh-token", {
      refreshToken,
    });

    const { accessToken } = response.data;
    sessionStorage.setItem("accessToken", accessToken);

    // Get updated user info
    const userResponse = await axiosInstance.get("/api/auth/me");
    setUser(userResponse.data.user);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    refreshToken: refreshTokenFunc,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
