from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional
from uuid import UUID

from app.database import get_db
from app.models.all_models import Expense, User, Goal
from app.schemas.schemas import ExpenseCreate, ExpenseResponse

router = APIRouter()

@router.post("/", response_model=ExpenseResponse, status_code=status.HTTP_201_CREATED)
async def create_expense(expense: ExpenseCreate, db: AsyncSession = Depends(get_db)):
    """
    Registra un nuevo gasto. 
    Aquí es donde en el futuro calcularemos el impacto negativo en los Goals.
    """
    # Hack temporal para obtener usuario demo (mismo que en goals)
    result = await db.execute(select(User).limit(1))
    user = result.scalars().first()
    
    if not user:
        # Si no hay usuario, lanzamos error (asumimos que goals ya creó uno o el seeder corrió)
        raise HTTPException(status_code=400, detail="No users found. Please create a goal first to init user.")
    
    new_expense = Expense(
        user_id=user.id,
        amount=expense.amount,
        category=expense.category,
        description=expense.description,
        is_compulsive=expense.is_compulsive,
        voice_transcript=expense.voice_transcript
    )
    
    db.add(new_expense)
    
    # Lógica de "Costo de Oportunidad" (Simplificada)
    # Si el gasto es compulsivo, podríamos restar "crédito moral" o simplemente registrarlo.
    # En la versión completa, aquí llamaríamos al AI Service para generar una "reprimenda" si es Hartman.
    
    await db.commit()
    await db.refresh(new_expense)
    return new_expense

@router.get("/", response_model=List[ExpenseResponse])
async def read_expenses(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Expense).order_by(Expense.created_at.desc()).offset(skip).limit(limit))
    expenses = result.scalars().all()
    return expenses

@router.get("/summary")
async def get_expense_summary(db: AsyncSession = Depends(get_db)):
    """
    Retorna el total gastado vs total ahorrado (goals).
    Ideal para el dashboard.
    """
    # Total Expenses
    # Nota: SQLAlchemy async requiere una sintaxis especifica para funciones de agregación,
    # pero para el MVP iteraremos en python o usaremos raw SQL si es necesario.
    # Por simplicidad ahora, traemos todos y sumamos (no escalable, pero funcional para prototipo)
    
    exp_result = await db.execute(select(Expense))
    expenses = exp_result.scalars().all()
    total_spent = sum(e.amount for e in expenses)
    total_compulsive = sum(e.amount for e in expenses if e.is_compulsive)
    
    # Total Saved (Goals current_savings)
    goal_result = await db.execute(select(Goal))
    goals = goal_result.scalars().all()
    total_saved = sum(g.current_savings for g in goals)
    
    return {
        "total_spent": total_spent,
        "compulsive_leak": total_compulsive, # La "fuga"
        "capital_rescued": total_saved # Asumimos que lo ahorrado es lo rescatado
    }
