import re

class VerificationService:
    @staticmethod
    def fuzzy_name_match(name1: str, name2: str) -> float:
        """
        Simple fuzzy match score (0-100) between two names.
        In production, this would use Levenshtein distance or a dedicated library like RapidFuzz.
        """
        if not name1 or not name2:
            return 0.0
            
        n1 = re.sub(r'[^A-Z]', '', name1.upper())
        n2 = re.sub(r'[^A-Z]', '', name2.upper())
        
        if n1 == n2:
            return 100.0
            
        # Basic commonality check
        set1 = set(n1)
        set2 = set(n2)
        intersection = set1.intersection(set2)
        score = (len(intersection) / max(len(set1), len(set2))) * 100
        
        return round(score, 2)

    @staticmethod
    def calculate_trust_score(property_data: dict, verified_docs_count: int) -> float:
        """
        Calculates a Trust Score (0-10) based on verified data points.
        """
        score = 5.0 # Base score for listing
        
        # 1. Identity Verification (simulated check)
        if property_data.get("owner_verified", False):
            score += 2.0
            
        # 2. Document Strength
        # Each verified document adds 1.5 points, up to 3 points
        doc_points = min(verified_docs_count * 1.5, 3.0)
        score += doc_points
        
        # 3. Location/Field verification (mock)
        if property_data.get("field_visit_verified", False):
            score += 1.0 # Clean chit from physical visit
            
        return min(round(score, 1), 10.0)

    @staticmethod
    async def verify_document_content(doc_type: str, ocr_text: str, owner_name: str) -> bool:
        """
        Verifies if the document belongs to the owner by name matching.
        """
        entities = await VerificationService.extract_entities(ocr_text)
        
        # If we found an owner name in the doc
        doc_owner = entities.get("owner_name")
        if doc_owner:
            match_score = VerificationService.fuzzy_name_match(owner_name, doc_owner)
            if match_score > 80:
                return True
                
        # Fallback: If no name extracted, check for strict keywords (e.g. Sale Deed number format)
        if doc_type == "sale_deed" and "SALE DEED" in ocr_text.upper():
             # In a real system, we'd verify the deed number with state API
             return True
             
        return False

    @staticmethod
    async def extract_entities(ocr_text: str):
        """
        Extracts key entities (Name, Survey No, Plot No) from document text.
        In production, use LayoutLM or Regex-based patterns per state rulepack.
        """
        entities = {
            "owner_name": None,
            "survey_number": None,
            "plot_number": None,
            "document_type": "unknown"
        }
        
        # Mock extraction logic
        if "SALE DEED" in ocr_text.upper():
            entities["document_type"] = "sale_deed"
        
        # Regex example for Survey Numbers (AP/TS style)
        survey_match = re.search(r'SURVEY\s*(?:NO|NUMBER)[:\s]*([0-9/A-Z]+)', ocr_text, re.IGNORECASE)
        if survey_match:
            entities["survey_number"] = survey_match.group(1)
            
        # Simple name extraction (Capitalized words after 'Sold to' or 'Claimant')
        # This is very naive, for demo only.
        name_match = re.search(r'(?:SOLD TO|CLAIMANT|OWNER)[:\s]+([A-Z ]+)', ocr_text, re.IGNORECASE)
        if name_match:
             entities["owner_name"] = name_match.group(1).strip()
            
        return entities
