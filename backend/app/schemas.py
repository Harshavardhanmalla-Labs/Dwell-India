from pydantic import BaseModel, UUID4, EmailStr
from typing import Optional, List
from datetime import datetime
from enum import Enum
from .models import UserRole

class Token(BaseModel):
    access_token: str
    token_type: str
    refresh_token: str

class TokenPayload(BaseModel):
    sub: Optional[str] = None
    type: str

class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    google_id: Optional[str] = None
    phone_number: Optional[str] = None
    full_name: Optional[str] = None
    role: UserRole = UserRole.buyer

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: UUID4
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class PropertyBase(BaseModel):
    title: str
    description: Optional[str] = None
    property_type: str
    city: str
    state: str
    price_expectation: Optional[float] = None

class PropertyCreate(PropertyBase):
    pass

class Property(PropertyBase):
    id: UUID4
    owner_id: UUID4
    verification_status: str
    created_at: datetime
    
    class Config:
        from_attributes = True
