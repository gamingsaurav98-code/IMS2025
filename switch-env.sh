#!/bin/bash

# Switch between Local and Production environments

case "$1" in
  local)
    echo "🔄 Switching to LOCAL development environment..."
    
    # Backend
    echo "PORT=3000" > .env
    echo "MONGODB_URI=mongodb://localhost:27017/IMS202506" >> .env
    echo "JWT_SECRET=dev-secret-key" >> .env
    echo "FRONTEND_URL=http://localhost:3001" >> .env
    echo "NODE_ENV=development" >> .env
    
    # Frontend
    echo "NEXT_PUBLIC_API_URL=http://localhost:3000/api" > frontend/.env.local
    
    echo "✅ Environment switched to LOCAL"
    echo "Run: npm run dev (backend)"
    echo "Run: npm run dev (frontend)"
    ;;
    
  production)
    echo "🔄 Switching to PRODUCTION environment..."
    
    if [ ! -f ".env.production" ]; then
      echo "❌ .env.production not found!"
      echo "Please create .env.production with production variables"
      exit 1
    fi
    
    # Backend
    cp .env.production .env
    
    # Frontend
    if [ ! -f "frontend/.env.production" ]; then
      echo "❌ frontend/.env.production not found!"
      exit 1
    fi
    cp frontend/.env.production frontend/.env.local
    
    echo "✅ Environment switched to PRODUCTION"
    ;;
    
  *)
    echo "Usage: $0 [local|production]"
    echo ""
    echo "local      - Switch to local development"
    echo "production - Switch to production (requires .env.production files)"
    echo ""
    echo "Examples:"
    echo "  $0 local"
    echo "  $0 production"
    ;;
esac
