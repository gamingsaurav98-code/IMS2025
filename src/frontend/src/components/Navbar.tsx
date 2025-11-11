import Link from "next/link";
import { useAuth } from "@/hooks";

export default function Navbar() {
  const { user, logout } = useAuth() as any;

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-semibold text-indigo-600">
          IMS2025
        </Link>
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                href="/dashboard/products"
                className="text-sm font-medium text-gray-700 hover:text-indigo-600"
              >
                Products
              </Link>
              <Link
                href="/dashboard/customers"
                className="text-sm font-medium text-gray-700 hover:text-indigo-600"
              >
                Customers
              </Link>
              <Link
                href="/dashboard/orders"
                className="text-sm font-medium text-gray-700 hover:text-indigo-600"
              >
                Orders
              </Link>
              <button
                onClick={() => logout()}
                className="ml-4 inline-flex items-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="ml-4 inline-flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
