@echo off
echo 🚀 Starting PlaceHive Backend Server...
echo.

REM Get port from .env file (default to 6002 if not found)
set PORT=6002
if exist .env (
    for /f "tokens=2 delims==" %%a in ('findstr "^PORT=" .env') do set PORT=%%a
)
echo 📋 Configured port: %PORT%
echo.

REM Check if port is in use and kill the process
echo 🔍 Checking if port %PORT% is in use...
netstat -ano | findstr :%PORT% >nul
if %errorlevel% equ 0 (
    echo Found process using port %PORT%, terminating...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :%PORT%') do (
        taskkill /PID %%a /F >nul 2>&1
        echo ✅ Process terminated
    )
    timeout /t 2 /nobreak >nul
) else (
    echo ✅ Port %PORT% is free
)

echo.
echo 🔄 Starting server...
npm run dev

