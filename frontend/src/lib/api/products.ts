/**
 * Products API Service
 */

import apiCall from "./client";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  images?: string[];
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category?: string;
}

/**
 * Get all products
 */
export const getProducts = async () => {
  return apiCall<Product[]>("/products", {
    method: "GET",
  });
};

/**
 * Get product by ID
 */
export const getProductById = async (id: string) => {
  return apiCall<Product>(`/products/${id}`, {
    method: "GET",
  });
};

/**
 * Create a new product
 */
export const createProduct = async (payload: CreateProductPayload) => {
  return apiCall<Product>("/products", {
    method: "POST",
    body: payload,
  });
};

/**
 * Update product
 */
export const updateProduct = async (
  id: string,
  payload: Partial<CreateProductPayload>
) => {
  return apiCall<Product>(`/products/${id}`, {
    method: "PUT",
    body: payload,
  });
};

/**
 * Delete product
 */
export const deleteProduct = async (id: string) => {
  return apiCall(`/products/${id}`, {
    method: "DELETE",
  });
};
