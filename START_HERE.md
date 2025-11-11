# 📌 IMPORTANT - READ FIRST

## Your Backend & Frontend Are Now Connected! ✅

This document contains everything you need to know to start using your IMS2025 application.

---

## 🚀 Quick Start (2 Minutes)

### Have MongoDB Running?

```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Windows
# Start MongoDB service from Services app
# Or: net start MongoDB

# Linux
sudo systemctl start mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env
```

### Terminal 1: Start Backend

```bash
cd c:\xampp\htdocs\classweb\IMS2025
npm run dev
```

### Terminal 2: Start Frontend

```bash
cd c:\xampp\htdocs\classweb\IMS2025\frontend
npm run dev
```

### Open Browser

```
http://localhost:3001
```

**That's it! You're running! 🎉**

---

## 📋 What Was Set Up

### ✅ Backend Connected

- CORS is configured
- Accepts requests from `http://localhost:3001`
- Runs on `http://localhost:3000`
- Routes: `/api/auth`, `/api/products`, `/api/customers`, `/api/orders`

### ✅ Frontend Ready

- 6 API services created for backend communication
- 4 custom hooks created for state management
- 3 example pages created
- All using TypeScript + Tailwind CSS

### ✅ Configuration Done

- `.env` template created (copy to `.env` and fill values)
- `frontend/.env.local` created with API URL
- CORS middleware installed and configured
- JWT authentication ready

---

## 🔑 Key Files You Need to Know

### Backend

- `src/app.js` - Main server (CORS added ✅)
- `.env` - Configuration (create from `.env.example`)

### Frontend

- `frontend/src/lib/api/` - API services
- `frontend/src/hooks/` - Custom hooks
- `frontend/src/app/` - Pages
- `frontend/.env.local` - Configuration (already created ✅)

---

## 📚 Documentation Files

**Start with these, in order:**

1. **This File** (you're reading it) - Overview
2. **QUICKSTART.md** - Fast 5-minute setup
3. **SETUP.md** - Detailed setup & troubleshooting
4. **INTEGRATION_GUIDE.md** - How backend & frontend connect
5. **BACKEND_FRONTEND_CONNECTION.md** - Connection details
6. **COMPLETION_CHECKLIST.md** - Verify everything works
7. **FINAL_SUMMARY.md** - Overview of changes
8. **FILES_CREATED.md** - List of all new files

---

## ⚠️ Before You Start

### 1. Check Prerequisites

```bash
node --version    # Should be v18+
npm --version     # Should be v9+
```

### 2. Check MongoDB

```bash
# Try connecting
mongosh  # or mongo
# Should open MongoDB shell
```

### 3. Create .env File

```bash
cd c:\xampp\htdocs\classweb\IMS2025
copy .env.example .env
# Edit .env with your settings
```

### 4. Check package.json

```bash
grep cors package.json
# Should show: "cors": "^2.8.5"
```

---

## ✅ Verification Checklist

Before running, check:

- [ ] Node.js v18+ installed
- [ ] MongoDB running or Atlas connection available
- [ ] `.env` file created in backend root
- [ ] `frontend/.env.local` exists
- [ ] `MONGODB_URI` in `.env` is correct
- [ ] `FRONTEND_URL` in `.env` is `http://localhost:3001`
- [ ] `NEXT_PUBLIC_API_URL` in `frontend/.env.local` is `http://localhost:3000/api`

---

## 🚀 Start Command

### Option 1: Individual Terminals (Recommended)

**Terminal 1:**

```bash
cd c:\xampp\htdocs\classweb\IMS2025
npm run dev
```

**Terminal 2:**

```bash
cd c:\xampp\htdocs\classweb\IMS2025\frontend
npm run dev
```

### Option 2: Using Helper Scripts

**Windows:**

```bash
# In project root
setup.bat
```

**Linux/Mac:**

```bash
# In project root
bash setup.sh
```

**Node.js:**

```bash
# In project root
node start-guide.js
```

---

## 🌐 URLs After Starting

| Service  | URL                       | Purpose        |
| -------- | ------------------------- | -------------- |
| Frontend | http://localhost:3001     | Main app       |
| Backend  | http://localhost:3000     | API server     |
| API      | http://localhost:3000/api | REST endpoints |

---

## 🔌 How to Use

### Example 1: Fetch Products

```typescript
"use client";

import { useProducts } from "@/hooks";
import { useEffect } from "react";

export default function ProductList() {
  const { products, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {products.map((p) => (
        <div key={p._id}>{p.name}</div>
      ))}
    </div>
  );
}
```

### Example 2: Login User

```typescript
"use client";

import { useAuth } from "@/hooks";

export default function LoginForm() {
  const { login } = useAuth();

  const handleLogin = async () => {
    await login("user@example.com", "password123");
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

---

## 📊 API Endpoints

### Without Authentication (Public)

- `GET /api/products` - Get all products
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### With Authentication Required

- `POST /api/products` - Create product
- `GET /api/customers` - Get customers
- `POST /api/customers` - Create customer
- `GET /api/orders` - Get orders
- `POST /api/orders` - Create order

---

## 🐛 Common Issues

### Issue: CORS Error

```
Access to XMLHttpRequest blocked
```

**Fix**:

1. Check `FRONTEND_URL` in `.env` is `http://localhost:3001`
2. Restart backend

### Issue: Cannot Connect to MongoDB

```
MongoServerError: connect ECONNREFUSED
```

**Fix**:

1. Start MongoDB
2. Or update `MONGODB_URI` in `.env` to Atlas URL

### Issue: API Returns 401

```
Unauthorized
```

**Fix**:

1. Login first to get token
2. Token stored in localStorage automatically

### Issue: Port Already in Use

```
Error: listen EADDRINUSE :::3000
```

**Fix**:

1. Change `PORT` in `.env`
2. Or kill process on that port

---

## 📁 Project Structure

```
IMS2025/
├── src/                          # Backend code
│   ├── app.js                    # ✅ CORS configured
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── ...
│
├── frontend/                     # Frontend code
│   ├── src/
│   │   ├── lib/api/              # ✅ 6 API services
│   │   ├── hooks/                # ✅ 4 custom hooks
│   │   ├── app/                  # ✅ 3 example pages
│   │   └── ...
│   └── package.json
│
├── .env.example                  # ✅ Backend config template
├── package.json
│
├── frontend/
│   ├── .env.local                # ✅ Frontend config
│   ├── .env.example              # ✅ Frontend template
│   └── package.json
│
└── Documentation/
    ├── QUICKSTART.md             # ✅ Start here
    ├── SETUP.md                  # ✅ Detailed setup
    ├── INTEGRATION_GUIDE.md      # ✅ Connection details
    └── ... (more files)
```

---

## 🧪 Test the Connection

### Test 1: Backend Health

```bash
curl http://localhost:3000
```

Should return app info

### Test 2: Products API

```bash
curl http://localhost:3000/api/products
```

Should return products (empty array if new)

### Test 3: Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass"}'
```

---

## 💾 Environment Setup

### Backend (.env)

Create this file:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/IMS202506
JWT_SECRET=your-secret-key-here
FRONTEND_URL=http://localhost:3001
NAME=IMS2025
VERSION=0.1.0
```

### Frontend (.env.local)

Already created with:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

## 📖 Next Steps

1. ✅ Ensure MongoDB is running
2. ✅ Create `.env` file (backend)
3. ✅ Start backend: `npm run dev`
4. ✅ Start frontend: `npm run dev` (in frontend folder)
5. ✅ Open `http://localhost:3001`
6. ✅ Read `QUICKSTART.md` for more details

---

## 💡 Tips

- **Save files**: Changes auto-reload in dev mode
- **Debug**: Use browser DevTools (F12)
- **Network**: Check Network tab to see API calls
- **Console**: Check for JavaScript errors
- **Terminal**: Backend/Frontend logs show errors

---

## 🆘 Need Help?

1. **Quick Start Issues**: Read `QUICKSTART.md`
2. **Setup Issues**: Read `SETUP.md`
3. **Integration Issues**: Read `INTEGRATION_GUIDE.md`
4. **Verify Setup**: Read `COMPLETION_CHECKLIST.md`
5. **See What Changed**: Read `FILES_CREATED.md`

---

## ✨ What Works Out of Box

- ✅ User Registration
- ✅ User Login
- ✅ Product CRUD
- ✅ Customer CRUD
- ✅ Order CRUD
- ✅ JWT Authentication
- ✅ Error Handling
- ✅ Loading States
- ✅ TypeScript Support
- ✅ Tailwind CSS Styling

---

## 🎯 Ready?

```bash
# Terminal 1
npm run dev

# Terminal 2 (new terminal)
cd frontend && npm run dev
```

Then open: **http://localhost:3001**

---

## 📞 Support Resources

- Backend Routes: `src/routes/`
- API Services: `frontend/src/lib/api/`
- Custom Hooks: `frontend/src/hooks/`
- Example Pages: `frontend/src/app/`
- Documentation: All `.md` files in root

---

## ✅ You're Ready!

Everything is set up. Just need to:

1. Start both servers
2. Open http://localhost:3001
3. Start building!

**Happy Coding! 🚀**

---

**Created**: November 11, 2025  
**Status**: ✅ Complete  
**Version**: 1.0
