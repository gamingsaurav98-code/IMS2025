@echo off
REM Switch between Local and Production environments

if "%1"=="local" (
    echo 🔄 Switching to LOCAL development environment...
    
    REM Backend
    (
        echo PORT=3000
        echo MONGODB_URI=mongodb://localhost:27017/IMS202506
        echo JWT_SECRET=dev-secret-key
        echo FRONTEND_URL=http://localhost:3001
        echo NODE_ENV=development
    ) > .env
    
    REM Frontend
    (
        echo NEXT_PUBLIC_API_URL=http://localhost:3000/api
    ) > frontend\.env.local
    
    echo.
    echo ✅ Environment switched to LOCAL
    echo Run: npm run dev (backend^)
    echo Run: npm run dev (frontend^)
    
) else if "%1"=="production" (
    echo 🔄 Switching to PRODUCTION environment...
    
    if not exist ".env.production" (
        echo ❌ .env.production not found!
        echo Please create .env.production with production variables
        exit /b 1
    )
    
    REM Backend
    copy .env.production .env
    
    REM Frontend
    if not exist "frontend\.env.production" (
        echo ❌ frontend\.env.production not found!
        exit /b 1
    )
    copy frontend\.env.production frontend\.env.local
    
    echo.
    echo ✅ Environment switched to PRODUCTION
    
) else (
    echo Usage: %0 [local^|production]
    echo.
    echo local      - Switch to local development
    echo production - Switch to production (requires .env.production files^)
    echo.
    echo Examples:
    echo   %0 local
    echo   %0 production
)
