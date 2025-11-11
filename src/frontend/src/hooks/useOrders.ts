"use client";
import { useState, useCallback } from "react";
import * as ordersApi from "@/lib/api/orders";

export function useOrders() {
  const [orders, setOrders] = useState<ordersApi.Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ordersApi.getOrders();
      if (response.error) {
        setError(response.error);
        return;
      }
      if (response.data)
        setOrders(Array.isArray(response.data) ? response.data : []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch orders");
    } finally {
      setIsLoading(false);
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
        if (response.data)
          setOrders((prev) =>
            response.data ? [...prev, response.data] : prev
          );
      } catch (err: any) {
        setError(err.message || "Failed to create order");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { orders, isLoading, error, fetchOrders, createOrder };
}
