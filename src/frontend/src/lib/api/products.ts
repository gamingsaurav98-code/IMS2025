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

export const getProducts = async () => {
  return apiCall<Product[]>("/products", { method: "GET" });
};

export const getProductById = async (id: string) => {
  return apiCall<Product>(`/products/${id}`, { method: "GET" });
};

export const createProduct = async (payload: CreateProductPayload) => {
  return apiCall<Product>("/products", { method: "POST", body: payload });
};

export const updateProduct = async (
  id: string,
  payload: Partial<CreateProductPayload>
) => {
  return apiCall<Product>(`/products/${id}`, { method: "PUT", body: payload });
};

export const deleteProduct = async (id: string) => {
  return apiCall(`/products/${id}`, { method: "DELETE" });
};
