from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import get_db, engine, Base
from . import models
from .services.search import SearchService
from .services.payment import PaymentService
from .services.communication import CommunicationService
from .services.workflow import WorkflowEngine
from .services.legal import LegalDraftService
from .services.ai import AIService

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Dwell India API",
    description="Backend for Dwell India Property Marketplace",
    version="0.1.0"
)

# CORS Configuration
origins = ["*"] # Production should be restricted

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/health")
async def health_check():
    return {"status": "ok"}

# Internal Verification Engine (Truth Engine)
@app.post("/verify/documents")
async def upload_for_verification():
    return {"status": "processing", "message": "Document integrity check initiated"}

@app.post("/verify/live-360")
async def verify_live_capture():
    return {"status": "verified", "confidence_score": 98.5}

@app.get("/listings/{listing_id}/trust-report")
async def get_trust_report(listing_id: str):
    return {
        "listing_id": listing_id,
        "is_verified": True,
        "verification_date": "2026-01-30",
        "verified_fields": ["ownership", "physical_possession", "identity"],
        "notice": "Raw documents are kept in an encrypted internal vault and never shared."
    }

@app.get("/")
async def root():
    return {"message": "Welcome to Dwell India API", "status": "operational"}

@app.get("/search/conversational")
async def conversational_search(q: str, db: Session = Depends(get_db)):
    results = SearchService.semantic_search(db, q)
    interpretation = SearchService.get_ai_interpretation(q)
    return {
        "query": q,
        "results": results,
        "interpretation": interpretation
    }

# Transaction OS Endpoints
@app.post("/transactions/initiate-escrow")
async def initiate_escrow(deal_id: str, amount: float, payer_id: str, db: Session = Depends(get_db)):
    payment = PaymentService.initiate_token_payment(db, deal_id, amount, payer_id)
    return payment

@app.post("/transactions/verify-payment")
async def verify_payment(transaction_id: str, db: Session = Depends(get_db)):
    payment = PaymentService.verify_payment(db, transaction_id)
    if not payment:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return payment

@app.post("/transactions/comm/bridge")
async def create_comm_bridge(deal_id: str, buyer_id: str, seller_id: str, db: Session = Depends(get_db)):
    session = CommunicationService.create_masked_session(db, deal_id, buyer_id, seller_id)
    return session

@app.post("/transactions/initiate-signature")
async def initiate_signature(doc_id: str, signers: list):
    return LegalDraftService.initiate_digital_signature(doc_id, signers)

@app.post("/ai/virtual-staging")
async def virtual_staging(image_url: str, style: str = "modern"):
    return AIService.virtual_staging(image_url, style)

@app.get("/transactions/{deal_id}/status")
async def get_transaction_status(deal_id: str, db: Session = Depends(get_db)):
    deal = db.query(models.Deal).filter(models.Deal.id == deal_id).first()
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")
    
    checklist = WorkflowEngine.get_checklist(deal)
    return {
        "deal": deal,
        "checklist": checklist
    }
