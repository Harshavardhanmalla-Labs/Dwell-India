#!/bin/bash
set -e

# Run migrations
echo "Running database migrations..."
alembic upgrade head

# Start application
echo "Starting Dwell India Backend..."
# Use uvicorn with reload if in development (set via env var ideally, but default to production-ish info log)
exec uvicorn app.main:app --host 0.0.0.0 --port 8000
