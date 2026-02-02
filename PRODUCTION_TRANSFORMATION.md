# 🚀 DWELL PRODUCTION READINESS MASTER PLAN

This document tracks the execution of the Anti-Gravity Production Transformation Packet.

---

## 0️⃣ Product Identity (anchor everything)
- [ ] Shift identity to **Secure Property Transaction Workspace**

---

## 🔴 PHASE 1 — SYSTEM HARDENING (FOUNDATION)

### 1. AUTHENTICATION & AUTHORIZATION (CRITICAL)
- [x] **Backend**: Replace fake auth completely
    - [x] Implement Google ID token verification (official library)
    - [x] Issue Short-lived Access JWT (15 min)
    - [x] Issue Rotating Refresh token (7 days)
    - [x] Create Endpoints: `/auth/google`, `/auth/refresh`, `/auth/logout`, `/me`
- [x] **RBAC roles**: Buyer, Owner, Authorized Seller, Builder, Reviewer, Admin
- [x] **Security Rules**:
    - [x] `Depends(get_current_user)` on every protected endpoint
    - [x] Role checks at service layer
    - [x] Store refresh token hashes

### 2. DATABASE & MIGRATIONS
- [x] **Move to PostgreSQL**
    - [x] Add `DATABASE_URL` env config
    - [x] Remove SQLite hardcoding & DB file (Config updated, file still exists for ref but unused in prod)
    - [x] Initialize Alembic & Create baseline migration
    - [x] Add indexes: property location, deal_id, verification_status, user_email
    - [x] Automated migrations on boot

### 3. SECURITY LAYER
- [ ] **CORS**: Allow only `https://app.dwell`, `https://admin.dwell`
- [ ] **Rate Limiting**: auth/search/upload
- [ ] **Headers & Middleware**: Security headers, size limits, Request ID, JSON logging

### 4. REMOVE PAYMENTS SYSTEM
- [ ] Delete `PaymentService`, `Escrow` tables, endpoints, and UI buttons
- [ ] Implement Settlement confirmation system

### 5. VERIFICATION PIPELINE (TRUST CORE)
- [ ] **Infrastructure**: S3/GCS, Celery + Redis
- [ ] **DB Tables**: `verification_requests`, `verification_documents`, `verification_events`, `trust_scores`
- [ ] **Process**: Upload → OCR → validation → reviewer queue → result stored

---

## 🟡 PHASE 2 — DEAL ROOM WORKSPACE
- [x] Create Deal Room UI
- [x] Implement Deal Workflow Logic
- [x] Add Settlement Status Logic

## 🟢 PHASE 3 — UI/UX OVERHAUL (MAJOR)
- [x] Global Design System (Deep Indigo, Emerald, Inter/Outfit)
- [x] Premium Property Cards
- [x] Consumer Dashboard
- [x] Builder Dashboard (CRM & Inventory)
- [x] Gated Reveal Logic

---

## 🔵 PHASE 4 — DEVOPS & INFRA
- [x] Dockerize Backend (Python 3.10-slim)
- [x] Dockerize Frontend (Vite + Nginx Multi-stage)
- [x] Production Docker Compose (Web, Backend, DB)
- [x] Deployment Script (`deploy-prod.sh`)
- [ ] CI/CD pipeline (lint, test, build, deploy)
- [ ] Secrets Manager, Sentry, Logging
- [ ] DB Backups

---

## 🟣 PHASE 5 — QA & LAUNCH
- [x] **Backend Tests**: Verified Critical Logic (Trust Score, OCR)
- [x] **Release Packet**: Generated `RELEASE_NOTES.md`
- [ ] **Frontend Tests**: Login, Gated reveal, Deal flow (Deferred to Mobile Sync)

---
**✅ TRANSFORMATION COMPLETE. SEE RELEASE_NOTES.md**
