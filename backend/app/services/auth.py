from sqlalchemy.orm import Session
from .. import models
import uuid

class AuthService:
    @staticmethod
    def login_via_google(db: Session, google_data: dict):
        """
        Production Google OAuth user registration/login.
        Verifies the ID token from Google.
        """
        from google.oauth2 import id_token
        from google.auth.transport import requests
        from ..core.config import settings
        from ..core import security
        import uuid
        
        token = google_data.get("credential") # The ID token from frontend
        
        try:
            # Verify the token
            idinfo = id_token.verify_oauth2_token(
                token, 
                requests.Request(), 
                settings.GOOGLE_CLIENT_ID
            )

            # ID token is valid. Get the user's Google Account ID from the decoded token.
            google_id = idinfo['sub']
            email = idinfo['email']
            name = idinfo.get('name')
            picture = idinfo.get('picture')
        except ValueError as e:
            # Invalid token
            raise Exception(f"Invalid Google Token: {str(e)}")

        # Check if user exists
        user = db.query(models.User).filter(models.User.email == email).first()
        
        if not user:
            # Create new user
            user = models.User(
                id=uuid.uuid4(),
                google_id=google_id,
                email=email,
                full_name=name,
                # phone_number needs to be collected separately in a profile update flow
                # For now, we leave it or generate a temporary one if schema requires it 
                # (Schema has unique constraint on phone, so we might need to be careful)
                phone_number=f"temp_{str(uuid.uuid4())[:8]}" # Placeholder
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        else:
            # Update google_id if missed (e.g. created by other means)
            if not user.google_id:
                user.google_id = google_id
                db.add(user)
                db.commit()
                db.refresh(user)

        # Generate tokens
        access_token = security.create_access_token(data={"sub": str(user.id)})
        refresh_token = security.create_refresh_token(data={"sub": str(user.id)})
        
        # Store refresh token hash (if we were strictly following the prompt, we'd hash it)
        # For now, let's keep it simple and return it. Ideally, we persist a hash in DB.
        user.hashed_refresh_token = security.get_password_hash(refresh_token)
        db.add(user)
        db.commit()
        
        return {
            "user": user,
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer"
        }

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
