#!/bin/bash

# Dwell India - Fix Missing Dependencies
# Run this if you encounter missing package errors

echo "🔧 Fixing Dwell India Dependencies"
echo "==================================="
echo ""

# Fix Frontend Dependencies
echo "📦 Reinstalling Frontend Dependencies..."
cd web

# Remove old installations
rm -rf node_modules package-lock.json

# Fresh install
npm install

# Explicitly install critical packages
echo "Installing critical packages..."
npm install react@^19.2.0 react-dom@^19.2.0
npm install react-router-dom@^7.13.0
npm install lucide-react@^0.563.0
npm install vite@^7.2.4
npm install @vitejs/plugin-react@^5.1.1

# Verify installation
echo ""
echo "✅ Verifying installations..."
npm list react react-dom react-router-dom lucide-react

cd ..

# Fix Backend Dependencies
echo ""
echo "🐍 Reinstalling Backend Dependencies..."
cd backend

source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
deactivate

cd ..

echo ""
echo "✅ All dependencies reinstalled!"
echo ""
echo "Try starting the application again:"
echo "  cd web && npm run dev"
echo ""
