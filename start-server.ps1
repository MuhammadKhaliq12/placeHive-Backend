# PlaceHive Backend Server Starter Script
# This script kills any process using the configured port and starts the server

Write-Host "🚀 Starting PlaceHive Backend Server..." -ForegroundColor Green

# Get the port from .env file
$envFile = ".env"
if (Test-Path $envFile) {
    $port = Get-Content $envFile | Where-Object { $_ -match '^PORT=' } | ForEach-Object { $_.Split('=')[1] }
    Write-Host "📋 Configured port: $port" -ForegroundColor Cyan
} else {
    $port = "6002"  # Default port
    Write-Host "⚠️ No .env file found, using default port: $port" -ForegroundColor Yellow
}

# Check if port is in use
$processUsingPort = netstat -ano | findstr ":$port"
if ($processUsingPort) {
    $pid = ($processUsingPort -split '\s+')[-1]
    Write-Host "🔍 Found process $pid using port $port, terminating..." -ForegroundColor Yellow
    taskkill /PID $pid /F > $null 2>&1
    Start-Sleep -Seconds 2
    Write-Host "✅ Process terminated" -ForegroundColor Green
} else {
    Write-Host "✅ Port $port is free" -ForegroundColor Green
}

# Start the server
Write-Host "🔄 Starting server..." -ForegroundColor Cyan
npm run dev

