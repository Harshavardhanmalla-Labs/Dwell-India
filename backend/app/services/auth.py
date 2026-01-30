from sqlalchemy.orm import Session
from .. import models
import uuid

class AuthService:
    @staticmethod
    def login_via_google(db: Session, google_data: dict):
        """
        Simulates Google OAuth user registration/login.
        In production, this would verify the ID token from Google.
        """
        google_id = google_data.get("google_id")
        email = google_data.get("email")
        name = google_data.get("name")
        
        # Check if user exists
        user = db.query(models.User).filter(models.User.google_id == google_id).first()
        
        if not user:
            # Create new user
            user = models.User(
                id=uuid.uuid4(),
                google_id=google_id,
                email=email,
                full_name=name,
                phone_number=f"+91-{str(uuid.uuid4().int)[:10]}" # Mock phone for new user
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            
        return user

    @staticmethod
    def get_public_property_data(property_obj: models.Property):
        """
        Redacts sensitive info for unauthenticated users.
        """
        active_listing = next((l for l in property_obj.listings if l.is_active), None)
        return {
            "id": property_obj.id,
            "title": property_obj.title,
            "description": property_obj.description,
            "property_type": property_obj.property_type,
            "city": property_obj.city,
            "state": property_obj.state,
            "price": active_listing.price if active_listing else 0,
            "verification_status": property_obj.verification_status,
            "gated": True,
            "message": "Sign in with Google to view full address, legal documents, and owner contact."
        }

    @staticmethod
    def get_private_property_data(property_obj: models.Property):
        """
        Full data access for authenticated users.
        """
        active_listing = next((l for l in property_obj.listings if l.is_active), None)
        return {
            "id": property_obj.id,
            "title": property_obj.title,
            "description": property_obj.description,
            "property_type": property_obj.property_type,
            "city": property_obj.city,
            "state": property_obj.state,
            "address_line": property_obj.address_line,
            "pincode": property_obj.pincode,
            "price": active_listing.price if active_listing else 0,
            "verification_status": property_obj.verification_status,
            "verification_score": property_obj.verification_score,
            "gated": False
        }
