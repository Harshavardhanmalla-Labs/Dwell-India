import uuid
import random

class AIService:
    @staticmethod
    def virtual_staging(original_image_url: str, style: str = "modern"):
        """
        Simulates AI-based virtual staging.
        In production, this would call a Stable Diffusion or ControlNet model
        to furnish an empty room.
        """
        # Mock high-quality staged images (using unsplash placeholders for demo)
        staged_images = {
            "modern": "https://images.unsplash.com/photo-1554995207-c18c20360a59?auto=format&fit=crop&w=1200&q=80",
            "minimalist": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
            "industrial": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
        }
        
        return {
            "original": original_image_url,
            "staged": staged_images.get(style, staged_images["modern"]),
            "style_applied": style,
            "render_id": f"AI_RD_{uuid.uuid4().hex[:6].upper()}",
            "confidence": 0.98
        }

    @staticmethod
    def generate_legal_draft(deal_id: str, property_state: str):
        """
        Simulates an LLM chain for legal drafting.
        1. Context Loading (Aadhaar, Sale Deed, Encumbrance Certificate)
        2. Clause Matching (based on State Rulepack)
        3. Draft Generation
        """
        extraction_steps = [
            "Analyzing Sale Deed (SRO Volume 4492)...",
            f"Matching clauses for {property_state} Registration Rules...",
            "Validating Token Hash on-chain...",
            "Compiling final Agreement to Sell draft..."
        ]
        
        return {
            "deal_id": deal_id,
            "steps": extraction_steps,
            "status": "DRAFT_GENERATED",
            "document_type": "Agreement to Sell (ATS)",
            "ai_metadata": {
                "model": "Dwell-Legal-LLM-v1",
                "law_reference": f"{property_state}_REG_ACT_1908",
                "accuracy": 0.99
            }
        }
