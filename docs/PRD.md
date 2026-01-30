# DWELL INDIA - PRODUCT REQUIREMENTS DOCUMENT (PRD)

## MISSION
Build an owner-verified property marketplace + transaction OS that removes broker noise and enables clean, verified listings across India.

## LAUNCH STRATEGY
**Nationwide-ready architecture**, but initial operational focus on:
- Andhra Pradesh (AP)
- Hyderabad (Telangana)
- Tamil Nadu (TN)

Design rulepacks and workflows per state so expansion is configuration, not code changes.

## TECH STACK
- **Frontend Web**: React + TypeScript
- **Mobile App**: React Native (Expo) + EAS builds
- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL
- **Queue/Background Jobs**: Redis + Celery
- **Storage**: S3-compatible object storage
- **Search**: Postgres full-text initially
- **Versioning**: Git

---

## CORE PLATFORM IDENTITY
**DWELL** = where people find and transact verified property.
**Brand promise**: VERIFIED OWNER LISTINGS ONLY.

---

## MODULE 1 — IDENTITY & ROLES

### Roles
- Buyer (browse + initiate transactions)
- Owner (can list only after verification)
- Authorized Seller (3rd party allowed only with owner authorization proof)
- Internal Reviewer (verification ops)
- Admin/SuperAdmin

### Authentication
- Phone OTP login required for all users.

### Owner Identity KYC
- Aadhaar + PAN required.
- Aadhaar OTP verification.
- PAN validation.
- Owner name from Aadhaar/PAN must match ownership document names (with fuzzy match + human review fallback).

---

## MODULE 2 — OWNER & PROPERTY VERIFICATION ENGINE (CORE DIFFERENTIATOR)

No listing is allowed before verification.

### Required Docs
- Property ownership documents
- Aadhaar (OTP verified)
- PAN

### Verification Logic
1.  Extract owner name from: Sale Deed / Title document, Aadhaar, PAN
2.  Name matching engine (exact + fuzzy).
3.  Property identifiers extracted (survey number, address, plot no.)
4.  Cross-doc validation.
5.  Required docs per state rulepack.
6.  Confidence score (0–100).
7.  Risk flags.

### Decision
- Auto-approve if high score + no major flags.
- Else → human review queue.

---

## AUTHORIZED SELLER (3rd Party) RULES

Goal: prevent fake broker listings.

If someone claims to sell on behalf of owner:
- They must upload: Authorization letter signed by owner, Owner Aadhaar/PAN
- Owner OTP confirmation (owner must log in and digitally confirm authorization)
- Validity period of authorization

Without owner confirmation → listing blocked.
Authorized sellers are tagged: "Authorized Representative" — never shown as owner.
Audit logs mandatory for all authorizations.

---

## MODULE 3 — MARKETPLACE (BUYER SIDE)

Buyers see only:
- Verified listings
- Verification badge
- Summary risk score
- Owner / Authorized Seller tag

### Features
- Search by location (state/city/area)
- Filters: price, type, area
- Save listings
- Start Transaction

### MAP BROWSING
Yes, implement map-enabled browsing from Day 1 (Google Maps).

---

## MODULE 4 — TRANSACTION OS

Workflow from interest → registration-ready.

### Steps
1.  Buyer initiates
2.  Owner accepts
3.  Offer/Negotiation
4.  Token advance (Phase 2 payments)
5.  Agreement draft generation
6.  State-specific checklist
7.  Registration-ready status

Workflow engine must be configurable by state rulepack.

---

## MODULE 5 — LEGAL DRAFTING

Auto-generate:
- Token receipt
- Agreement to sell (basic template)
Templates versioned and state-aware.
PDF export with disclaimers.

---

## MODULE 6 — MONETIZATION MODEL

### MVP
- Owners pay Posting Fee to publish verified listing.
- Buyers use platform free.
- Platform earns:
    - Posting fees
    - Transaction commission (assisted transactions)
    - Service add-ons (legal drafting, verification reports, concierge services)

Payment gateway integration in Phase 2.

---

## MODULE 7 — ADMIN & TRUST/SAFETY

### Admin Tools
- Verification queue
- Listing moderation
- User bans
- Authorization audits
- Dispute management
- State rulepack management

### Safety
- Duplicate listing detection
- Rate limits
- Abuse detection
- Document malware scan
- Full audit logging

---

## SECURITY REQUIREMENTS
- Encrypted document storage
- Signed URL access only
- RBAC enforcement backend-side
- Full audit logs for: verification decisions, listing publish/unpublish, document access, authorizations
- Aadhaar/PAN data handling must be encrypted and minimized
- Strict API rate limiting

---

## DATA MODEL (MINIMUM)
- users
- user_profiles
- roles
- properties
- listings
- listing_media
- documents
- extracted_entities
- verification_cases
- risk_flags
- authorized_seller_links
- transactions
- workflow_steps
- draft_documents
- payments
- notifications
- audit_logs

---

## BUILDER / DEVELOPER ECOSYSTEM (MODULE 8)

Goal: Make DWELL the digital sales and management platform for developers.

### Target Audience
- Construction firms
- Developers with full apartment complexes
- Layout promoters
- Real estate project builders

B2B subscription model.

### Features
1.  **PROJECT PROFILE**: Dedicated branded project page, logo, gallery, floor plans, brochures, amenities, unit availability matrix, pricing slabs, construction status.
2.  **DEDICATED MINI WEBSITE**: Custom microsite (projectname.dwell), SEO optimized, lead capture.
3.  **INVENTORY MANAGEMENT PANEL**: Builder dashboard for units, sold/reserved status, approvals, leads, analytics.
4.  **VERIFIED PROJECT BADGE**: Land title, building approval, layout approval, RERA registration, risk scoring.
5.  **SALES ASSIST TOOLS**: Lead management, inquiry tracking, communication logs, site visit scheduling.
6.  **DIGITAL DOCUMENT CENTER**: Secure storage of brochures, floor plans, approvals, legal docs.
7.  **DWELL FEATURED LISTINGS**: Priority placement.

### Tech Requirements (New Entities)
- builders
- projects
- units
- unit_availability
- project_documents
- project_leads
- project_subscriptions

---

## ROADMAP

Phase 0: Foundations (auth, schema, storage)
Phase 1: Owner verification + listings MVP
Phase 2: Transaction OS + drafting
Phase 3: Hardening + scale + payments
