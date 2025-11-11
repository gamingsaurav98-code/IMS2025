"use client";
import { useCustomers, useAuth } from "@/hooks";
import { useState, useEffect } from "react";

export default function CustomersPage() {
  const { user } = useAuth() as any;
  const { customers, isLoading, error, createCustomer, fetchCustomers } =
    useCustomers();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    await createCustomer({ name, email, phone });
    setName("");
    setEmail("");
    setPhone("");
    setShowForm(false);
  };

  useEffect(() => {
    if (user) {
      fetchCustomers();
    }
  }, [user, fetchCustomers]);

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Customers</h1>
        <div>
          <button
            onClick={() => setShowForm((s) => !s)}
            className="rounded-md bg-green-600 px-3 py-1 text-sm font-semibold text-white hover:bg-green-700"
          >
            {showForm ? "Cancel" : "New Customer"}
          </button>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="mb-4 rounded-lg border bg-white p-4"
        >
          <div className="grid gap-2 sm:grid-cols-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="col-span-2 rounded-md border px-3 py-2"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              className="rounded-md border px-3 py-2"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              className="col-span-full rounded-md border px-3 py-2"
            />
            <div className="col-span-full mt-2">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      )}

      {!user && (
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          Please{" "}
          <a href="/auth/login" className="text-indigo-600">
            sign in
          </a>{" "}
          to view customers.
        </div>
      )}
      {user && isLoading && (
        <div className="text-gray-500">Loading customers…</div>
      )}
      {user && error && <div className="text-red-600">{error}</div>}

      {user && (
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          {customers.length === 0 ? (
            <div className="text-gray-600">No customers yet.</div>
          ) : (
            <ul className="space-y-3">
              {customers.map((c) => (
                <li key={c._id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-sm text-gray-500">{c.email}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
