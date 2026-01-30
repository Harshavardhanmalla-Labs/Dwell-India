# Dwell India

## Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL (or SQLite for dev)

## Project Structure
- `backend/`: FastAPI Application
- `web/`: React + Vite Application
- `mobile/`: React Native Expo Application

## Getting Started

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Web
```bash
cd web
npm install
npm run dev
```

### Mobile
```bash
cd mobile
npm install
npm run android # or ios
```
