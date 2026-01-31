from enum import Enum
from typing import List, Dict, Any

from sqlalchemy.orm import Session
from ..models import Deal

class TransactionState(str, Enum):
    INITIATED = "initiated"
    OFFER_MADE = "offer_made"
    OFFER_ACCEPTED = "offer_accepted"
    TOKEN_PAID = "token_paid"
    LEGAL_REVIEW = "legal_review"
    DRAFTING = "drafting"
    REGISTRATION_READY = "registration_ready"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class WorkflowEngine:
    """
    State-aware workflow engine for Dwell India.
    Handles different checklists and steps based on Indian state rules (AP, TS, TN).
    """
    
    # State-specific rulepacks
    RULEPACKS = {
        "TS": { # Telangana
            "required_docs": ["Sale Deed", "EC (30 Years)", "LRS (if applicable)", "Tax Receipt"],
            "steps": [
                TransactionState.INITIATED,
                TransactionState.OFFER_MADE,
                TransactionState.TOKEN_PAID,
                TransactionState.DRAFTING,
                TransactionState.REGISTRATION_READY
            ],
            "registration_portal": "DHARANI"
        },
        "AP": { # Andhra Pradesh
            "required_docs": ["Sale Deed", "EC", "Adangal/1B", "Market Value Certificate"],
            "steps": [
                TransactionState.INITIATED,
                TransactionState.OFFER_MADE,
                TransactionState.TOKEN_PAID,
                TransactionState.LEGAL_REVIEW, # AP often requires more manual legal check
                TransactionState.DRAFTING,
                TransactionState.REGISTRATION_READY
            ],
            "registration_portal": "CARD"
        }
    }

    @classmethod
    def transition_deal(cls, db: Session, deal: Deal, action: str):
        """
        Transitions a deal to the next state based on the action and state rules.
        """
        transitions = {
            (TransactionState.INITIATED, "make_offer"): TransactionState.OFFER_MADE,
            (TransactionState.OFFER_MADE, "accept_offer"): TransactionState.OFFER_ACCEPTED,
            (TransactionState.OFFER_ACCEPTED, "pay_token"): TransactionState.TOKEN_PAID,
            (TransactionState.TOKEN_PAID, "start_drafting"): TransactionState.DRAFTING,
            (TransactionState.DRAFTING, "approve_draft"): TransactionState.REGISTRATION_READY,
            (TransactionState.REGISTRATION_READY, "complete"): TransactionState.COMPLETED,
        }
        
        current_state = TransactionState(deal.status)
        new_state = transitions.get((current_state, action), current_state)
        
        deal.status = new_state.value
        db.commit()
        db.refresh(deal)
        return deal

    @classmethod
    def get_checklist(cls, deal: Deal) -> List[str]:
        return cls.RULEPACKS.get(deal.state_code, {}).get("required_docs", [])
