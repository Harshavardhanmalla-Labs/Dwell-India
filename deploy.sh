#!/bin/bash

# Dwell India - Quick Deployment Script
# This script automates the deployment process

set -e  # Exit on error

echo "🚀 Dwell India Deployment Script"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PROJECT_DIR="/var/www/dwell-india"
WEB_DIR="$PROJECT_DIR/web"
BACKEND_DIR="$PROJECT_DIR/backend"
NGINX_DIR="/var/www/html/isdwell.in"

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then 
    print_error "Please run with sudo"
    exit 1
fi

# Pull latest code
echo ""
echo "📥 Pulling latest code from Git..."
cd $PROJECT_DIR
git pull origin main
print_status "Code updated"

# Deploy Backend
echo ""
echo "📦 Deploying Backend..."
cd $BACKEND_DIR

# Activate virtual environment
source venv/bin/activate

# Install/update dependencies
pip install -r requirements.txt -q
print_status "Dependencies installed"

# Run database migrations
alembic upgrade head
print_status "Database migrations applied"

# Restart backend service
systemctl restart dwell-backend
sleep 2

# Check if backend is running
if systemctl is-active --quiet dwell-backend; then
    print_status "Backend service restarted successfully"
else
    print_error "Backend service failed to start"
    systemctl status dwell-backend
    exit 1
fi

# Deploy Frontend
echo ""
echo "🎨 Building Frontend..."
cd $WEB_DIR

# Install dependencies
npm install --silent
print_status "Dependencies installed"

# Build production bundle
npm run build
print_status "Frontend built successfully"

# Deploy to nginx
echo ""
echo "📤 Deploying to web server..."
rm -rf $NGINX_DIR/*
cp -r dist/* $NGINX_DIR/
print_status "Files copied to nginx directory"

# Set proper permissions
chown -R www-data:www-data $NGINX_DIR
print_status "Permissions set"

# Reload nginx
nginx -t && systemctl reload nginx
print_status "Nginx reloaded"

# Summary
echo ""
echo "=================================="
echo -e "${GREEN}✅ Deployment Complete!${NC}"
echo "=================================="
echo ""
echo "🌐 Website: https://isdwell.in"
echo "📊 Backend Status: $(systemctl is-active dwell-backend)"
echo "🔧 Nginx Status: $(systemctl is-active nginx)"
echo ""
echo "📝 View logs:"
echo "  Backend: journalctl -u dwell-backend -f"
echo "  Nginx: tail -f /var/log/nginx/error.log"
echo ""
