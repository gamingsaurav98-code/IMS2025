@echo off
REM Setup script for IMS2025 on Windows

echo.
echo 🚀 IMS2025 Setup Script (Windows)
echo ==================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    exit /b 1
)

echo ✅ Node.js version:
node --version
echo ✅ npm version:
npm --version
echo.

REM Backend setup
echo 📦 Setting up Backend...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Backend installation failed
    exit /b 1
)

REM Check if cors is installed
findstr /m "cors" package.json >nul
if %errorlevel% neq 0 (
    echo 📥 Installing CORS...
    call npm install cors
)

echo ✅ Backend setup complete
echo.

REM Frontend setup
echo 📦 Setting up Frontend...
cd frontend

call npm install

if %errorlevel% neq 0 (
    echo ❌ Frontend installation failed
    exit /b 1
)

echo ✅ Frontend setup complete
echo.

REM Back to root
cd ..

echo 🎉 Setup complete!
echo.
echo 📝 Next steps:
echo 1. Configure backend .env file
echo 2. Configure frontend .env.local file
echo 3. Ensure MongoDB is running
echo.
echo 🚀 To start development:
echo Terminal 1: npm run dev (backend on :3000)
echo Terminal 2: cd frontend ^&^& npm run dev (frontend on :3001)
echo.
pause
