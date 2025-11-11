"use client";
import React, { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks";

export default function ProductsPage() {
  const { products, isLoading, error, createProduct, deleteProduct } =
    useProducts();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || price === "") return;
    await createProduct({
      name,
      description,
      price: Number(price),
      quantity: 1,
    });
    setName("");
    setPrice("");
    setDescription("");
    setShowForm(false);
  };

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowForm((s) => !s)}
            className="rounded-md bg-green-600 px-3 py-1 text-sm font-semibold text-white hover:bg-green-700"
          >
            {showForm ? "Cancel" : "New Product"}
          </button>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="mb-6 rounded-lg border bg-white p-4"
        >
          <div className="grid gap-3 sm:grid-cols-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="col-span-2 rounded-md border px-3 py-2"
            />
            <input
              value={price}
              onChange={(e) =>
                setPrice(e.target.value === "" ? "" : Number(e.target.value))
              }
              placeholder="Price"
              type="number"
              className="rounded-md border px-3 py-2"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="col-span-full rounded-md border px-3 py-2 mt-2"
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

      {isLoading && <div className="text-gray-500">Loading products…</div>}
      {error && <div className="text-red-600">{error}</div>}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.length === 0 && (
            <div className="text-gray-600">No products yet.</div>
          )}
          {products.map((p) => (
            <div key={p._id} className="relative">
              <ProductCard product={p} />
              <button
                onClick={() => deleteProduct(p._id)}
                className="absolute right-2 top-2 rounded bg-red-500 px-2 py-1 text-xs text-white"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
