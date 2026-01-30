import time
import uuid

class NotificationService:
    @staticmethod
    def send_signing_email(email: str, party_name: str, deal_id: str, signing_url: str):
        """
        Simulates sending a professional signing request email.
        In production, this would use SendGrid/AWS SES.
        """
        email_content = f"""
        Subject: Action Required: Sign Agreement to Sell for {deal_id}
        
        Dear {party_name},
        
        A new document is ready for your signature on Dwell India.
        
        Property: 3BHK Flat, My Home Abhra
        Deal ID: {deal_id}
        
        Please click the link below to verify your identity via OTP and sign the document:
        {signing_url}
        
        This link expires in 48 hours.
        
        Best regards,
        Dwell Legal Team
        """
        print(f"DEBUG: Sending Email to {email}...")
        # Simulate network latency
        time.sleep(1)
        return {"status": "DELIVERED", "message_id": str(uuid.uuid4())}

    @staticmethod
    def send_otp(phone_number: str):
        """
        Simulates sending a 6-digit OTP via SMS.
        """
        otp = "449210" # Mock OTP for demonstration
        print(f"DEBUG: Sending SMS OTP {otp} to {phone_number}...")
        return {"status": "SENT", "phone": phone_number}
