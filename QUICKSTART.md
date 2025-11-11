# Quick Start Guide - IMS2025

## 🎯 Overview

This is a **Full-Stack Inventory Management System** built with:

- **Backend**: Node.js + Express + MongoDB
- **Frontend**: Next.js + TypeScript + Tailwind CSS
- **Testing**: Jest + React Testing Library

## 📋 Prerequisites

Before starting, ensure you have:

- ✅ Node.js v18+ ([Download](https://nodejs.org/))
- ✅ npm or yarn
- ✅ MongoDB ([Local](https://docs.mongodb.com/manual/installation/) or [Atlas](https://www.mongodb.com/cloud/atlas))
- ✅ Git

## 🚀 Step-by-Step Setup

### Step 1: Clone/Navigate to Project

```bash
cd c:\xampp\htdocs\classweb\IMS2025
```

### Step 2: Install Backend Dependencies

```bash
npm install
```

### Step 3: Setup Backend Environment

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/IMS202506
JWT_SECRET=your-secret-key-here
FRONTEND_URL=http://localhost:3001
NAME=IMS2025
VERSION=0.1.0
```

For Cloudinary setup (optional):

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Step 4: Start Backend Server

```bash
npm run dev
```

You should see: `Server is running on port 3000....`

### Step 5: Setup Frontend (New Terminal)

```bash
cd frontend
npm install
```

### Step 6: Setup Frontend Environment

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Step 7: Start Frontend Server

```bash
npm run dev
```

You should see: `ready - started server on 0.0.0.0:3001`

## ✅ Verification

### Check if everything is working:

1. **Backend Health Check**

   ```bash
   curl http://localhost:3000
   ```

   Expected response:

   ```json
   {
     "name": "IMS2025",
     "version": "0.1.0",
     "port": 3000
   }
   ```

2. **Frontend Access**

   - Open browser: `http://localhost:3001`
   - You should see the landing page

3. **API Connection Test**
   ```bash
   curl http://localhost:3000/api/products
   ```
   Should return products list (or error if no products yet)

## 📱 Using the Application

### Admin Features

1. **Products Management**

   - View all products
   - Add new product
   - Edit product details
   - Delete product

2. **Customer Management**

   - View all customers
   - Add new customer
   - Update customer info
   - Delete customer

3. **Order Management**
   - Create orders
   - View order history
   - Update order status

### User Features

1. **Authentication**

   - Register new account
   - Login with email/password
   - Logout
   - Password reset

2. **View Products**
   - Browse available products
   - Search products
   - View product details

## 🧪 Running Tests

### Frontend Tests

```bash
cd frontend
npm test
```

### Backend Tests

```bash
npm test
```

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"

```
MongoServerError: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution**:

- Windows: Start MongoDB service
- Mac: `brew services start mongodb-community`
- Linux: `sudo systemctl start mongod`
- Or use MongoDB Atlas (cloud database)

### "CORS Policy Error in Browser"

```
Access to XMLHttpRequest at 'http://localhost:3000/api/...'
from origin 'http://localhost:3001' has been blocked by CORS policy
```

**Solution**:

- Verify `FRONTEND_URL` in backend `.env` matches your frontend URL
- Restart backend server after changing `.env`

### "Cannot find module 'react'"

**Solution**: Install dependencies in frontend

```bash
cd frontend
npm install
```

### "Port 3000 already in use"

```
Error: listen EADDRINUSE :::3000
```

**Solution**:

- Find process: `netstat -ano | findstr :3000` (Windows)
- Kill process: `taskkill /PID <PID> /F`
- Or change port in `.env`: `PORT=3001`

### "Cannot GET /"

Backend not running or wrong URL
**Solution**:

- Verify backend is running: `npm run dev`
- Check backend URL in frontend `.env.local`

## 📚 Project Structure Overview

```
IMS2025/
├── src/                    # Backend code
│   ├── controllers/        # Business logic
│   ├── models/             # Database schemas
│   ├── routes/             # API endpoints
│   └── services/           # Service layer
├── frontend/               # Frontend code
│   └── src/
│       ├── app/            # Pages
│       ├── components/     # React components
│       ├── hooks/          # Custom hooks
│       └── lib/api/        # API services
├── .env                    # Backend config
├── package.json            # Backend dependencies
└── frontend/
    ├── .env.local          # Frontend config
    └── package.json        # Frontend dependencies
```

## 🔑 Key Endpoints

### Authentication

- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Products

- `GET /api/products` - List products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Customers

- `GET /api/customers` - List customers
- `POST /api/customers` - Create customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Orders

- `GET /api/orders` - List orders
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

## 💾 Database Schema Overview

### Users (Authentication)

- email (unique)
- password (hashed)
- name
- role (admin/user)

### Products

- name
- description
- price
- quantity
- images
- category

### Customers

- name
- email (unique)
- phone
- address
- city
- state
- zipCode

### Orders

- customerId (reference)
- items (products array)
- totalAmount
- status (pending/completed/cancelled)
- createdAt
- updatedAt

## 🚀 Next Steps

1. **Explore the Code**

   - Check `src/routes/` for API endpoints
   - Review `frontend/src/lib/api/` for API services
   - Look at `frontend/src/hooks/` for custom hooks

2. **Customize Styling**

   - Edit `frontend/src/app/globals.css` for global styles
   - Tailwind CSS classes in components

3. **Add Features**

   - Create new controllers in `src/controllers/`
   - Add routes in `src/routes/`
   - Create corresponding frontend pages in `frontend/src/app/`

4. **Deploy**
   - Backend: Deploy to Heroku, Railway, or Vercel
   - Frontend: Deploy to Vercel, Netlify

## 📞 Getting Help

1. Check the [SETUP.md](./SETUP.md) for detailed setup instructions
2. Review [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for API integration details
3. Check browser console for error messages
4. Look at network tab in DevTools to see API requests

## ✨ Happy Coding!

You're all set! Start building your inventory management system.

**Frontend**: http://localhost:3001  
**Backend**: http://localhost:3000  
**API**: http://localhost:3000/api
