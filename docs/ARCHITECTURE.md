# DWELL INDIA - SYSTEM ARCHITECTURE

## High-Level Architecture

The system is designed as a modular monolith or microservices-ready architecture using FastAPI for Python services. Given the "Nationwide-ready" requirement but initial focus on specific states, the architecture emphasizes configurability (Rulepacks) without hardcoding state logic.

### Components

1.  **Client Applications**
    -   **Web App (Buyer/Owner/Builder)**: React + TypeScript (Vite/Next.js)
    -   **Mobile App (Buyer/Owner)**: React Native (Expo)
    -   **Admin Console**: React + TypeScript (Refine or Custom)

2.  **API Gateway / Load Balancer**
    -   Nginx or Cloud Load Balancer (AWS ALB / GCP LB)
    -   Handles SSL termination, Rate Limiting (Phase 1 can be in app).

3.  **Backend Services (FastAPI)**
    -   **Core Interface Service**: Handles user requests form web/mobile.
    -   **Verification Engine**: Async service for processing documents and running OCR/Validation logic.
    -   **Rule Engine**: Interprets state-specific workflows (JSON/YAML configs).
    -   **Notification Service**: SMS/Email/Push via queues.

4.  **Data Layer**
    -   **Primary DB**: PostgreSQL (Relational data, Users, Listings, Transactions).
    -   **Search Engine**: PostgreSQL Full-Text Search (start), ElasticSearch (scale).
    -   **Cache/Queue**: Redis (Celery broker, Caching).
    -   **Object Storage**: S3-compatible (Documents, Images).

### Verification Flow (Async)

[User Uploads Doc] -> [API] -> [S3] -> [DB Record Created] -> [Push to Celery Queue]
                                                |
                                                v
                                        [Verification Worker]
                                        1. Fetch Doc
                                        2. OCR / Extract Text
                                        3. Fuzzy Match Validation
                                        4. Update Verification Score
                                        5. Notify User

### State Rulepacks Strategy

States differ in:
- Required Documents
- Transaction Workflow Steps
- Legal Templates

**Implementation**:
-   `config/rules/ap.json`
-   `config/rules/tn.json`
-   `config/rules/ts.json`

The backend loads these configs. API responses for "Get Requirements" depend on the selected property location.

## Security & Compliance

-   **Data Privacy**: PII (Aadhaar/PAN) stored encrypted.
-   **Access Control**: RBAC using OAuth2 scopes.
-   **Audit**: Middleware to log every write action to `audit_logs`.

## Deployment (CI/CD)

-   **Containerization**: Docker for all services.
-   **Orchestration**: Docker Compose (Dev), Kubernetes/ECS (Prod).
-   **Pipeline**: GitHub Actions to build & test.
