#!/bin/bash

echo "🚀 IMS2025 Setup Script"
echo "======================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Backend setup
echo "📦 Setting up Backend..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Backend installation failed"
    exit 1
fi

# Check if cors is installed, if not install it
if ! grep -q '"cors"' package.json; then
    echo "📥 Installing CORS..."
    npm install cors
fi

echo "✅ Backend setup complete"
echo ""

# Frontend setup
echo "📦 Setting up Frontend..."
cd frontend

npm install

if [ $? -ne 0 ]; then
    echo "❌ Frontend installation failed"
    exit 1
fi

echo "✅ Frontend setup complete"
echo ""

# Back to root
cd ..

echo "🎉 Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Configure backend .env file (copy from .env.example if exists)"
echo "2. Configure frontend .env.local file"
echo "3. Ensure MongoDB is running"
echo ""
echo "🚀 To start development:"
echo "Terminal 1: npm run dev (backend on :3000)"
echo "Terminal 2: cd frontend && npm run dev (frontend on :3001)"
echo ""
