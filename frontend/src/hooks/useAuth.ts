/**
 * Authentication Hook
 */

"use client";

import { useState, useCallback } from "react";
import * as authApi from "@/lib/api/auth";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  clearError: () => void;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.login({ email, password });
      if (response.error) {
        setError(response.error);
        return;
      }
      if (response.data) {
        localStorage.setItem("authToken", response.data.token);
        setUser(response.data.user);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await authApi.register({ email, password, name });
        if (response.error) {
          setError(response.error);
          return;
        }
        if (response.data) {
          localStorage.setItem("authToken", response.data.token);
          setUser(response.data.user);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Registration failed");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authApi.logout();
      localStorage.removeItem("authToken");
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logout failed");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.forgotPassword({ email });
      if (response.error) {
        setError(response.error);
        return;
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send reset email"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    forgotPassword,
    clearError,
  };
}
