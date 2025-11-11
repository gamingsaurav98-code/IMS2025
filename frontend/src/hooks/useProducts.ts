/**
 * Products Hook
 */

"use client";

import { useState, useCallback, useEffect } from "react";
import * as productsApi from "@/lib/api/products";

interface UseProductsReturn {
  products: productsApi.Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: string) => Promise<productsApi.Product | null>;
  createProduct: (payload: productsApi.CreateProductPayload) => Promise<void>;
  updateProduct: (
    id: string,
    payload: Partial<productsApi.CreateProductPayload>
  ) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  clearError: () => void;
}

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<productsApi.Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await productsApi.getProducts();
      if (response.error) {
        setError(response.error);
        return;
      }
      if (response.data) {
        setProducts(Array.isArray(response.data) ? response.data : []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchProductById = useCallback(async (id: string) => {
    try {
      const response = await productsApi.getProductById(id);
      if (response.error) {
        setError(response.error);
        return null;
      }
      return response.data || null;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch product");
      return null;
    }
  }, []);

  const createProduct = useCallback(
    async (payload: productsApi.CreateProductPayload) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await productsApi.createProduct(payload);
        if (response.error) {
          setError(response.error);
          return;
        }
        if (response.data) {
          setProducts((prev) => [...prev, response.data]);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to create product"
        );
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updateProduct = useCallback(
    async (id: string, payload: Partial<productsApi.CreateProductPayload>) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await productsApi.updateProduct(id, payload);
        if (response.error) {
          setError(response.error);
          return;
        }
        if (response.data) {
          setProducts((prev) =>
            prev.map((p) => (p._id === id ? response.data : p))
          );
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to update product"
        );
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const deleteProduct = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await productsApi.deleteProduct(id);
      if (response.error) {
        setError(response.error);
        return;
      }
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    products,
    isLoading,
    error,
    fetchProducts,
    fetchProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    clearError,
  };
}
