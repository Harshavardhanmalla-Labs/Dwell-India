import pytest
from app.services.verification import VerificationService

@pytest.mark.asyncio
async def test_fuzzy_name_match():
    # Exact match
    score = VerificationService.fuzzy_name_match("Rahul Sharma", "Rahul Sharma")
    assert score == 100.0

    # Case insensitive
    score = VerificationService.fuzzy_name_match("Rahul Sharma", "RAHUL SHARMA")
    assert score == 100.0

    # Mismatch
    score = VerificationService.fuzzy_name_match("Rahul Sharma", "Steve Jobs")
    assert score < 50.0

@pytest.mark.asyncio
async def test_extract_entities_sale_deed():
    sample_ocr = """
    REGISTERED SALE DEED
    Document No: 1234/2023
    CLAIMANT: VIKRAM REDDY
    SURVEY NUMBER: 45/A
    """
    
    entities = await VerificationService.extract_entities(sample_ocr)
    
    assert entities["document_type"] == "sale_deed"
    assert entities["owner_name"] == "VIKRAM REDDY"
    assert entities["survey_number"] == "45/A"

@pytest.mark.asyncio
async def test_calculate_trust_score():
    # Scenario 1: Perfect verification
    data = {
        "owner_verified": True,
        "field_visit_verified": True
    }
    # Base 5 + 2 (Identity) + 1 (Field) + 3 (Docs max) -> 11 (capped at 10)
    score = VerificationService.calculate_trust_score(data, verified_docs_count=5)
    assert score == 10.0

    # Scenario 2: Basic Listing
    data = {
        "owner_verified": False,
        "field_visit_verified": False
    }
    # Base 5 + 0 + 0 + 1.5 (1 doc) -> 6.5
    score = VerificationService.calculate_trust_score(data, verified_docs_count=1)
    assert score == 6.5
