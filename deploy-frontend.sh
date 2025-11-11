#!/bin/bash

# Deploy to Vercel (Frontend)
# Prerequisites: Vercel CLI installed, logged in

echo "🚀 Deploying Frontend to Vercel..."
echo ""

cd frontend

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
    echo "❌ Error: .env.production file not found"
    echo "Please create .env.production with your production environment variables"
    exit 1
fi

# Deploy to Vercel
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo "Check your Vercel dashboard for deployment details"
echo ""
