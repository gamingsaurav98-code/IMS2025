/**
 * API Client Configuration
 * Central place to manage API calls to the backend
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

/**
 * Get token from localStorage
 */
const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

/**
 * Generic API call function
 */
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

  if (token) {
    requestHeaders["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
      cache,
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
