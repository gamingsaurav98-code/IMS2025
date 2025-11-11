"use client";
import { useOrders } from "@/hooks";
import { useState } from "react";

export default function OrdersPage() {
  const { orders, isLoading, error, createOrder } = useOrders();
  const [showForm, setShowForm] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [itemsJson, setItemsJson] = useState("[]");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const items = JSON.parse(itemsJson);
      const totalAmount = items.reduce(
        (sum: number, it: any) => sum + (it.price || 0) * (it.quantity || 1),
        0
      );
      await createOrder({ customerId, items, totalAmount });
      setCustomerId("");
      setItemsJson("[]");
      setShowForm(false);
    } catch (err) {
      console.error("Invalid items JSON", err);
    }
  };

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <div>
          <button
            onClick={() => setShowForm((s) => !s)}
            className="rounded-md bg-green-600 px-3 py-1 text-sm font-semibold text-white hover:bg-green-700"
          >
            {showForm ? "Cancel" : "New Order"}
          </button>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="mb-4 rounded-lg border bg-white p-4"
        >
          <div className="grid gap-2">
            <input
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              placeholder="Customer ID"
              className="rounded-md border px-3 py-2"
            />
            <textarea
              value={itemsJson}
              onChange={(e) => setItemsJson(e.target.value)}
              rows={6}
              className="rounded-md border px-3 py-2"
            />
            <div className="mt-2">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Create Order
              </button>
            </div>
          </div>
        </form>
      )}

      {isLoading && <div className="text-gray-500">Loading orders…</div>}
      {error && <div className="text-red-600">{error}</div>}

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        {orders.length === 0 ? (
          <div className="text-gray-600">No orders yet.</div>
        ) : (
          <ul className="space-y-3">
            {orders.map((o) => (
              <li key={o._id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Order #{o._id}</div>
                  <div className="text-sm text-gray-500">
                    Total: ${o.totalAmount}
                  </div>
                </div>
                <div className="text-sm text-gray-500">{o.status}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
