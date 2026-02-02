# 🚀 Dwell India v1.0.0 (Alpha Release)
**Release Date:** February 1, 2026
**Codename:** Trusted Transaction OS

---

## 🌟 Executive Summary
This release marks the transition of Dwell India from a prototype to a **Secure Property Transaction Workspace**. The platform now features end-to-end "Trust Engine" logic, a production-hardened backend with PostgreSQL/JWT, and a premium "Unicorn-grade" user interface for Consumers, Builders, and Admins.

---

## ✨ Key Features

### 1. Trusted Deal Room (Transaction OS)
- **Settlement Logic**: Replaced generic payments with a formal "Dual-Confirmation" settlement workflow.
- **State Machine**: Tracks deals from `DRAFTING` → `SETTLEMENT_CONFIRMED` → `REGISTRATION_READY`.
- **Checklists**: Dynamic compliance checklists for Telangana (TS) and Andhra Pradesh (AP).

### 2. The "Trust Engine" (Backend)
- **Verification Service**: Algorithms to calculate a 0-10 Trust Score based on:
    - Identity Match (Fuzzy Logic)
    - Document OCR (Sale Deed Analysis)
    - Field Verification Signals
- **Privacy Core**: "Trust Proxy" architecture that verifies data without exposing raw documents to public view.

### 3. Premium UI/UX
- **New Dashboard**: Personalized hub for Active Deals, Trust Level, and Saved Listings.
- **Builder Console**: CRM-style dashboard for Managing Inventory, Leads, and Project Velocity.
- **Global Design System**: "Inter" & "Outfit" typography, Glassmorphism effects, and "Trust Emerald" branding.

### 4. Infrastructure & Security
- **Strict Auth**: Google OAuth + JWT (Access/Refresh token rotation).
- **RBAC**: granular roles for `buyer`, `owner`, `builder`, `admin`.
- **Dockerized**: Full container orchestration for Web (Nginx), Backend (Python/FastAPI), and Database (Postgres).

---

## 🛠️ Technical Upgrade Log

| Component | Previous State | v1.0.0 State |
| :--- | :--- | :--- |
| **Database** | SQLite (File) | **PostgreSQL 15** (Production) |
| **Auth** | Mock/Basic | **OAuth2 + JWT + RBAC** |
| **Frontend** | React SPA | **Vite + Nginx Multi-Stage Docker** |
| **Backend** | Python Script | **FastAPI + Uvicorn + Celery Ready** |
| **Deployment** | Manual | **One-Click Docker Compose** |

---

## 🚀 Deployment Guide
To deploy this release to any Linux server with Docker installed:

1. **Configure Secrets**:
   ```bash
   cp .env.example .env.prod
   # Edit .env.prod with real Google Client ID & Secret Keys
   ```

2. **Launch Stack**:
   ```bash
   ./deploy-prod.sh
   ```

3. **Access**:
   - Web App: `http://localhost` (or your domain)
   - API Docs: `http://localhost/api/docs`

---

## ⚠️ Known Limitations (Alpha)
- **OCR Engine**: Currently uses Regex-based parsing. Production roadmap includes upgrading to LayoutLM/Tesseract.
- **Payments**: "Escrow" is currently disabled in favor of "Settlement Confirmation" until regulatory banking partnerships are finalized.
- **Mobile App**: The React Native codebase requires a synchronous update to match the new API schemas.
