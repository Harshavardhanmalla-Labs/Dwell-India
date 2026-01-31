from sqlalchemy.orm import Session
from ..models import PaymentTransaction, Deal
import uuid
from datetime import datetime
from enum import Enum

class PaymentStatus(Enum):
    PENDING = "PENDING"
    ESCROW_HELD = "ESCROW_HELD"
    RELEASED = "RELEASED"
    REFUNDED = "REFUNDED"

class PaymentService:
    @staticmethod
    def initiate_token_payment(db: Session, deal_id: str, amount: float, payer_id: str):
        """
        Creates a real payment transaction record in the database.
        """
        transaction_id = f"TXN_{uuid.uuid4().hex[:8].upper()}"
        payment = PaymentTransaction(
            deal_id=deal_id,
            amount=amount,
            payer_id=payer_id,
            transaction_id=transaction_id,
            status=PaymentStatus.PENDING.value
        )
        db.add(payment)
        db.commit()
        db.refresh(payment)
        return payment

    @staticmethod
    def verify_payment(db: Session, transaction_id: str):
        """
        Updates the payment status to ESCROW_HELD once verified and records it on blockchain.
        """
        payment = db.query(PaymentTransaction).filter(PaymentTransaction.transaction_id == transaction_id).first()
        if payment:
            payment.status = PaymentStatus.ESCROW_HELD.value
            
            # Generate Blockchain Proof
            from .blockchain import BlockchainService
            bc_data = BlockchainService.generate_transaction_hash(
                str(payment.deal_id), 
                payment.amount, 
                str(payment.payer_id)
            )
            payment.blockchain_hash = bc_data["block_hash"]
            
            # Also update the deal status and funnel stage
            deal = db.query(Deal).filter(Deal.id == payment.deal_id).first()
            if deal:
                deal.status = "token_paid"
                deal.token_amount = payment.amount
                deal.funnel_stage = "prospect" # User has paid, now a high-intent prospect
                deal.intent_score = 0.9 # High probability of closing
            
            db.commit()
            db.refresh(payment)
        return payment

    @staticmethod
    def release_to_seller(db: Session, deal_id: str):
        """
        Disburses escrowed funds to the seller.
        """
        payment = db.query(PaymentTransaction).filter(
            PaymentTransaction.deal_id == deal_id,
            PaymentTransaction.status == PaymentStatus.ESCROW_HELD.value
        ).first()
        
        if payment:
            payment.status = PaymentStatus.RELEASED.value
            db.commit()
            db.refresh(payment)
        return payment
