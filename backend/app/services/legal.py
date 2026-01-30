import uuid
from datetime import datetime

class LegalDraftService:
    @staticmethod
    def generate_token_receipt(buyer_name: str, owner_name: str, property_desc: str, amount: float):
        """
        Generates a basic token receipt text.
        In production, this would use a docx/pdf template library.
        """
        return f"""
        TOKEN RECEIPT
        
        This receipt acknowledges that {buyer_name} has paid a sum of 
        INR {amount}/- (Rupees only) to {owner_name} 
        as a token advance for the property: {property_desc}.
        
        This amount is non-refundable if the buyer fails to complete 
        the transaction within the agreed timeframe.
        
        Dwell Verification Trace ID: DWL-TX-REC-9942
        Date: 2026-01-30
        """

    @staticmethod
    def initiate_digital_signature(doc_id: str, signers: list):
        """
        Simulates Leegality/DocuSign API call to initiate a signing flow.
        """
        signature_request_id = f"SIG_{str(uuid.uuid4())[:8].upper()}"
        return {
            "signature_request_id": signature_request_id,
            "document_id": doc_id,
            "signers_count": len(signers),
            "status": "SENT",
            "signing_url": f"https://dwell.india/sign/{signature_request_id}"
        }

    @staticmethod
    def verify_signature(signature_request_id: str):
        """
        Verifies if all parties have signed.
        """
        return {
            "signature_request_id": signature_request_id,
            "all_signed": True,
            "signed_at": datetime.now().isoformat()
        }
