#!/bin/bash

# Dwell India - Server Setup Script
# Run this script on a fresh Ubuntu 22.04 server

set -e

echo "🔧 Dwell India Server Setup"
echo "============================"
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root (use sudo)"
    exit 1
fi

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install required packages
echo "📦 Installing required packages..."
apt install -y \
    nginx \
    postgresql \
    postgresql-contrib \
    python3-pip \
    python3-venv \
    git \
    certbot \
    python3-certbot-nginx \
    ufw \
    htop \
    curl

# Install Node.js 20 LTS
echo "📦 Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Setup PostgreSQL
echo "🗄️  Setting up PostgreSQL..."
sudo -u postgres psql << EOF
CREATE DATABASE dwell_india;
CREATE USER dwell_user WITH PASSWORD 'CHANGE_THIS_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE dwell_india TO dwell_user;
\q
EOF

echo "✅ Database created: dwell_india"
echo "⚠️  IMPORTANT: Change the database password in the script!"

# Setup firewall
echo "🔒 Configuring firewall..."
ufw allow 22/tcp   # SSH
ufw allow 80/tcp   # HTTP
ufw allow 443/tcp  # HTTPS
ufw --force enable

# Create project directory
echo "📁 Creating project directory..."
mkdir -p /var/www/dwell-india
mkdir -p /var/www/html/isdwell.in

# Set permissions
chown -R www-data:www-data /var/www/html/isdwell.in

echo ""
echo "============================"
echo "✅ Server Setup Complete!"
echo "============================"
echo ""
echo "Next steps:"
echo "1. Clone your repository to /var/www/dwell-india"
echo "2. Update database password in backend/.env"
echo "3. Follow the deployment guide for remaining setup"
echo ""
echo "📝 Important files:"
echo "  - Nginx config: /etc/nginx/sites-available/isdwell.in"
echo "  - Project dir: /var/www/dwell-india"
echo "  - Web root: /var/www/html/isdwell.in"
echo ""
