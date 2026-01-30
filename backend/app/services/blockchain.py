import hashlib
import time
import uuid

class BlockchainService:
    @staticmethod
    def generate_transaction_hash(deal_id: str, amount: float, payer_id: str):
        """
        Simulates recording a transaction on a private/side-chain for immutable escrow proof.
        In a real scenario, this would interact with an Ethereum/Polygon RPC.
        """
        # Create a unique block-like string
        payload = f"{deal_id}|{amount}|{payer_id}|{time.time()}"
        block_hash = f"0x{hashlib.sha256(payload.encode()).hexdigest()}"
        
        return {
            "block_hash": block_hash,
            "status": "CONFIRMED",
            "explorer_url": f"https://dwell-chain.io/tx/{block_hash}",
            "immutable_timestamp": time.time()
        }

    @staticmethod
    def verify_on_chain(block_hash: str):
        """
        Simulates verifying that a hash exists on the immutable ledger.
        """
        # In mock, we always verify it's valid if it starts with 0x
        if block_hash.startswith("0x"):
            return True
        return False
