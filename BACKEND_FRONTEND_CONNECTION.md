# Backend & Frontend Connection Summary

## ✅ What Has Been Set Up

### 1. **CORS Support Added to Backend**

- ✅ Installed `cors` package
- ✅ Configured CORS middleware in `src/app.js`
- ✅ CORS accepts requests from `http://localhost:3001` (frontend)

### 2. **API Service Layer Created** (`frontend/src/lib/api/`)

- ✅ `client.ts` - Central API client with JWT token management
- ✅ `auth.ts` - Authentication endpoints
- ✅ `products.ts` - Product CRUD endpoints
- ✅ `customers.ts` - Customer CRUD endpoints
- ✅ `orders.ts` - Order CRUD endpoints

### 3. **Custom React Hooks Created** (`frontend/src/hooks/`)

- ✅ `useAuth()` - Auth state and methods
- ✅ `useProducts()` - Product CRUD with state
- ✅ `useCustomers()` - Customer CRUD with state
- ✅ `useOrders()` - Order CRUD with state

### 4. **Example Pages Created** (`frontend/src/app/`)

- ✅ `auth/login/page.tsx` - Login page with useAuth hook
- ✅ `dashboard/products/page.tsx` - Products list with useProducts hook
- ✅ `dashboard/customers/page.tsx` - Customers list with useCustomers hook

### 5. **Environment Configuration**

- ✅ `frontend/.env.local` - Frontend API URL configuration
- ✅ `.env.example` - Backend config template
- ✅ `frontend/.env.example` - Frontend config template

### 6. **Documentation Created**

- ✅ `QUICKSTART.md` - Quick start guide
- ✅ `SETUP.md` - Comprehensive setup guide
- ✅ `INTEGRATION_GUIDE.md` - Integration details

### 7. **Setup Scripts Created**

- ✅ `setup.sh` - Setup script for Linux/Mac
- ✅ `setup.bat` - Setup script for Windows

---

## 🔌 How Backend & Frontend Connect

### Request Flow:

```
User Browser (Frontend)
    ↓
Next.js Component
    ↓
Custom Hook (useProducts, useAuth, etc.)
    ↓
API Service (products.ts, auth.ts, etc.)
    ↓
API Client (client.ts)
    ↓ [Fetch with JWT Token]
Backend Express Server
    ↓
CORS Middleware
    ↓
Route Handler
    ↓
Database (MongoDB)
```

### Example: Fetching Products

```typescript
// In React Component
"use client";
import { useProducts } from "@/hooks";

export default function Products() {
  const { products, fetchProducts } = useProducts();

  // Calls:
  // useProducts() → useCallback → productsApi.getProducts()
  // → apiCall('/products') → fetch with JWT token
  // → Backend receives at GET /api/products
  // → Returns product data
}
```

---

## 🚀 Starting the Application

### Terminal 1 - Backend:

```bash
cd c:\xampp\htdocs\classweb\IMS2025
npm run dev
# Runs on http://localhost:3000
```

### Terminal 2 - Frontend:

```bash
cd c:\xampp\htdocs\classweb\IMS2025\frontend
npm run dev
# Runs on http://localhost:3001
```

---

## ✅ Quick Verification Checklist

- [ ] Backend running on `http://localhost:3000`
- [ ] Frontend running on `http://localhost:3001`
- [ ] MongoDB is running
- [ ] `.env` file exists in backend root
- [ ] `frontend/.env.local` exists with `NEXT_PUBLIC_API_URL=http://localhost:3000/api`
- [ ] No CORS errors in browser console
- [ ] Can fetch products: `curl http://localhost:3000/api/products`

---

## 📝 Important Files to Know

### Backend Files:

- `src/app.js` - Main server with CORS config
- `src/routes/*.js` - API endpoints
- `src/controllers/*.js` - Business logic
- `.env` - Backend configuration

### Frontend Files:

- `frontend/src/lib/api/client.ts` - API client
- `frontend/src/lib/api/*.ts` - API services
- `frontend/src/hooks/*.ts` - Custom hooks
- `frontend/.env.local` - Frontend configuration

---

## 🔐 Authentication Flow

1. **Login**
   - User submits credentials to `/api/auth/login`
   - Backend returns JWT token
   - Frontend stores token in localStorage
2. **Authenticated Requests**

   - API client automatically adds token to headers
   - Header: `Authorization: Bearer <token>`
   - Backend validates token in middleware

3. **Logout**
   - Frontend removes token from localStorage
   - User redirected to login page

---

## 🧪 Testing the Connection

### Test 1: Backend Health

```bash
curl http://localhost:3000
```

Should return:

```json
{ "name": "IMS2025", "version": "0.1.0", "port": 3000 }
```

### Test 2: Get Products

```bash
curl http://localhost:3000/api/products
```

Should return: Products array or empty

### Test 3: Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

---

## 📊 API Endpoints Summary

| Method | Endpoint             | Auth | Purpose         |
| ------ | -------------------- | ---- | --------------- |
| POST   | `/api/auth/register` | ❌   | Register user   |
| POST   | `/api/auth/login`    | ❌   | Login user      |
| GET    | `/api/products`      | ❌   | Get products    |
| POST   | `/api/products`      | ✅   | Create product  |
| GET    | `/api/customers`     | ✅   | Get customers   |
| POST   | `/api/customers`     | ✅   | Create customer |
| GET    | `/api/orders`        | ✅   | Get orders      |
| POST   | `/api/orders`        | ✅   | Create order    |

---

## 🐛 Common Issues & Solutions

### Issue: CORS Error

```
Access to XMLHttpRequest blocked by CORS policy
```

**Fix**:

- Check `FRONTEND_URL` in `.env` is `http://localhost:3001`
- Restart backend server

### Issue: API Returns 401

```
{"error": "Unauthorized"}
```

**Fix**:

- Token may be expired or missing
- Login again to get new token
- Check localStorage has authToken

### Issue: Cannot Connect to MongoDB

```
MongoServerError: connect ECONNREFUSED
```

**Fix**:

- Start MongoDB service
- Update `MONGODB_URI` in `.env` if needed

### Issue: Port Already in Use

```
Error: listen EADDRINUSE :::3000
```

**Fix**:

- Kill process on port 3000
- Or change `PORT` in `.env`

---

## 📦 Dependencies Installed

### Backend:

- ✅ `cors` - CORS support (just installed)
- ✅ `express` - Web framework
- ✅ `mongoose` - MongoDB ODM
- ✅ `jsonwebtoken` - JWT authentication
- ✅ `bcryptjs` - Password hashing
- ✅ `multer` - File uploads
- ✅ `cloudinary` - Image storage

### Frontend:

- ✅ `next` - React framework
- ✅ `react` - UI library
- ✅ `typescript` - Type safety
- ✅ `tailwindcss` - Styling
- ✅ `jest` - Testing

---

## 🎯 Next Steps

1. **Run the application**

   ```bash
   # Terminal 1
   npm run dev

   # Terminal 2
   cd frontend && npm run dev
   ```

2. **Test the connection**

   - Go to `http://localhost:3001`
   - Try to login or register
   - Check browser console for errors

3. **Add more features**

   - Create new pages in `frontend/src/app/`
   - Use existing hooks and API services
   - Or create new services for new endpoints

4. **Deploy when ready**
   - Backend: Heroku, Railway, Vercel
   - Frontend: Vercel, Netlify

---

## 📖 Documentation Files

- **QUICKSTART.md** - Quick 5-minute setup
- **SETUP.md** - Detailed setup with troubleshooting
- **INTEGRATION_GUIDE.md** - API integration details
- **This File** - Overview of the connection setup

---

## ✨ You're All Set!

The backend and frontend are now fully connected:

- ✅ CORS is configured
- ✅ API services are ready
- ✅ Custom hooks are available
- ✅ Environment is configured
- ✅ Documentation is complete

**Start building!** 🚀
