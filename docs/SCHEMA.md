# DWELL INDIA - DATABASE SCHEMA (PostgreSQL)

## Core Enums

```sql
CREATE TYPE user_role AS ENUM ('buyer', 'owner', 'authorized_seller', 'builder', 'admin', 'reviewer');
CREATE TYPE verification_status AS ENUM ('pending', 'approved', 'rejected', 'needs_review');
CREATE TYPE property_type AS ENUM ('plot', 'flat', 'villa', 'commercial_plot', 'commercial_space', 'agricultural');
CREATE TYPE transaction_status AS ENUM ('initiated', 'offered', 'token_paid', 'drafting', 'registered', 'cancelled');
```

## Tables

### Users & Auth
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    hashed_password VARCHAR(255), -- Or rely on OTP only
    full_name VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE user_roles (
    user_id UUID REFERENCES users(id),
    role user_role NOT NULL,
    PRIMARY KEY (user_id, role)
);

CREATE TABLE kyc_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    document_type VARCHAR(50) NOT NULL, -- 'aadhaar', 'pan'
    document_number_hash VARCHAR(255) NOT NULL, -- Encrypted/Hashed
    s3_key VARCHAR(255) NOT NULL,
    verification_status verification_status DEFAULT 'pending',
    verified_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB -- Extracted names, etc.
);
```

### Properties & Listings
```sql
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    property_type property_type NOT NULL,
    
    -- Location
    address_line TEXT,
    city VARCHAR(100),
    state VARCHAR(100), -- 'AP', 'TS', 'TN'
    pincode VARCHAR(10),
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    survey_number VARCHAR(100),
    
    -- Verification
    verification_score INTEGER DEFAULT 0,
    verification_status verification_status DEFAULT 'pending',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id),
    user_id UUID REFERENCES users(id), -- Could be owner or auth seller
    price DECIMAL(15, 2),
    is_active BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    
    -- Listing specific
    tags VARCHAR[],
    view_count INTEGER DEFAULT 0
);
```

### Documents & Verification
```sql
CREATE TABLE property_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id),
    document_type VARCHAR(50), -- 'sale_deed', 'ec', 'link_doc'
    s3_key VARCHAR(255) NOT NULL,
    extracted_text TEXT, -- For search/validation
    is_verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE verification_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id),
    reviewer_id UUID REFERENCES users(id),
    status verification_status,
    risk_flags JSONB, -- Array of flags
    comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Builders (Module 8)
```sql
CREATE TABLE builders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id), -- Admin user for builder
    company_name VARCHAR(255),
    rera_id VARCHAR(100),
    subscription_tier VARCHAR(50) -- 'basic', 'pro', 'enterprise'
);

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    builder_id UUID REFERENCES builders(id),
    name VARCHAR(255),
    location_lat DECIMAL(9,6),
    location_long DECIMAL(9,6),
    status VARCHAR(50), -- 'pre_launch', 'under_construction', 'ready'
    amenities JSONB,
    description TEXT
);

CREATE TABLE units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id),
    unit_number VARCHAR(50),
    floor_plan_s3 VARCHAR(255),
    status VARCHAR(50), -- 'available', 'reserved', 'sold'
    price DECIMAL(15, 2)
);
```

### Transactions
```sql
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID REFERENCES listings(id),
    buyer_id UUID REFERENCES users(id),
    status transaction_status DEFAULT 'initiated',
    workflow_state JSONB, -- Current step in state rulepack
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Audit
```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES users(id),
    action VARCHAR(100),
    entity_type VARCHAR(50),
    entity_id UUID,
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
