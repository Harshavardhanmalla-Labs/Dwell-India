import pytest
from app.services.workflow import WorkflowEngine, TransactionState
from app.models import Deal

def test_workflow_transitions(db_session):
    # Setup mock deal
    deal = Deal(id="test-deal-1", status=TransactionState.DRAFTING.value, state_code="TS")
    db_session.add(deal)
    db_session.commit()
    
    # Test 1: Confirm Settlement
    # DRAFTING -> SETTLEMENT_CONFIRMED
    updated_deal = WorkflowEngine.transition_deal(db_session, deal, "confirm_settlement")
    assert updated_deal.status == TransactionState.SETTLEMENT_CONFIRMED.value
    
    # Test 2: Ready for Registration
    # SETTLEMENT_CONFIRMED -> REGISTRATION_READY
    updated_deal = WorkflowEngine.transition_deal(db_session, deal, "ready_registration")
    assert updated_deal.status == TransactionState.REGISTRATION_READY.value

def test_state_specific_checklist():
    # Telangana Check
    deal_ts = Deal(state_code="TS")
    checklist_ts = WorkflowEngine.get_checklist(deal_ts)
    assert "LRS (if applicable)" in checklist_ts
    
    # Andhra Check
    deal_ap = Deal(state_code="AP")
    checklist_ap = WorkflowEngine.get_checklist(deal_ap)
    assert "Adangal/1B" in checklist_ap
