import "./globals.css";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "IMS2025 Dashboard",
  description: "Inventory Management System - Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-800 antialiased">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="container mx-auto flex-1 px-4 py-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
