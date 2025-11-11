"use client";
import { useState, useCallback } from "react";
import * as customersApi from "@/lib/api/customers";

export function useCustomers() {
  const [customers, setCustomers] = useState<customersApi.Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await customersApi.getCustomers();
      if (res.error) {
        setError(res.error);
        return;
      }
      if (res.data) setCustomers(Array.isArray(res.data) ? res.data : []);
    } catch (err: any) {
      setError(err.message || "Failed to load customers");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createCustomer = useCallback(
    async (payload: customersApi.CreateCustomerPayload) => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await customersApi.createCustomer(payload);
        if (res.error) {
          setError(res.error);
          return;
        }
        if (res.data)
          setCustomers((prev) => (res.data ? [...prev, res.data] : prev));
      } catch (err: any) {
        setError(err.message || "Failed to create customer");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { customers, isLoading, error, fetchCustomers, createCustomer };
}
