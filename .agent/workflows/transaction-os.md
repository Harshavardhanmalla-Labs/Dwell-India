---
description: Complete Transaction OS Workflow (Offer to Closing)
---

This workflow describes the end-to-end process for closing a real estate deal on Dwell India, ensuring legal compliance and financial security.

### 1. Offer & Negotiation
- Buyer makes a digital offer via the platform.
- Seller reviews, counters, or accepts.
- A unique `Deal ID` is generated and a dedicated **Deal Room** is created.

### 2. Token Advance (Escrow)
- Buyer pays the agreed 'Token Advance' to the Dwell Escrow account.
- **Verification:**
    - Payment is recorded on a private blockchain (Generating a `TX Hash`).
    - Funds are held in escrow until legal drafting is complete.
- // turbo
- **Action:** Check Deal Room status for `TOKEN SECURED`.

### 3. AI Legal Drafting
- Dwell AI extracts data from:
    - Verified Seller Sale Deeds.
    - Buyer/Seller Aadhaar profiles.
    - State-specific registration rulepacks (e.g., Telangana Registration Act).
- **Output:** A professional `Agreement to Sell` (ATS) in HTML/PDF format.

### 4. Identity Verification & Signing
- **Email Notification:** Professional signing requests are sent to both parties.
- **Biometric/OTP Verification:** 
    - Parties must verify identity via OTP (SMS) or mobile biometrics.
- **Digital Signature:** Documents are signed via a simulated Leegality portal.
- **Hash Pairing:** The final signed document is paired with its original blockchain token hash.

### 5. Closing & Handover
- Agreement is move to the 'Document Vault' as a legally binding PDF.
- System schedules the physical registration at the SRO using the draft generated.

---
**Agent Instruction:** 
When asked to show the "real" flow, navigate to the Deal Room and walk through the dynamic Drafting -> OTP Verification -> Signing sequence.
