import apiCall from "./client";

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderPayload {
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
}

export const getOrders = async () => {
  return apiCall<Order[]>("/orders", { method: "GET" });
};

export const getOrderById = async (id: string) => {
  return apiCall<Order>(`/orders/${id}`, { method: "GET" });
};

export const createOrder = async (payload: CreateOrderPayload) => {
  return apiCall<Order>("/orders", { method: "POST", body: payload });
};

export const updateOrder = async (
  id: string,
  payload: Partial<CreateOrderPayload>
) => {
  return apiCall<Order>(`/orders/${id}`, { method: "PUT", body: payload });
};

export const deleteOrder = async (id: string) => {
  return apiCall(`/orders/${id}`, { method: "DELETE" });
};
