#!/bin/bash

echo "🚀 Deploying Dwell India Production Stack..."

# Check if .env.prod exists
if [ ! -f .env.prod ]; then
    echo "⚠️  .env.prod not found! Creating template..."
    echo "SECRET_KEY=change_this_to_a_secure_random_string" > .env.prod
    echo "GOOGLE_CLIENT_ID=your_google_client_id" >> .env.prod
    echo "✅ Created .env.prod. Please edit it with real secrets."
    exit 1
fi

# Load environment variables
export $(cat .env.prod | xargs)

# Build and start services
echo "🐳 Building and starting containers..."
docker compose -f docker-compose.prod.yml up --build -d

echo "✅ Deployment complete!"
echo "🌍 Web: http://localhost"
echo "🔌 API: http://localhost/api/health"
