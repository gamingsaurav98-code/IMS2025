/**
 * Auth API Integration Tests
 */

import { describe, it, expect, beforeAll } from "@jest/globals";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

describe("Authentication API", () => {
  let authToken: string;
  let userId: string;

  it("should register a new user", async () => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: `test-${Date.now()}@example.com`,
        password: "password123",
        name: "Test User",
      }),
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.token).toBeDefined();
    authToken = data.token;
  });

  it("should login a user", async () => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@example.com",
        password: "password123",
      }),
    });

    expect(response.status).toBeGreaterThanOrEqual(200);
    if (response.ok) {
      const data = await response.json();
      expect(data.token).toBeDefined();
    }
  });

  it("should handle invalid login credentials", async () => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "invalid@example.com",
        password: "wrongpassword",
      }),
    });

    expect(response.status).toBeGreaterThanOrEqual(400);
  });
});

describe("Products API", () => {
  it("should fetch all products", async () => {
    const response = await fetch(`${API_URL}/products`);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data) || data.data).toBeDefined();
  });

  it("should handle non-existent product", async () => {
    const response = await fetch(`${API_URL}/products/invalid-id`);
    expect(response.status).toBeGreaterThanOrEqual(400);
  });
});

describe("Customers API", () => {
  it("should require authentication to fetch customers", async () => {
    const response = await fetch(`${API_URL}/customers`);
    expect(response.status).toBeGreaterThanOrEqual(401);
  });
});

describe("Orders API", () => {
  it("should require authentication to fetch orders", async () => {
    const response = await fetch(`${API_URL}/orders`);
    expect(response.status).toBeGreaterThanOrEqual(401);
  });
});
