from app.database import SessionLocal, engine
from app import models
import uuid
from datetime import datetime

def seed_db():
    # Ensure tables exist
    models.Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    # Check if we already have users
    if db.query(models.User).first():
        print("Data already exists. Skipping seed.")
        return

    print("Seeding database...")
    
    # 1. Create Users
    owner1 = models.User(
        id=uuid.uuid4(),
        full_name="Rajesh Kumar",
        email="rajesh@example.com",
        phone_number="+91-9876543210",
        google_id="google-owner-1"
    )
    
    builder1 = models.User(
        id=uuid.uuid4(),
        full_name="Aditya Builders",
        email="contact@adityabuilders.in",
        phone_number="+91-8001234567",
        google_id="google-builder-1"
    )
    
    buyer1 = models.User(
        id=uuid.uuid4(),
        full_name="Harsha Malla",
        email="harsha@dwellindia.io",
        phone_number="+91-9988776655",
        google_id="google-buyer-1"
    )
    
    db.add_all([owner1, builder1, buyer1])
    db.commit()
    
    # 2. Create Builder Profile
    builder_profile = models.Builder(
        id=uuid.uuid4(),
        user_id=builder1.id,
        company_name="Aditya Infrastructure Ltd",
        rera_id="TS/RERA/2023/500",
        subscription_tier="premium"
    )
    db.add(builder_profile)
    db.commit()
    
    # 3. Create Project
    project1 = models.Project(
        id=uuid.uuid4(),
        builder_id=builder_profile.id,
        name="Skyline Heights",
        description="Luxury 3BHK apartments in the heart of Gachibowli, featuring automated home systems and 360-degree city views.",
        status="under_construction",
        city="Hyderabad",
        state="Telangana",
        location_lat=17.44,
        location_long=78.34,
        amenities=["Pool", "Gym", "Clubhouse", "24/7 Security", "EV Charging"]
    )
    db.add(project1)
    db.commit()
    
    # 4. Create Units for Project
    unit1 = models.Unit(
        id=uuid.uuid4(),
        project_id=project1.id,
        unit_number="Flat 402",
        unit_type="3BHK",
        price=14500000.0,
        status="available"
    )
    unit2 = models.Unit(
        id=uuid.uuid4(),
        project_id=project1.id,
        unit_number="Flat 505",
        unit_type="2BHK",
        price=9500000.0,
        status="available"
    )
    db.add_all([unit1, unit2])
    db.commit()
    
    # 5. Create Standalone Property (Resale)
    prop1 = models.Property(
        id=uuid.uuid4(),
        owner_id=owner1.id,
        title="East Facing Villa - Green Meadows",
        description="Beautiful villa with a private garden and solar panels. Recently renovated and 100% Vasthu compliant.",
        property_type=models.PropertyType.villa,
        address_line="Villa 12, Road No. 4, Kondapur",
        city="Hyderabad",
        state="Telangana",
        pincode="500084",
        verification_status="verified",
        verification_score=95
    )
    db.add(prop1)
    db.commit()
    
    # 6. Create Listings
    listing1 = models.Listing(
        id=uuid.uuid4(),
        property_id=prop1.id,
        user_id=owner1.id,
        price=32000000.0,
        is_active=True,
        published_at=datetime.now()
    )
    db.add(listing1)
    db.commit()
    
    # 7. Create a Deal for the buyer
    deal1 = models.Deal(
        id=uuid.uuid4(),
        listing_id=listing1.id,
        buyer_id=buyer1.id,
        seller_id=owner1.id,
        status="offer_accepted",
        agreed_price=31500000.0,
        token_amount=100000.0,
        current_step=3,
        state_code="TS",
        intent_score=0.92,
        funnel_stage="prospect"
    )
    db.add(deal1)
    db.commit()

    print("Seed complete!")

if __name__ == "__main__":
    seed_db()
