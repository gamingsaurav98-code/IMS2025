/**
 * Orders Hook
 */

"use client";

import { useState, useCallback } from "react";
import * as ordersApi from "@/lib/api/orders";

interface UseOrdersReturn {
  orders: ordersApi.Order[];
  isLoading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  fetchOrderById: (id: string) => Promise<ordersApi.Order | null>;
  createOrder: (payload: ordersApi.CreateOrderPayload) => Promise<void>;
  updateOrder: (
    id: string,
    payload: Partial<ordersApi.CreateOrderPayload>
  ) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
  clearError: () => void;
}

export function useOrders(): UseOrdersReturn {
  const [orders, setOrders] = useState<ordersApi.Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ordersApi.getOrders();
      if (response.error) {
        setError(response.error);
        return;
      }
      if (response.data) {
        setOrders(Array.isArray(response.data) ? response.data : []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchOrderById = useCallback(async (id: string) => {
    try {
      const response = await ordersApi.getOrderById(id);
      if (response.error) {
        setError(response.error);
        return null;
      }
      return response.data || null;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch order");
      return null;
    }
  }, []);

  const createOrder = useCallback(
    async (payload: ordersApi.CreateOrderPayload) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await ordersApi.createOrder(payload);
        if (response.error) {
          setError(response.error);
          return;
        }
        if (response.data) {
          setOrders((prev) => [...prev, response.data]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create order");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updateOrder = useCallback(
    async (id: string, payload: Partial<ordersApi.CreateOrderPayload>) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await ordersApi.updateOrder(id, payload);
        if (response.error) {
          setError(response.error);
          return;
        }
        if (response.data) {
          setOrders((prev) =>
            prev.map((o) => (o._id === id ? response.data : o))
          );
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update order");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const deleteOrder = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ordersApi.deleteOrder(id);
      if (response.error) {
        setError(response.error);
        return;
      }
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete order");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    orders,
    isLoading,
    error,
    fetchOrders,
    fetchOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    clearError,
  };
}
