@echo off
REM Deploy to Railway (Backend)
REM Prerequisites: Railway CLI installed, logged in

echo 🚀 Deploying Backend to Railway...
echo.

REM Check if .env.production exists
if not exist ".env.production" (
    echo ❌ Error: .env.production file not found
    echo Please create .env.production with your production environment variables
    exit /b 1
)

REM Deploy
echo Deploying to Railway...
git push origin main

echo.
echo ✅ Deployment initiated!
echo Check your Railway dashboard for deployment status
echo.
