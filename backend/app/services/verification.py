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
            
        return entities
