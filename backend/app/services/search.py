from sqlalchemy.orm import Session
from ..models import Listing, Property
from typing import List

class SearchService:
    @staticmethod
    def semantic_search(db: Session, query: str) -> List[Listing]:
        """
        Performs a real database search for listings.
        Currently uses basic SQL filters, ready for pgvector upgrade.
        """
        # Simple keyword matching as a baseline for 'real' data
        query_words = query.lower().split()
        
        results = db.query(Listing).join(Property).filter(
            (Listing.is_active == True) &
            (
                Property.city.ilike(f"%{query}%") |
                Property.title.ilike(f"%{query}%") |
                Property.description.ilike(f"%{query}%")
            )
        ).limit(10).all()
        
        return results

    @staticmethod
    def get_ai_interpretation(query: str):
        """
        Interprets natural language queries into filter parameters.
        """
        query_lower = query.lower()
        return {
            "query": query,
            "interpreted_filters": {
                "bhk": 3 if "3bhk" in query_lower else 2 if "2bhk" in query_lower else None,
                "city": "Hyderabad" if "hyderabad" in query_lower else None,
                "type": "plot" if "plot" in query_lower else "apartment" if "flat" in query_lower or "apartment" in query_lower else None
            }
        }
