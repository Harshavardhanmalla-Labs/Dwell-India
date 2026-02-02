#!/bin/bash
set -e

# Run migrations
echo "Running database migrations..."
# Check if there are any migration versions
if [ -z "$(ls -A alembic/versions/*.py 2>/dev/null)" ]; then
    echo "No migrations found. Generating initial migration..."
    alembic revision --autogenerate -m "Initial_Production_Schema"
fi
alembic upgrade head

# Start application
echo "Starting Dwell India Backend..."
# Use uvicorn with reload if in development (set via env var ideally, but default to production-ish info log)
exec uvicorn app.main:app --host 0.0.0.0 --port 8000
