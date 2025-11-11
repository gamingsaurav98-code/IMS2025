/**
 * Authentication API Service
 */

import apiCall from "./client";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  role?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

/**
 * Register a new user
 */
export const register = async (payload: RegisterPayload) => {
  return apiCall<AuthResponse>("/auth/register", {
    method: "POST",
    body: payload,
  });
};

/**
 * Login user
 */
export const login = async (payload: LoginPayload) => {
  return apiCall<AuthResponse>("/auth/login", {
    method: "POST",
    body: payload,
  });
};

/**
 * Logout user
 */
export const logout = async () => {
  return apiCall("/auth/logout", {
    method: "POST",
  });
};

/**
 * Forgot password
 */
export const forgotPassword = async (payload: ForgotPasswordPayload) => {
  return apiCall("/auth/forgot-password", {
    method: "POST",
    body: payload,
  });
};

/**
 * Reset password
 */
export const resetPassword = async (payload: ResetPasswordPayload) => {
  return apiCall("/auth/reset-password", {
    method: "POST",
    body: payload,
  });
};
