"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomers } from "@/hooks";
import Link from "next/link";

export default function CustomersPage() {
  const router = useRouter();
  const { customers, isLoading, error, fetchCustomers, deleteCustomer } =
    useCustomers();

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      await deleteCustomer(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <Link
            href="/dashboard/customers/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Customer
          </Link>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {isLoading && (
          <div className="text-center text-gray-600">Loading...</div>
        )}

        {!isLoading && customers.length === 0 && (
          <div className="text-center text-gray-600">No customers found</div>
        )}

        {!isLoading && customers.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {customers.map((customer) => (
                  <tr key={customer._id}>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {customer.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {customer.phone || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {customer.address || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <Link
                        href={`/dashboard/customers/${customer._id}/edit`}
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(customer._id)}
                        className="inline-block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
