from pydantic import BaseModel, UUID4
from typing import Optional, List
from datetime import datetime
from enum import Enum

class UserBase(BaseModel):
    phone_number: str
    full_name: Optional[str] = None

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: UUID4
    is_active: bool
    created_at: datetime

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
