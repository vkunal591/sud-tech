@echo off
SETLOCAL

:: Set the Next.js project path
SET PROJECT_PATH= D:\Development\Dashboard\sud-tech

:: Navigate to project directory
cd /d "%PROJECT_PATH%" || (
    echo Invalid project path! Please check the path and try again.
    pause
    exit /b
)

:: Start the Next.js server in a hidden background process
start /min cmd /c "npm run start >nul 2>&1"

:: Wait for the server to be ready (adjust if needed)
timeout /t 10 /nobreak >nul

:: Open the app in Edge (or Chrome)
SET URL=http://localhost:3001

:: Open in Edge App Mode
start msedge --new-window --app=%URL%

:: Uncomment below if using Chrome instead
:: start chrome --new-window --app=%URL%

:: Hide this script and wait until the browser closes
exit

