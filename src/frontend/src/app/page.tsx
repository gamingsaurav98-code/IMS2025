import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="rounded-lg bg-white p-8 shadow">
          <h1 className="text-3xl font-semibold">IMS2025 Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome to the IMS2025 admin dashboard. Use the links below to
            manage the app.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Link
              href="/dashboard/products"
              className="rounded-lg border bg-white p-4 text-center shadow hover:shadow-md"
            >
              <div className="text-lg font-medium">Products</div>
              <div className="mt-1 text-sm text-gray-500">
                Add, edit and remove products
              </div>
            </Link>
            <Link
              href="/dashboard/customers"
              className="rounded-lg border bg-white p-4 text-center shadow hover:shadow-md"
            >
              <div className="text-lg font-medium">Customers</div>
              <div className="mt-1 text-sm text-gray-500">Manage customers</div>
            </Link>
            <Link
              href="/dashboard/orders"
              className="rounded-lg border bg-white p-4 text-center shadow hover:shadow-md"
            >
              <div className="text-lg font-medium">Orders</div>
              <div className="mt-1 text-sm text-gray-500">
                View & process orders
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
