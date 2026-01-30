from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, Enum, JSON, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base
import enum
import uuid
from sqlalchemy.dialects.postgresql import UUID

class UserRole(str, enum.Enum):
    buyer = "buyer"
    owner = "owner"
    authorized_seller = "authorized_seller"
    builder = "builder"
    admin = "admin"
    reviewer = "reviewer"

class PropertyType(str, enum.Enum):
    plot = "plot"
    flat = "flat"
    villa = "villa"
    commercial_plot = "commercial_plot"
    commercial_space = "commercial_space"
    agricultural = "agricultural"

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True, nullable=True)
    google_id = Column(String, unique=True, index=True, nullable=True)
    phone_number = Column(String, unique=True, index=True)
    full_name = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    properties = relationship("Property", back_populates="owner")
    listings = relationship("Listing", back_populates="user")

class Property(Base):
    __tablename__ = "properties"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    owner_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    title = Column(String, index=True)
    description = Column(Text, nullable=True)
    property_type = Column(Enum(PropertyType), nullable=False)
    
    # Location
    address_line = Column(Text, nullable=True)
    city = Column(String, index=True)
    state = Column(String, index=True)
    pincode = Column(String, index=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    
    # Verification
    verification_score = Column(Integer, default=0)
    verification_status = Column(String, default="pending")

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    owner = relationship("User", back_populates="properties")
    documents = relationship("PropertyDocument", back_populates="property")
    listings = relationship("Listing", back_populates="property")

class PropertyDocument(Base):
    __tablename__ = "property_documents"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    property_id = Column(UUID(as_uuid=True), ForeignKey("properties.id"))
    document_type = Column(String, nullable=False)
    s3_key = Column(String, nullable=False)
    extracted_text = Column(Text, nullable=True)
    is_verified = Column(Boolean, default=False)
    
    property = relationship("Property", back_populates="documents")

class Listing(Base):
    __tablename__ = "listings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    property_id = Column(UUID(as_uuid=True), ForeignKey("properties.id"))
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    price = Column(Float, nullable=True)
    is_active = Column(Boolean, default=False)
    published_at = Column(DateTime(timezone=True), nullable=True)

    property = relationship("Property", back_populates="listings")
    user = relationship("User", back_populates="listings")

class Builder(Base):
    __tablename__ = "builders"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    company_name = Column(String, index=True)
    rera_id = Column(String, unique=True, nullable=True)
    subscription_tier = Column(String, default="basic")

    projects = relationship("Project", back_populates="builder")

class Project(Base):
    __tablename__ = "projects"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    builder_id = Column(UUID(as_uuid=True), ForeignKey("builders.id"))
    name = Column(String, index=True)
    description = Column(Text, nullable=True)
    status = Column(String, default="pre_launch") # pre_launch, under_construction, ready
    
    # Location
    location_lat = Column(Float, nullable=True)
    location_long = Column(Float, nullable=True)
    city = Column(String, index=True)
    state = Column(String, index=True)
    
    amenities = Column(JSON, nullable=True)
    
    builder = relationship("Builder", back_populates="projects")
    units = relationship("Unit", back_populates="project")

class Unit(Base):
    __tablename__ = "units"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"))
    unit_number = Column(String, index=True)
    unit_type = Column(String) # 2BHK, 3BHK, Penthouse
    price = Column(Float, nullable=True)
    status = Column(String, default="available") # available, reserved, sold
    
    project = relationship("Project", back_populates="units")

class Deal(Base):
    __tablename__ = "deals"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    listing_id = Column(UUID(as_uuid=True), ForeignKey("listings.id"))
    buyer_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    seller_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    
    status = Column(String, default="initiated") # initiated, offer_made, offer_accepted, token_paid, etc.
    agreed_price = Column(Float, nullable=True)
    token_amount = Column(Float, default=0.0)
    
    current_step = Column(Integer, default=1)
    state_code = Column(String, default="TS") # Default to Telangana
    
    # Funnel Metrics
    intent_score = Column(Float, default=0.0) # 0 to 1 based on engagement
    funnel_stage = Column(String, default="inquiry") # inquiry, lead, prospect, deal, success
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    listing = relationship("Listing")
    buyer = relationship("User", foreign_keys=[buyer_id])
    seller = relationship("User", foreign_keys=[seller_id])
    payments = relationship("PaymentTransaction", back_populates="deal")

class PaymentTransaction(Base):
    __tablename__ = "payment_transactions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    deal_id = Column(UUID(as_uuid=True), ForeignKey("deals.id"))
    transaction_id = Column(String, unique=True) # External TXN ID from gateway
    blockchain_hash = Column(String, nullable=True) # On-chain verification hash
    amount = Column(Float, nullable=False)
    status = Column(String, default="pending") # pending, held_in_escrow, released, refunded
    
    payer_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

    deal = relationship("Deal", back_populates="payments")

class CommunicationSession(Base):
    __tablename__ = "communication_sessions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    deal_id = Column(UUID(as_uuid=True), ForeignKey("deals.id"))
    proxy_number = Column(String)
    buyer_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    seller_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    
    is_active = Column(Boolean, default=True)
    expires_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
