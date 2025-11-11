# Backend & Frontend Integration Guide

This guide explains how the IMS2025 project is set up with backend and frontend integration.

## Project Structure

```
IMS2025/
├── src/                          # Backend (Node.js/Express)
│   ├── app.js                    # Main server file
│   ├── config/                   # Configuration files
│   ├── controllers/              # API controllers
│   ├── routes/                   # API routes
│   ├── models/                   # MongoDB models
│   ├── services/                 # Business logic
│   ├── middlewares/              # Express middlewares
│   └── utils/                    # Utility functions
└── frontend/                     # Frontend (Next.js)
    ├── src/
    │   ├── app/                  # Next.js app directory
    │   ├── components/           # React components
    │   ├── hooks/                # Custom React hooks
    │   ├── lib/
    │   │   └── api/              # API service layer
    │   └── __tests__/            # Test files
    └── package.json
```

## API Integration

### API Services (`frontend/src/lib/api/`)

The frontend uses a centralized API client setup:

- **`client.ts`** - Base API client with authentication
- **`auth.ts`** - Authentication endpoints
- **`products.ts`** - Product management endpoints
- **`customers.ts`** - Customer management endpoints
- **`orders.ts`** - Order management endpoints

### Custom Hooks (`frontend/src/hooks/`)

Convenient React hooks for consuming APIs:

- **`useAuth`** - User authentication and session management
- **`useProducts`** - Product CRUD operations
- **`useCustomers`** - Customer CRUD operations
- **`useOrders`** - Order CRUD operations

## Backend API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Reset password with token

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (requires auth)
- `PUT /api/products/:id` - Update product (requires auth)
- `DELETE /api/products/:id` - Delete product (requires auth)

### Customers

- `GET /api/customers` - Get all customers (requires auth)
- `GET /api/customers/:id` - Get customer by ID (requires auth)
- `POST /api/customers` - Create customer (requires auth)
- `PUT /api/customers/:id` - Update customer (requires auth)
- `DELETE /api/customers/:id` - Delete customer (requires auth)

### Orders

- `GET /api/orders` - Get all orders (requires auth)
- `GET /api/orders/:id` - Get order by ID (requires auth)
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

## Environment Configuration

### Backend (.env)

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/IMS202506
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3001
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
EMAIL_API_KEY=your-email-api-key
```

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Running the Project

### Start Backend Server

```bash
cd IMS2025
npm install
npm run dev
# Server runs on http://localhost:3000
```

### Start Frontend Server (in another terminal)

```bash
cd IMS2025/frontend
npm install
npm run dev
# Frontend runs on http://localhost:3001
```

## Testing

### Backend Tests

```bash
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## Key Features

1. **Centralized API Client** - All API calls go through a single client for consistency
2. **Authentication Management** - Token stored in localStorage, automatically included in headers
3. **Error Handling** - Consistent error handling across all API calls
4. **Loading States** - Track loading and error states for UI feedback
5. **CORS Support** - Backend configured to accept requests from frontend
6. **TypeScript** - Full type safety in frontend

## Using API Services in Components

### Example: Using the Products Hook

```typescript
"use client";

import { useProducts } from "@/hooks";
import { useEffect } from "react";

export default function ProductList() {
  const { products, isLoading, error, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}
```

## Troubleshooting

### CORS Errors

- Ensure `FRONTEND_URL` is correctly set in backend .env
- Verify frontend is running on the port specified in CORS config
- Check browser console for specific CORS errors

### API Not Responding

- Verify both backend and frontend servers are running
- Check `NEXT_PUBLIC_API_URL` in frontend .env.local
- Ensure backend is on correct port (default 3000)

### Authentication Issues

- Check that authToken is stored in localStorage
- Verify JWT_SECRET is set in backend .env
- Check token expiration and refresh logic
