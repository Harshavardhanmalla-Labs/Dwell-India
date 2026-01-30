#!/bin/bash

# Dwell India - Server Setup Script
# This script installs all dependencies and sets up the environment

set -e  # Exit on any error

echo "🏠 Dwell India - Server Setup"
echo "=============================="
echo ""

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
    echo "⚠️  Please do not run as root. Run as a regular user with sudo privileges."
    exit 1
fi

# Update system packages
echo "📦 Updating system packages..."
sudo apt-get update
sudo apt-get upgrade -y

# Install Python 3.11+ and pip
echo "🐍 Installing Python 3.11+..."
sudo apt-get install -y python3.11 python3.11-venv python3-pip

# Install Node.js 18+ and npm
echo "📗 Installing Node.js 18+..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installations
echo ""
echo "✅ Verifying installations..."
python3 --version
node --version
npm --version

# Install backend dependencies
echo ""
echo "🔧 Setting up Backend (FastAPI)..."
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install Python dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating backend .env file..."
    cat > .env << EOF
# Database
DATABASE_URL=sqlite:///./dwell_india.db

# Security
SECRET_KEY=$(openssl rand -hex 32)
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Google OAuth (Add your credentials)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
EOF
    echo "✅ Backend .env created. Please update with your credentials."
fi

# Initialize database
echo "🗄️  Initializing database..."
python seed.py

deactivate
cd ..

# Install frontend dependencies
echo ""
echo "⚛️  Setting up Frontend (React + Vite)..."
cd web

# Install npm dependencies
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating frontend .env file..."
    cat > .env << EOF
VITE_API_URL=http://localhost:8000
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
EOF
    echo "✅ Frontend .env created. Please update with your credentials."
fi

cd ..

# Install PM2 for process management
echo ""
echo "🔄 Installing PM2 for process management..."
sudo npm install -g pm2

# Create PM2 ecosystem file
echo "📝 Creating PM2 ecosystem configuration..."
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'dwell-backend',
      cwd: './backend',
      script: 'venv/bin/uvicorn',
      args: 'app.main:app --host 0.0.0.0 --port 8000',
      interpreter: 'none',
      env: {
        PYTHONPATH: '.'
      },
      error_file: './logs/backend-error.log',
      out_file: './logs/backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },
    {
      name: 'dwell-frontend',
      cwd: './web',
      script: 'npm',
      args: 'run dev -- --host 0.0.0.0 --port 5173',
      env: {
        NODE_ENV: 'development'
      },
      error_file: './logs/frontend-error.log',
      out_file: './logs/frontend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
  ]
};
EOF

# Create logs directory
mkdir -p logs

# Install Nginx (optional, for production)
echo ""
read -p "📦 Install Nginx for production deployment? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    sudo apt-get install -y nginx
    echo "✅ Nginx installed. Configure manually for production."
fi

echo ""
echo "✅ Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Update backend/.env with your Google OAuth credentials"
echo "2. Update web/.env with your API URL and Google Client ID"
echo "3. Start the services:"
echo "   - Development: npm run dev (in web/) and uvicorn app.main:app --reload (in backend/)"
echo "   - Production: pm2 start ecosystem.config.js"
echo ""
echo "🚀 Useful Commands:"
echo "   pm2 start ecosystem.config.js    # Start all services"
echo "   pm2 stop all                      # Stop all services"
echo "   pm2 restart all                   # Restart all services"
echo "   pm2 logs                          # View logs"
echo "   pm2 monit                         # Monitor services"
echo ""
