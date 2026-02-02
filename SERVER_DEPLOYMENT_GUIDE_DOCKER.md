# 🐳 Dwell India - Docker Production Deployment Guide

This guide explains how to deploy the "Containerized" Dwell India stack to any Linux server (Ubuntu/Debian recommended) using the Docker images created in our Production Transformation.

---

## 📋 Prerequisites

- A Linux Server (Ubuntu 20.04/22.04 LTS is best).
- SSH Access to the server.
- A Domain Name (e.g., `app.dwellindia.com`) pointing to your server IP.

---

## 🚀 Step 1: Connect & Install Docker

1. **SSH into your server:**
   ```bash
   ssh root@your-server-ip
   ```

2. **Install Docker & Git (One-line command):**
   ```bash
   curl -fsSL https://get.docker.com | sh
   apt-get install -y git
   ```

---

## 📦 Step 2: Clone & Prepare

1. **Clone your repository:**
   ```bash
   git clone https://github.com/YourUsername/Dwell-India.git
   cd Dwell-India
   ```

2. **Configure Production Secrets:**
   The app needs a `.env.prod` file. Run this to generate a template:
   ```bash
   ./deploy-prod.sh
   ```
   *(It will fail the first time but create the file for you)*.

3. **Edit the Secrets:**
   Open the file and add your real credentials:
   ```bash
   nano .env.prod
   ```
   
   **Required Fields:**
   ```ini
   SECRET_KEY=generate_a_strong_random_string_here
   GOOGLE_CLIENT_ID=your_real_google_client_id_from_fl
   DATABASE_URL=postgresql://user:password@db:5432/dwell  <-- Keep this exactly as is for Docker
   POSTGRES_USER=user
   POSTGRES_PASSWORD=password
   POSTGRES_DB=dwell
   ```
   *(Press `Ctrl+X`, then `Y`, then `Enter` to save)*.

---

## 🚀 Step 3: Launch!

Run the deployment script again. It will build the containers and start the app.

```bash
./deploy-prod.sh
```

**That's it!** The script will:
1. Build the **Backend** (Python FastAPI).
2. Build the **Frontend** (React -> Static -> Nginx).
3. Start the **Database** (PostgreSQL).
4. Link them all together on a private network.

---

## 🌐 Step 4: Verify

Open your browser and visit your Server IP:
- **Frontend**: `http://your-server-ip`
- **Backend API**: `http://your-server-ip/api/health` (Should return `{"status":"ok"}`)

---

## 🛡️ Optional: SSL (HTTPS)

For a real production launch, you need HTTPS. The easiest way with Docker is to use Caddy or Nginx Proxy Manager, but for a quick setup, you can modify `docker-compose.prod.yml` to use `https-portal` or configure Certbot on the host.

**Quick HTTPS (using Caddy automatic SSL):**

1. Modify `docker-compose.prod.yml`:
   ```yaml
   web:
     # ... existing config ...
     ports:
       - "80:80"
       - "443:443"
   ```
   *(Advanced: Requires setting up a Caddy container or Nginx Certbot. For Alpha, HTTP is fine).*

---

## 🔄 How to Update

When you push new code to Git, update the server like this:

```bash
cd Dwell-India
git pull
./deploy-prod.sh
```
*(This rebuilds the containers with your new code).*
