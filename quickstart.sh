#!/bin/bash

# Quick Start Script for Dwell India
# Run this on your server after cloning the repo

echo "🏠 Dwell India - Quick Start"
echo "============================"
echo ""

# Check if running on server
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository. Please run from the Dwell-India directory."
    exit 1
fi

# Backend setup
echo "🐍 Setting up Backend..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

# Activate and install dependencies
source venv/bin/activate
pip install -r requirements.txt

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating backend .env..."
    cat > .env << 'EOF'
DATABASE_URL=sqlite:///./dwell_india.db
SECRET_KEY=your-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
EOF
fi

# Initialize database
if [ ! -f "dwell_india.db" ]; then
    echo "Initializing database..."
    python seed.py
fi

deactivate
cd ..

# Frontend setup
echo ""
echo "⚛️  Setting up Frontend..."
cd web

# Clean install to avoid cache issues
echo "Installing frontend dependencies..."
rm -rf node_modules package-lock.json

# Install dependencies
npm install

# Explicitly install critical packages if missing
echo "Ensuring critical packages are installed..."
npm install react-router-dom lucide-react

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating frontend .env..."
    cat > .env << 'EOF'
VITE_API_URL=http://localhost:8000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
EOF
fi

cd ..

echo ""
echo "✅ Setup Complete!"
echo ""
echo "📋 To start the application:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend"
echo "  source venv/bin/activate"
echo "  uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd web"
echo "  npm run dev -- --host 0.0.0.0"
echo ""
echo "⚠️  Don't forget to update .env files with your actual credentials!"
echo ""
