/**
 * Customers API Service
 */

import apiCall from "./client";

export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomerPayload {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

/**
 * Get all customers
 */
export const getCustomers = async () => {
  return apiCall<Customer[]>("/customers", {
    method: "GET",
  });
};

/**
 * Get customer by ID
 */
export const getCustomerById = async (id: string) => {
  return apiCall<Customer>(`/customers/${id}`, {
    method: "GET",
  });
};

/**
 * Create a new customer
 */
export const createCustomer = async (payload: CreateCustomerPayload) => {
  return apiCall<Customer>("/customers", {
    method: "POST",
    body: payload,
  });
};

/**
 * Update customer
 */
export const updateCustomer = async (
  id: string,
  payload: Partial<CreateCustomerPayload>
) => {
  return apiCall<Customer>(`/customers/${id}`, {
    method: "PUT",
    body: payload,
  });
};

/**
 * Delete customer
 */
export const deleteCustomer = async (id: string) => {
  return apiCall(`/customers/${id}`, {
    method: "DELETE",
  });
};
