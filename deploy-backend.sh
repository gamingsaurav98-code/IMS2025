#!/bin/bash

# Deploy to Railway (Backend)
# Prerequisites: Railway CLI installed, logged in

echo "🚀 Deploying Backend to Railway..."
echo ""

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
    echo "❌ Error: .env.production file not found"
    echo "Please create .env.production with your production environment variables"
    exit 1
fi

# Link to Railway project
echo "Linking to Railway project..."
railway link

# Set environment variables from .env.production
echo "Setting environment variables..."
while IFS='=' read -r key value; do
    if [[ ! -z "$key" && ! "$key" =~ ^# ]]; then
        railway variables set "$key" "$value"
    fi
done < .env.production

# Deploy
echo "Deploying..."
git push origin main

echo ""
echo "✅ Deployment initiated!"
echo "Check your Railway dashboard for deployment status"
echo ""
