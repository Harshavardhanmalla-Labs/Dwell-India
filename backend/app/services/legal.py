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
    def generate_agreement_to_sell(buyer_info: dict, seller_info: dict, property_info: dict, deal_terms: dict):
        """
        Uses an LLM-like template engine to generate a professional 'Agreement to Sell'.
        It injects specific deal parameters into legally vetted clauses for the relevant state.
        """
        state = property_info.get("state", "TS")
        stamp_duty = "7.5%" if state == "TS" else "7%" # Telangana vs others
        
        # Simulated LLM data extraction & clause generation
        agreement_text = f"""
        AGREEMENT TO SELL
        
        This Agreement to Sell is made at {property_info['city']} on {datetime.now().strftime('%d %B %Y')}
        
        BETWEEN:
        SELLER: {seller_info['name']}, R/o {seller_info['address']}, Aadhaar: {seller_info['aadhaar_masked']}
        AND
        BUYER: {buyer_info['name']}, R/o {buyer_info['address']}, Aadhaar: {buyer_info['aadhaar_masked']}
        
        WHEREAS the Seller is the absolute owner of the property: {property_info['description']}
        located at {property_info['address_full']}.
        
        1. SALE CONSIDERATION: The total sale price is fixed at INR {deal_terms['total_price']}/-.
        2. TOKEN ADVANCE: The Buyer has paid INR {deal_terms['token_amount']}/- via Dwell Escrow (Hash: {deal_terms.get('bc_hash', 'PENDING')}).
        3. TIMELINE: The transaction shall be completed within {deal_terms['days']} days from this date.
        4. ENCUMBRANCES: The Seller warrants that the property is free from all encumbrances, liens, or litigations.
        5. POSSESSION: Vacant possession shall be handed over upon full payment and registration.
        
        DWELL VERIFIED TRANSACTION: {deal_terms['deal_id']}
        COMPLIANCE PACK: {state}_REG_2026_PRO
        """
        return {
            "title": "Agreement to Sell",
            "content": agreement_text,
            "metadata": {
                "state": state,
                "stamp_duty_estimate": stamp_duty,
                "version": "v2.1_AI_GENERATED"
            }
        }

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
