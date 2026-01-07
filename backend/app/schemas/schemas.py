from pydantic import BaseModel, Field, UUID4
from typing import Optional, List
from datetime import datetime
from app.models.all_models import PlanType, PersonalityType

# --- User Schemas ---
class UserBase(BaseModel):
    email: str
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: UUID4
    plan_type: PlanType
    personality_active: PersonalityType
    created_at: datetime

    class Config:
        from_attributes = True

# --- Goal Schemas ---
class GoalBase(BaseModel):
    name: str = Field(..., description="Nombre del objetivo (ej. Hostal Ometepe)")
    target_amount: float = Field(..., gt=0, description="Monto meta")
    priority: int = Field(default=1, ge=1, le=5)

class GoalCreate(GoalBase):
    pass

class GoalUpdate(BaseModel):
    name: Optional[str] = None
    target_amount: Optional[float] = None
    current_savings: Optional[float] = None
    priority: Optional[int] = None

class GoalResponse(GoalBase):
    id: UUID4
    user_id: UUID4
    current_savings: float
    created_at: datetime

    class Config:
        from_attributes = True

# --- Expense Schemas ---
class ExpenseBase(BaseModel):
    amount: float = Field(..., gt=0)
    category: str
    description: Optional[str] = None
    is_compulsive: bool = False

class ExpenseCreate(ExpenseBase):
    voice_transcript: Optional[str] = None
    # Opcional: vincular un gasto a un goal específico (costo de oportunidad directo)
    # goal_id: Optional[UUID4] = None 

class ExpenseResponse(ExpenseBase):
    id: UUID4
    user_id: UUID4
    created_at: datetime
    voice_transcript: Optional[str] = None

    class Config:
        from_attributes = True
