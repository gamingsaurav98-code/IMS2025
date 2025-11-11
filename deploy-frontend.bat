@echo off
REM Deploy to Vercel (Frontend)
REM Prerequisites: Vercel CLI installed, logged in

echo 🚀 Deploying Frontend to Vercel...
echo.

cd frontend

REM Check if .env.production exists
if not exist ".env.production" (
    echo ❌ Error: .env.production file not found
    echo Please create .env.production with your production environment variables
    exit /b 1
)

REM Deploy to Vercel
vercel --prod

echo.
echo ✅ Deployment complete!
echo Check your Vercel dashboard for deployment details
echo.

cd ..
