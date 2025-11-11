/**
 * API Client Configuration (mirrored)
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
  status: number;
}

interface RequestConfig {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: any;
  cache?: RequestCache;
}

const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

export async function apiCall<T = any>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> {
  const { method = "GET", headers = {}, body, cache = "no-store" } = config;

  const token = getToken();
  const url = `${API_BASE_URL}${endpoint}`;

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  // Keep Authorization header only if a token exists in localStorage
  // but primary auth for this backend is cookie-based (authToken cookie).
  if (token) {
    requestHeaders["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
      cache,
      // Include credentials so browser will accept and send auth cookies
      // (backend sets authToken cookie on login and reads it from cookie).
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        status: response.status,
        error: data.message || "An error occurred",
      };
    }

    return {
      data,
      status: response.status,
    };
  } catch (error) {
    return {
      status: 500,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
}

export default apiCall;
