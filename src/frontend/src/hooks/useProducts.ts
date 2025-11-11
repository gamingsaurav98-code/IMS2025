"use client";
import { useState, useCallback, useEffect } from "react";
import * as productsApi from "@/lib/api/products";

export function useProducts() {
  const [products, setProducts] = useState<productsApi.Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await productsApi.getProducts();
      if (response.error) {
        setError(response.error);
        return;
      }
      if (response.data)
        setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setIsLoading(false);
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
        if (response.data)
          setProducts((prev) =>
            response.data ? [...prev, response.data] : prev
          );
      } catch (err: any) {
        setError(err.message || "Failed to create product");
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
        if (response.data)
          setProducts((prev) =>
            prev.map((p) =>
              p._id === id ? (response.data as productsApi.Product) : p
            )
          );
      } catch (err: any) {
        setError(err.message || "Failed to update product");
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
    } catch (err: any) {
      setError(err.message || "Failed to delete product");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    isLoading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
