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

// The backend sets an auth cookie and returns the user object directly.
// Adapted AuthResponse to reflect that login/register return the user object.
export type AuthResponse = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  roles?: any;
};

export const register = async (payload: RegisterPayload) => {
  return apiCall<AuthResponse>("/auth/register", {
    method: "POST",
    body: payload,
  });
};

export const login = async (payload: LoginPayload) => {
  return apiCall<AuthResponse>("/auth/login", {
    method: "POST",
    body: payload,
  });
};

export const logout = async () => {
  return apiCall("/auth/logout", { method: "POST" });
};

export const forgotPassword = async (payload: { email: string }) => {
  return apiCall("/auth/forgot-password", { method: "POST", body: payload });
};

export const resetPassword = async (payload: {
  token: string;
  newPassword: string;
}) => {
  return apiCall("/auth/reset-password", { method: "POST", body: payload });
};
