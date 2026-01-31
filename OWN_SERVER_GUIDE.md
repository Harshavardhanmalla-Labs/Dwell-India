# Hosting Dwell India on Your Own Server in India

## ✅ Yes, You Can Use Your Own Server!

Using your own physical server in India is actually a **great option** for Dwell India. Here's everything you need to know.

---

## 🏢 On-Premises Server vs Cloud: Comparison

| Feature | Your Own Server | Cloud (DigitalOcean/AWS) |
|---------|----------------|--------------------------|
| **Initial Cost** | ₹30,000-₹80,000 (one-time) | $0 upfront |
| **Monthly Cost** | ₹500-₹2,000 (electricity + internet) | ₹2,000-₹3,000 |
| **Long-term (3 years)** | ₹48,000-₹1,00,000 | ₹72,000-₹1,08,000 |
| **Control** | 100% Full Control | Full Control |
| **Latency (India)** | Excellent (local) | Good |
| **Reliability** | Depends on your setup | 99.9% uptime |
| **Scalability** | Manual upgrade | Easy scaling |
| **Maintenance** | You handle it | Provider handles hardware |

**Verdict:** Own server is **cheaper long-term** and gives you **full control**!

---

## 🖥️ Recommended Server Specifications

### Option 1: Budget Server (₹30,000-₹40,000)
```
CPU: Intel i5 or AMD Ryzen 5
RAM: 16GB DDR4
Storage: 500GB SSD
Network: Gigabit Ethernet
Power: 400W PSU
UPS: 1KVA (for power backup)

Recommended Brands:
- Dell OptiPlex
- HP ProDesk
- Custom Build (cheaper)
```

### Option 2: Production Server (₹60,000-₹80,000)
```
CPU: Intel i7 or AMD Ryzen 7
RAM: 32GB DDR4
Storage: 1TB NVMe SSD + 2TB HDD (backup)
Network: Gigabit Ethernet
Power: 600W PSU
UPS: 2KVA

Recommended:
- Dell PowerEdge T40
- HP ProLiant MicroServer
- Custom Build
```

### Option 3: Used/Refurbished (₹15,000-₹25,000)
```
Look for:
- Dell OptiPlex 7040/7050
- HP EliteDesk 800 G2/G3
- Lenovo ThinkCentre M900

Where to buy:
- OLX, Quikr (used)
- Amazon Renewed
- Local computer markets
```

---

## 🌐 Internet Requirements

### Minimum Requirements:
- **Speed:** 50 Mbps upload (100 Mbps recommended)
- **Type:** Fiber (ACT, Airtel, Jio Fiber)
- **Static IP:** Required (₹500-₹1,000/month extra)
- **Uptime:** 99%+ reliability

### Recommended ISPs in India:
1. **ACT Fibernet** - Excellent for businesses, static IP available
2. **Airtel Fiber** - Good reliability, business plans available
3. **Jio Fiber** - Affordable, but check static IP availability
4. **Excitel** - Budget option in select cities

### Getting Static IP:
```
Contact your ISP and request:
- Business plan with static IP
- Port forwarding enabled
- No CGNAT (Carrier-Grade NAT)

Cost: ₹1,500-₹3,000/month
```

---

## ⚡ Power & Backup

### Essential:
1. **UPS (Uninterruptible Power Supply)**
   - Minimum: 1KVA (₹5,000-₹8,000)
   - Recommended: 2KVA (₹10,000-₹15,000)
   - Provides: 30-60 minutes backup

2. **Surge Protector**
   - Cost: ₹500-₹1,500
   - Protects from voltage spikes

3. **Optional: Generator/Inverter**
   - For areas with frequent power cuts
   - Cost: ₹20,000-₹50,000

---

## 🔧 Setup Guide for Your Own Server

### Step 1: Hardware Setup

```bash
1. Assemble/Purchase server
2. Install Ubuntu 22.04 LTS Server
3. Connect to UPS
4. Connect to router with Ethernet cable
5. Configure BIOS for auto-restart after power loss
```

### Step 2: Install Ubuntu Server

```bash
# Download Ubuntu Server 22.04 LTS
# Create bootable USB
# Install with these options:
- Minimal installation
- OpenSSH server
- No GUI (saves resources)
```

### Step 3: Initial Configuration

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Set static local IP
sudo nano /etc/netplan/00-installer-config.yaml

# Add:
network:
  version: 2
  ethernets:
    enp0s3:  # Your network interface name
      dhcp4: no
      addresses:
        - 192.168.1.100/24  # Your desired local IP
      gateway4: 192.168.1.1  # Your router IP
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]

# Apply changes
sudo netplan apply
```

### Step 4: Router Configuration

```bash
# Login to your router (usually 192.168.1.1)
# Configure:

1. Port Forwarding:
   - External Port 80 → Internal IP 192.168.1.100:80 (HTTP)
   - External Port 443 → Internal IP 192.168.1.100:443 (HTTPS)
   - External Port 22 → Internal IP 192.168.1.100:22 (SSH - optional)

2. DDNS (if no static IP):
   - Use No-IP, DuckDNS, or Cloudflare
   - Updates your domain when IP changes

3. Firewall:
   - Allow ports 80, 443
   - Block unnecessary ports
```

### Step 5: Install Dwell India

```bash
# SSH into your server
ssh your-username@192.168.1.100

# Run the setup script
wget https://raw.githubusercontent.com/your-repo/Dwell-India/main/server-setup.sh
chmod +x server-setup.sh
sudo ./server-setup.sh

# Follow DEPLOYMENT_GUIDE.md for rest of setup
```

### Step 6: Domain Configuration

```bash
# In your domain registrar (where you bought isdwell.in):

Type: A Record
Name: @
Value: YOUR_PUBLIC_IP  # Get from whatismyip.com
TTL: 3600

Type: A Record
Name: www
Value: YOUR_PUBLIC_IP
TTL: 3600

# If using DDNS (dynamic IP):
Type: CNAME
Name: @
Value: your-ddns-hostname.ddns.net
```

### Step 7: SSL Certificate

```bash
# Same as cloud setup
sudo certbot --nginx -d isdwell.in -d www.isdwell.in
```

---

## 🔒 Security for Home Server

### Essential Security Measures:

1. **Firewall (UFW)**
```bash
sudo ufw allow 22/tcp   # SSH (change port!)
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable
```

2. **Change SSH Port**
```bash
sudo nano /etc/ssh/sshd_config
# Change Port 22 to Port 2222
sudo systemctl restart sshd

# Update firewall
sudo ufw allow 2222/tcp
sudo ufw delete allow 22/tcp
```

3. **Fail2Ban (Prevent Brute Force)**
```bash
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

4. **Automatic Security Updates**
```bash
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

5. **Cloudflare (Recommended)**
```bash
# Use Cloudflare as DNS + CDN + DDoS protection
# Free tier includes:
- DDoS protection
- SSL/TLS
- CDN (faster global access)
- Hides your real IP
- Web Application Firewall

Setup:
1. Sign up at cloudflare.com
2. Add isdwell.in
3. Update nameservers at domain registrar
4. Enable "Proxy" (orange cloud) for DNS records
```

---

## 📊 Monitoring Your Server

### 1. Install Monitoring Tools
```bash
# Netdata (Real-time monitoring)
bash <(curl -Ss https://my-netdata.io/kickstart.sh)

# Access at: http://your-ip:19999

# Glances (Terminal monitoring)
sudo apt install glances -y
glances
```

### 2. Setup Alerts
```bash
# Email alerts for disk space, CPU, etc.
sudo apt install ssmtp mailutils -y

# Configure email in /etc/ssmtp/ssmtp.conf
```

### 3. Uptime Monitoring
```bash
# Use external service (free):
- UptimeRobot.com
- Pingdom
- StatusCake

# They'll alert you if site goes down
```

---

## 💾 Backup Strategy

### Automated Backups:

```bash
# Create backup script
cat > /usr/local/bin/backup-dwell.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/backup/dwell-$(date +%Y%m%d)"
mkdir -p $BACKUP_DIR

# Backup database
sudo -u postgres pg_dump dwell_india > $BACKUP_DIR/database.sql

# Backup application files
tar -czf $BACKUP_DIR/app.tar.gz /var/www/dwell-india

# Keep only last 7 days
find /backup -type d -mtime +7 -exec rm -rf {} +

echo "Backup completed: $BACKUP_DIR"
EOF

chmod +x /usr/local/bin/backup-dwell.sh

# Schedule daily backup
crontab -e
# Add: 0 2 * * * /usr/local/bin/backup-dwell.sh
```

### Off-site Backup:
```bash
# Option 1: Google Drive (rclone)
curl https://rclone.org/install.sh | sudo bash
rclone config  # Setup Google Drive
rclone sync /backup remote:dwell-backups

# Option 2: External HDD
# Connect USB drive and sync backups
```

---

## 🏠 Physical Setup Recommendations

### Server Location:
- ✅ Cool, dry place
- ✅ Good ventilation
- ✅ Away from direct sunlight
- ✅ Dust-free environment
- ✅ Accessible for maintenance

### Cooling:
```
- Ensure good airflow
- Room temperature: 18-27°C ideal
- Consider AC in summer (if needed)
- Clean dust filters monthly
```

### Cable Management:
```
- Organize cables neatly
- Label everything
- Use cable ties
- Keep spare cables
```

---

## 💰 Cost Analysis: Own Server vs Cloud (3 Years)

### Your Own Server:
```
Hardware (one-time):        ₹50,000
UPS (one-time):            ₹10,000
Internet (₹2,000/month):    ₹72,000
Electricity (₹500/month):   ₹18,000
Domain (₹1,000/year):       ₹3,000
Maintenance:               ₹10,000
-----------------------------------
Total (3 years):           ₹1,63,000
Per month average:         ₹4,528
```

### Cloud (DigitalOcean):
```
Server (₹2,000/month):     ₹72,000
Domain (₹1,000/year):      ₹3,000
-----------------------------------
Total (3 years):           ₹75,000
Per month:                 ₹2,083
```

**Wait, cloud is cheaper?**

Yes, for **3 years**. But:
- After 3 years, own server costs only ₹2,500/month (internet + electricity)
- Cloud continues at ₹2,000/month forever
- **Break-even point: ~4 years**
- After 5 years: Own server saves ₹60,000+

---

## 🎯 Recommendation for Dwell India

### Start with Cloud, Move to Own Server Later

**Phase 1 (Months 1-6): Cloud**
- Use DigitalOcean ($24/month)
- Validate product-market fit
- Learn deployment
- No hardware risk

**Phase 2 (Months 6-12): Hybrid**
- Keep cloud as primary
- Setup own server as backup/staging
- Test reliability

**Phase 3 (Year 2+): Own Server**
- Move to own server
- Keep cloud as backup
- Save costs long-term

### OR: Start with Own Server if:
- ✅ You have reliable internet (fiber, static IP)
- ✅ You have stable power (or good UPS/generator)
- ✅ You're comfortable with server maintenance
- ✅ You want maximum control
- ✅ You're thinking long-term (3+ years)

---

## 🚀 Quick Start: Own Server Setup

### 1. Buy/Setup Server
```
Budget: ₹30,000-₹50,000
- Server/PC with 16GB RAM
- 500GB SSD
- UPS (1KVA minimum)
```

### 2. Get Business Internet
```
ISP: ACT/Airtel/Jio Fiber
Plan: 100 Mbps with static IP
Cost: ₹2,000-₹3,000/month
```

### 3. Install Ubuntu Server
```bash
# Download Ubuntu Server 22.04 LTS
# Install on your server
# Enable SSH during installation
```

### 4. Configure Network
```bash
# Set static local IP
# Configure router port forwarding
# Setup firewall
```

### 5. Deploy Dwell India
```bash
# Run server-setup.sh
# Follow DEPLOYMENT_GUIDE.md
# Configure domain DNS
# Setup SSL
```

### 6. Setup Monitoring & Backups
```bash
# Install Netdata
# Configure automated backups
# Setup Cloudflare (recommended)
```

---

## 📞 ISP Recommendations by City

### Bangalore:
- ACT Fibernet ⭐ (Best for businesses)
- Airtel Xstream Fiber
- Hathway

### Hyderabad:
- ACT Fibernet ⭐
- Airtel Fiber
- Spectranet

### Chennai:
- ACT Fibernet ⭐
- Airtel Fiber
- Hathway

### Mumbai:
- Airtel Fiber ⭐
- Hathway
- YOU Broadband

### Delhi/NCR:
- Airtel Fiber ⭐
- Excitel
- Spectranet

**Call ISP and ask for:**
- Business plan with static IP
- No CGNAT
- Port forwarding support
- 99% uptime SLA

---

## ✅ Final Recommendation

### For Dwell India, I recommend:

**Option 1: Start with Cloud (Safer)**
- Month 1-6: DigitalOcean ($24/month)
- Validate business
- Then decide on own server

**Option 2: Own Server (If Ready)**
- You have: Reliable internet + power
- Budget: ₹50,000 initial investment
- Long-term thinking (3+ years)
- Want full control

**Best of Both: Hybrid**
- Primary: Own server (₹50,000 + ₹2,500/month)
- Backup: Small cloud instance (₹500/month)
- Total: ₹3,000/month with redundancy

---

## 🆘 Troubleshooting Own Server

### Internet Issues:
```bash
# Check public IP
curl ifconfig.me

# Test port forwarding
# Use: canyouseeme.org
```

### Power Issues:
```bash
# Configure auto-restart after power loss
# In BIOS: Power Management → AC Power Loss → Power On
```

### Remote Access:
```bash
# If ISP blocks ports, use Cloudflare Tunnel
cloudflared tunnel create dwell-india
# Free, secure, no port forwarding needed!
```

---

**Bottom line: Own server is absolutely viable and can save money long-term! Start with cloud if unsure, or go own server if you're ready for the commitment.** 🚀
