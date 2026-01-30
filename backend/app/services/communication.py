from sqlalchemy.orm import Session
from .models import CommunicationSession
import uuid
from datetime import datetime, timedelta

class CommunicationService:
    @staticmethod
    def create_masked_session(db: Session, deal_id: str, buyer_id: str, seller_id: str):
        """
        Creates a persistent virtual bridge in the database.
        """
        proxy_number = "+91 800-DWELL-01" 
        session = CommunicationSession(
            deal_id=deal_id,
            proxy_number=proxy_number,
            buyer_id=buyer_id,
            seller_id=seller_id,
            expires_at=datetime.utcnow() + timedelta(hours=1)
        )
        db.add(session)
        db.commit()
        db.refresh(session)
        
        return session

    @staticmethod
    def deactivate_session(db: Session, session_id: str):
        session = db.query(CommunicationSession).filter(CommunicationSession.id == session_id).first()
        if session:
            session.is_active = False
            db.commit()
        return session
