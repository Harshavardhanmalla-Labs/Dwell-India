# Dwell India Deployment Guide
## Hosting at isdwell.in

This guide provides comprehensive instructions for deploying the Dwell India application to production.

---

## 🏗️ Architecture Overview

Your Dwell India stack consists of:
- **Frontend**: React + Vite (Static files)
- **Backend**: FastAPI (Python) - runs on port 8000
- **Database**: PostgreSQL
- **Domain**: isdwell.in

---

## 🎯 Recommended Deployment Strategy

### **Option 1: Cloud VM (Recommended for Full Control)**

#### **Best Choice: DigitalOcean Droplet or AWS EC2**

**Why?**
- Full control over the environment
- Cost-effective for startups ($12-24/month)
- Easy to scale
- Good for both frontend and backend

**Recommended Specs:**
```
- CPU: 2 vCPUs
- RAM: 4GB
- Storage: 80GB SSD
- OS: Ubuntu 22.04 LTS
- Cost: ~$24/month (DigitalOcean) or ~$20/month (AWS t3.medium)
```

#### **Setup Steps:**

1. **Create VM Instance**
   ```bash
   # DigitalOcean: Create a Droplet
   # AWS: Launch EC2 t3.medium instance
   # Choose Ubuntu 22.04 LTS
   ```

2. **Initial Server Setup**
   ```bash
   # SSH into your server
   ssh root@your-server-ip
   
   # Update system
   apt update && apt upgrade -y
   
   # Install required packages
   apt install -y nginx postgresql postgresql-contrib python3-pip python3-venv nodejs npm git certbot python3-certbot-nginx
   
   # Install Node.js 20 (LTS)
   curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
   apt install -y nodejs
   ```

3. **Setup PostgreSQL Database**
   ```bash
   # Switch to postgres user
   sudo -u postgres psql
   
   # Create database and user
   CREATE DATABASE dwell_india;
   CREATE USER dwell_user WITH PASSWORD 'your-secure-password';
   GRANT ALL PRIVILEGES ON DATABASE dwell_india TO dwell_user;
   \q
   ```

4. **Deploy Backend (FastAPI)**
   ```bash
   # Create app directory
   mkdir -p /var/www/dwell-india
   cd /var/www/dwell-india
   
   # Clone your repository
   git clone https://github.com/your-repo/Dwell-India.git .
   
   # Setup Python virtual environment
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Create .env file
   cat > .env << EOF
   DATABASE_URL=postgresql://dwell_user:your-secure-password@localhost/dwell_india
   SECRET_KEY=$(openssl rand -hex 32)
   ENVIRONMENT=production
   ALLOWED_ORIGINS=https://isdwell.in,https://www.isdwell.in
   EOF
   
   # Run database migrations
   alembic upgrade head
   ```

5. **Setup Systemd Service for Backend**
   ```bash
   # Create systemd service file
   cat > /etc/systemd/system/dwell-backend.service << EOF
   [Unit]
   Description=Dwell India FastAPI Backend
   After=network.target postgresql.service
   
   [Service]
   Type=simple
   User=www-data
   WorkingDirectory=/var/www/dwell-india/backend
   Environment="PATH=/var/www/dwell-india/backend/venv/bin"
   ExecStart=/var/www/dwell-india/backend/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
   Restart=always
   RestartSec=10
   
   [Install]
   WantedBy=multi-user.target
   EOF
   
   # Enable and start service
   systemctl daemon-reload
   systemctl enable dwell-backend
   systemctl start dwell-backend
   systemctl status dwell-backend
   ```

6. **Build and Deploy Frontend**
   ```bash
   cd /var/www/dwell-india/web
   
   # Install dependencies
   npm install
   
   # Update API endpoint in your code if needed
   # Create production build
   npm run build
   
   # Copy build files to nginx directory
   mkdir -p /var/www/html/isdwell.in
   cp -r dist/* /var/www/html/isdwell.in/
   ```

7. **Configure Nginx**
   ```bash
   # Create nginx configuration
   cat > /etc/nginx/sites-available/isdwell.in << 'EOF'
   # Redirect HTTP to HTTPS
   server {
       listen 80;
       listen [::]:80;
       server_name isdwell.in www.isdwell.in;
       
       location /.well-known/acme-challenge/ {
           root /var/www/html/isdwell.in;
       }
       
       location / {
           return 301 https://$server_name$request_uri;
       }
   }
   
   # HTTPS Server
   server {
       listen 443 ssl http2;
       listen [::]:443 ssl http2;
       server_name isdwell.in www.isdwell.in;
       
       root /var/www/html/isdwell.in;
       index index.html;
       
       # SSL certificates (will be configured by certbot)
       ssl_certificate /etc/letsencrypt/live/isdwell.in/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/isdwell.in/privkey.pem;
       
       # Security headers
       add_header X-Frame-Options "SAMEORIGIN" always;
       add_header X-Content-Type-Options "nosniff" always;
       add_header X-XSS-Protection "1; mode=block" always;
       
       # Frontend (React SPA)
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       # Backend API proxy
       location /api/ {
           proxy_pass http://localhost:8000/;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
       
       # Gzip compression
       gzip on;
       gzip_vary on;
       gzip_min_length 1024;
       gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;
   }
   EOF
   
   # Enable site
   ln -s /etc/nginx/sites-available/isdwell.in /etc/nginx/sites-enabled/
   
   # Test nginx configuration
   nginx -t
   
   # Restart nginx
   systemctl restart nginx
   ```

8. **Setup SSL Certificate (Let's Encrypt)**
   ```bash
   # First, make sure your domain DNS is pointing to your server IP
   
   # Obtain SSL certificate
   certbot --nginx -d isdwell.in -d www.isdwell.in
   
   # Test auto-renewal
   certbot renew --dry-run
   ```

9. **Update Frontend API Endpoint**
   
   Before building, update your frontend to use the production API:
   
   ```typescript
   // Create /web/src/config.ts
   export const API_BASE_URL = import.meta.env.PROD 
     ? 'https://isdwell.in/api'
     : 'http://localhost:8000';
   ```
   
   Then update all fetch calls to use this:
   ```typescript
   import { API_BASE_URL } from './config';
   
   fetch(`${API_BASE_URL}/properties/...`)
   ```

10. **Setup Firewall**
    ```bash
    # Install and configure UFW
    ufw allow 22/tcp    # SSH
    ufw allow 80/tcp    # HTTP
    ufw allow 443/tcp   # HTTPS
    ufw enable
    ```

---

### **Option 2: Hybrid Approach (Frontend CDN + Backend VM)**

**Frontend**: Vercel/Netlify (Free tier)
**Backend**: DigitalOcean Droplet ($12/month)

**Pros:**
- Frontend gets global CDN
- Cheaper overall
- Easy frontend deployments

**Cons:**
- Need to manage CORS
- Two separate deployments

---

### **Option 3: Managed Platform (Easiest but More Expensive)**

**Render.com or Railway.app**

**Pros:**
- Zero DevOps required
- Auto-deployments from Git
- Built-in SSL
- Database included

**Cons:**
- More expensive (~$50-100/month)
- Less control

---

## 🔧 DNS Configuration

Point your domain **isdwell.in** to your server:

```
Type: A Record
Name: @
Value: YOUR_SERVER_IP
TTL: 3600

Type: A Record
Name: www
Value: YOUR_SERVER_IP
TTL: 3600
```

---

## 📊 Monitoring & Maintenance

### **1. Setup PM2 for Process Management (Alternative to systemd)**
```bash
npm install -g pm2

# Start backend with PM2
cd /var/www/dwell-india/backend
pm2 start "uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4" --name dwell-backend
pm2 save
pm2 startup
```

### **2. Setup Log Rotation**
```bash
# Backend logs
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### **3. Monitoring Tools**
```bash
# Install monitoring
apt install -y htop iotop nethogs

# Check backend status
systemctl status dwell-backend
pm2 status

# View logs
journalctl -u dwell-backend -f
pm2 logs dwell-backend
```

---

## 🚀 Deployment Workflow

### **Initial Deployment**
```bash
# On your server
cd /var/www/dwell-india
git pull origin main

# Backend
cd backend
source venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
systemctl restart dwell-backend

# Frontend
cd ../web
npm install
npm run build
cp -r dist/* /var/www/html/isdwell.in/
```

### **Automated Deployment Script**
```bash
# Create /var/www/dwell-india/deploy.sh
cat > /var/www/dwell-india/deploy.sh << 'EOF'
#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# Pull latest code
git pull origin main

# Deploy Backend
echo "📦 Deploying backend..."
cd backend
source venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
systemctl restart dwell-backend

# Deploy Frontend
echo "🎨 Building frontend..."
cd ../web
npm install
npm run build
rm -rf /var/www/html/isdwell.in/*
cp -r dist/* /var/www/html/isdwell.in/

echo "✅ Deployment complete!"
EOF

chmod +x /var/www/dwell-india/deploy.sh
```

---

## 💰 Cost Breakdown

### **Recommended Setup (Option 1)**
- **VM (DigitalOcean/AWS)**: $24/month
- **Domain (isdwell.in)**: $12/year
- **SSL Certificate**: FREE (Let's Encrypt)
- **Total**: ~$25/month

### **Budget Setup**
- **VM (DigitalOcean Basic)**: $12/month
- **Domain**: $12/year
- **Total**: ~$13/month

---

## 🔒 Security Checklist

- [ ] Enable firewall (UFW)
- [ ] Setup SSH key authentication (disable password login)
- [ ] Install fail2ban for brute-force protection
- [ ] Enable automatic security updates
- [ ] Setup database backups
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS only
- [ ] Setup CORS properly
- [ ] Regular security updates

---

## 📝 Next Steps

1. **Choose your hosting provider** (Recommended: DigitalOcean)
2. **Purchase domain** if not already owned
3. **Create VM instance**
4. **Follow setup steps** above
5. **Configure DNS**
6. **Deploy application**
7. **Setup SSL**
8. **Test thoroughly**

---

## 🆘 Troubleshooting

### Backend not starting
```bash
# Check logs
journalctl -u dwell-backend -n 50
# or
pm2 logs dwell-backend

# Check if port is in use
netstat -tulpn | grep 8000
```

### Frontend not loading
```bash
# Check nginx
nginx -t
systemctl status nginx

# Check file permissions
ls -la /var/www/html/isdwell.in/
```

### Database connection issues
```bash
# Check PostgreSQL
systemctl status postgresql
sudo -u postgres psql -c "\l"
```

---

## 📞 Support

For deployment assistance, refer to:
- [DigitalOcean Tutorials](https://www.digitalocean.com/community/tutorials)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)

---

**Good luck with your deployment! 🚀**
