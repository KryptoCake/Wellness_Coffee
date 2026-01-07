from sqlalchemy import Column, String, Integer, Float, Boolean, ForeignKey, DateTime, Text, Enum as SQLAlchemyEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
import enum
from app.database import Base

# Enums para opciones limitadas
class PlanType(str, enum.Enum):
    FREE = "FREE"
    NORMAL = "NORMAL"
    PREMIUM = "PREMIUM"

class PersonalityType(str, enum.Enum):
    ZEN = "ZEN"
    HARTMAN = "HARTMAN"
    HOUSE = "HOUSE"
    TRACY = "TRACY"

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=True)
    plan_type = Column(SQLAlchemyEnum(PlanType), default=PlanType.FREE)
    personality_active = Column(SQLAlchemyEnum(PersonalityType), default=PersonalityType.ZEN)
    trial_start_date = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relaciones
    goals = relationship("Goal", back_populates="user")
    expenses = relationship("Expense", back_populates="user")
    contracts = relationship("DisciplineContract", back_populates="user")
    logs = relationship("InteractionLog", back_populates="user")


class Goal(Base):
    __tablename__ = "goals"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    name = Column(String, nullable=False) # e.g., "Hostal Ometepe"
    target_amount = Column(Float, nullable=False)
    current_savings = Column(Float, default=0.0)
    priority = Column(Integer, default=1)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="goals")
    # expenses relationship could be added if we link specific expenses to goals directly (opportunity cost)


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    amount = Column(Float, nullable=False)
    category = Column(String, nullable=False) # e.g., "Impulso", "Comida"
    description = Column(String, nullable=True)
    is_compulsive = Column(Boolean, default=False)
    voice_transcript = Column(Text, nullable=True) # Si vino de un audio
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="expenses")


class DisciplineContract(Base):
    __tablename__ = "discipline_contracts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    signed_at = Column(DateTime, default=datetime.utcnow)
    status = Column(String, default="ACTIVE") # ACTIVE, BROKEN, COMPLETED
    phase = Column(String, default="GREEN") # GREEN, YELLOW, RED (Crisis)
    
    user = relationship("User", back_populates="contracts")


class InteractionLog(Base):
    __tablename__ = "interaction_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    mode = Column(String, default="CHAT") # CHAT or VOICE_PANIC
    input_text = Column(Text, nullable=True)
    ai_response = Column(Text, nullable=True)
    personality_used = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="logs")
