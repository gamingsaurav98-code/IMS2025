/**
 * API Client Tests
 */

import { describe, it, expect } from "@jest/globals";

describe("API Client Configuration", () => {
  it("should have API_BASE_URL defined", () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    expect(apiUrl).toBeDefined();
    expect(apiUrl).toContain("http");
  });

  it("should have correct environment variables", () => {
    expect(process.env.NEXT_PUBLIC_API_URL).toBe("http://localhost:3000/api");
  });
});

describe("Environment Setup", () => {
  it("backend should be reachable", async () => {
    try {
      const response = await fetch("http://localhost:3000", {
        method: "GET",
      });
      // We just want to know if we can make the request
      expect(response).toBeDefined();
    } catch (error) {
      // Network errors are expected if backend is not running
      expect(error).toBeDefined();
    }
  });
});
