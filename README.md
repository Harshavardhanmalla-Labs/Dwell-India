# Dwell India

**India's first trust-anchored real estate marketplace**

🌐 **Live at:** [isdwell.in](https://isdwell.in)

---

## Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL (or SQLite for dev)

## Project Structure
- `backend/`: FastAPI Application
- `web/`: React + Vite Application
- `mobile/`: React Native Expo Application

---

## 🚀 Getting Started

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

---

## 📦 Deployment

### Quick Deploy to Production

1. **Read the guides:**
   - 📖 [Hosting Options Comparison](./HOSTING_OPTIONS.md) - Choose your hosting provider
   - 📖 [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Detailed deployment instructions

2. **Setup server:**
   ```bash
   # On your fresh Ubuntu 22.04 server
   wget https://raw.githubusercontent.com/your-repo/Dwell-India/main/server-setup.sh
   chmod +x server-setup.sh
   sudo ./server-setup.sh
   ```

3. **Deploy application:**
   ```bash
   # After initial setup
   sudo ./deploy.sh
   ```

### Recommended Hosting
- **Production:** DigitalOcean Droplet ($24/month)
- **Budget:** Vercel (Frontend) + DigitalOcean (Backend) ($12/month)
- **Own Server:** Your server in India (₹2,500/month after initial ₹50,000 investment)
- **Quick Launch:** Render.com ($50-100/month)

See [HOSTING_OPTIONS.md](./HOSTING_OPTIONS.md) for cloud comparison.
See [OWN_SERVER_GUIDE.md](./OWN_SERVER_GUIDE.md) for hosting on your own server in India.

---

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Complete deployment instructions
- [Hosting Options](./HOSTING_OPTIONS.md) - Hosting provider comparison
- [PRD](./docs/PRD.md) - Product Requirements Document

---

## 🛠️ Tech Stack

**Frontend:**
- React + TypeScript
- Vite
- React Router
- Lucide Icons

**Backend:**
- FastAPI (Python)
- PostgreSQL
- SQLAlchemy
- Alembic

**Mobile:**
- React Native
- Expo

**Deployment:**
- Nginx
- Let's Encrypt SSL
- Ubuntu 22.04

---

## 📝 License

Proprietary - Dwell India

---

## 🤝 Support

For deployment help, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

