"use client";
import { useState, useCallback, useEffect } from "react";
import * as authApi from "@/lib/api/auth";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize user from localStorage if available
  useEffect(() => {
    try {
      const raw = localStorage.getItem("authUser");
      if (raw) {
        setUser(JSON.parse(raw));
      }
    } catch (err) {
      // ignore
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authApi.login({ email, password });
      if (res.error) {
        setError(res.error);
        return;
      }

      // Backend returns the user object and sets an auth cookie.
      // res.data may be the user object directly.
      if (res.data) {
        const userObj = (res.data as any).user
          ? (res.data as any).user
          : res.data;
        try {
          localStorage.setItem("authUser", JSON.stringify(userObj));
        } catch (e) {}
        setUser(userObj);
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setUser(null);
    await authApi.logout();
  }, []);

  return { user, loading, error, login, logout };
}
