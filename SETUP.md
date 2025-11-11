# IMS2025 - Inventory Management System

A full-stack MERN (MongoDB, Express, React/Next.js, Node.js) application for inventory management with user authentication, product management, customer management, and order tracking.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB running locally or MongoDB Atlas connection string

### Backend Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Create `.env` file in root directory**

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/IMS202506
   JWT_SECRET=your-super-secret-jwt-key-change-this
   FRONTEND_URL=http://localhost:3001
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   EMAIL_API_KEY=your-email-api-key
   NAME=IMS2025
   VERSION=0.1.0
   ```

3. **Start backend server**
   ```bash
   npm run dev
   # Server runs on http://localhost:3000
   ```

### Frontend Setup

1. **Navigate to frontend**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env.local` file**

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

4. **Start frontend server**
   ```bash
   npm run dev
   # Frontend runs on http://localhost:3001
   ```

## 📁 Project Structure

### Backend (`src/`)

```
src/
├── app.js                 # Express app entry point
├── config/               # Configuration files
│   ├── config.js        # Environment config
│   ├── database.js      # MongoDB connection
│   └── cloudinary.js    # Cloudinary setup
├── controllers/         # API business logic
├── models/              # MongoDB schemas
├── routes/              # API endpoints
├── services/            # Service layer
├── middlewares/         # Express middlewares
└── utils/               # Utility functions
```

### Frontend (`frontend/`)

```
frontend/
├── src/
│   ├── app/             # Next.js pages & layouts
│   ├── components/      # React components
│   ├── hooks/           # Custom React hooks
│   ├── lib/api/         # API service layer
│   └── __tests__/       # Test files
├── public/              # Static assets
├── package.json
└── tsconfig.json
```

## 🔌 API Integration

### How Frontend Connects to Backend

1. **API Client** (`frontend/src/lib/api/client.ts`)

   - Centralized fetch wrapper
   - Automatic JWT token injection
   - Error handling

2. **API Services**

   - `auth.ts` - Authentication
   - `products.ts` - Products
   - `customers.ts` - Customers
   - `orders.ts` - Orders

3. **Custom Hooks**
   - `useAuth()` - Auth state management
   - `useProducts()` - Product CRUD + state
   - `useCustomers()` - Customer CRUD + state
   - `useOrders()` - Order CRUD + state

### Example Usage

```typescript
"use client";

import { useProducts } from "@/hooks";

export default function Products() {
  const { products, isLoading, fetchProducts } = useProducts();

  return (
    <div>
      {products.map((p) => (
        <div key={p._id}>{p.name}</div>
      ))}
    </div>
  );
}
```

## 📚 API Endpoints

### Authentication

| Method | Endpoint                    | Auth | Description            |
| ------ | --------------------------- | ---- | ---------------------- |
| POST   | `/api/auth/register`        | ❌   | Register new user      |
| POST   | `/api/auth/login`           | ❌   | Login user             |
| POST   | `/api/auth/logout`          | ✅   | Logout user            |
| POST   | `/api/auth/forgot-password` | ❌   | Request password reset |
| POST   | `/api/auth/reset-password`  | ❌   | Reset password         |

### Products

| Method | Endpoint            | Auth | Description       |
| ------ | ------------------- | ---- | ----------------- |
| GET    | `/api/products`     | ❌   | Get all products  |
| GET    | `/api/products/:id` | ❌   | Get product by ID |
| POST   | `/api/products`     | ✅   | Create product    |
| PUT    | `/api/products/:id` | ✅   | Update product    |
| DELETE | `/api/products/:id` | ✅   | Delete product    |

### Customers

| Method | Endpoint             | Auth | Description        |
| ------ | -------------------- | ---- | ------------------ |
| GET    | `/api/customers`     | ✅   | Get all customers  |
| GET    | `/api/customers/:id` | ✅   | Get customer by ID |
| POST   | `/api/customers`     | ✅   | Create customer    |
| PUT    | `/api/customers/:id` | ✅   | Update customer    |
| DELETE | `/api/customers/:id` | ✅   | Delete customer    |

### Orders

| Method | Endpoint          | Auth | Description     |
| ------ | ----------------- | ---- | --------------- |
| GET    | `/api/orders`     | ✅   | Get all orders  |
| GET    | `/api/orders/:id` | ✅   | Get order by ID |
| POST   | `/api/orders`     | ✅   | Create order    |
| PUT    | `/api/orders/:id` | ✅   | Update order    |
| DELETE | `/api/orders/:id` | ✅   | Delete order    |

## 🧪 Testing

### Run Backend Tests

```bash
npm test
```

### Run Frontend Tests

```bash
cd frontend
npm test
```

### Run Specific Test File

```bash
npm test -- --testPathPattern=auth
```

## 🛠 Technologies

### Backend

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Cloudinary** - Image storage
- **Multer** - File uploads
- **Nodemon** - Development server

### Frontend

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Jest** - Testing
- **React Testing Library** - Component testing

## 📝 Key Features

✅ User Authentication (JWT)  
✅ Product Management (CRUD)  
✅ Customer Management (CRUD)  
✅ Order Management (CRUD)  
✅ Image Upload (Cloudinary)  
✅ Email Notifications  
✅ Role-Based Access Control  
✅ CORS Support  
✅ Error Handling  
✅ TypeScript Support

## 🔐 Security Features

- JWT token-based authentication
- Password hashing
- CORS protection
- Environment variable management
- Input validation
- Error message sanitization

## 📖 Documentation

- [Integration Guide](./INTEGRATION_GUIDE.md) - Detailed integration setup
- [Backend README](./README.md) - Backend specific documentation
- [Frontend README](./frontend/README.md) - Frontend specific documentation

## 🐛 Troubleshooting

### CORS Error in Console

```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution**: Check `FRONTEND_URL` in backend `.env` matches your frontend URL.

### Cannot connect to MongoDB

```
MongoServerError: connect ECONNREFUSED
```

**Solution**: Ensure MongoDB is running or update `MONGODB_URI` in `.env`.

### API returns 401 Unauthorized

```
Error: {"error": "Unauthorized"}
```

**Solution**: Check if JWT token is stored in localStorage and not expired.

### NEXT_PUBLIC_API_URL not working

```
Cannot access undefined API URL
```

**Solution**: Ensure `.env.local` exists in frontend directory with `NEXT_PUBLIC_API_URL`.

## 📞 Support

For issues or questions, please check:

1. Environment variables are correctly set
2. Both servers are running (backend on 3000, frontend on 3001)
3. MongoDB is connected
4. Check browser console for specific errors

## 📄 License

MIT License - Feel free to use this project for learning and development.
