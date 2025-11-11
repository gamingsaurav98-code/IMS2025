/**
 * Customers Hook
 */

"use client";

import { useState, useCallback } from "react";
import * as customersApi from "@/lib/api/customers";

interface UseCustomersReturn {
  customers: customersApi.Customer[];
  isLoading: boolean;
  error: string | null;
  fetchCustomers: () => Promise<void>;
  fetchCustomerById: (id: string) => Promise<customersApi.Customer | null>;
  createCustomer: (
    payload: customersApi.CreateCustomerPayload
  ) => Promise<void>;
  updateCustomer: (
    id: string,
    payload: Partial<customersApi.CreateCustomerPayload>
  ) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
  clearError: () => void;
}

export function useCustomers(): UseCustomersReturn {
  const [customers, setCustomers] = useState<customersApi.Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const fetchCustomers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await customersApi.getCustomers();
      if (response.error) {
        setError(response.error);
        return;
      }
      if (response.data) {
        setCustomers(Array.isArray(response.data) ? response.data : []);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch customers"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCustomerById = useCallback(async (id: string) => {
    try {
      const response = await customersApi.getCustomerById(id);
      if (response.error) {
        setError(response.error);
        return null;
      }
      return response.data || null;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch customer");
      return null;
    }
  }, []);

  const createCustomer = useCallback(
    async (payload: customersApi.CreateCustomerPayload) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await customersApi.createCustomer(payload);
        if (response.error) {
          setError(response.error);
          return;
        }
        if (response.data) {
          setCustomers((prev) => [...prev, response.data]);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to create customer"
        );
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updateCustomer = useCallback(
    async (
      id: string,
      payload: Partial<customersApi.CreateCustomerPayload>
    ) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await customersApi.updateCustomer(id, payload);
        if (response.error) {
          setError(response.error);
          return;
        }
        if (response.data) {
          setCustomers((prev) =>
            prev.map((c) => (c._id === id ? response.data : c))
          );
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to update customer"
        );
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const deleteCustomer = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await customersApi.deleteCustomer(id);
      if (response.error) {
        setError(response.error);
        return;
      }
      setCustomers((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete customer"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    customers,
    isLoading,
    error,
    fetchCustomers,
    fetchCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    clearError,
  };
}
