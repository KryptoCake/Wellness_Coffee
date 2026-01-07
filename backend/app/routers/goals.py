from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from uuid import UUID

from app.database import get_db
from app.models.all_models import Goal, User
from app.schemas.schemas import GoalCreate, GoalResponse, GoalUpdate

router = APIRouter()

# TODO: En una app real, obtendríamos el user_id del token JWT. 
# Por ahora, usaremos un user_id hardcodeado o pasado como header para el MVP.
FAKE_USER_ID = "00000000-0000-0000-0000-000000000000" # Placeholder

@router.post("/", response_model=GoalResponse, status_code=status.HTTP_201_CREATED)
async def create_goal(goal: GoalCreate, db: AsyncSession = Depends(get_db)):
    """
    Crea una nueva meta financiera (ej. 'Hostal Ometepe').
    """
    # En producción: user_id = current_user.id
    # Para MVP: Primero buscamos si existe un usuario, si no, creamos uno default (demo)
    # Esto es un hack temporal para que Antigravity pueda probar sin login complejo
    result = await db.execute(select(User).limit(1))
    user = result.scalars().first()
    
    if not user:
        # Crear usuario demo si la base está vacía
        import uuid
        from app.models.all_models import PlanType, PersonalityType
        new_user = User(
            id=uuid.UUID(FAKE_USER_ID),
            email="german@wellness.coffee", 
            hashed_password="hashed_secret",
            plan_type=PlanType.PREMIUM,
            personality_active=PersonalityType.HARTMAN
        )
        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)
        user_id = new_user.id
    else:
        user_id = user.id

    new_goal = Goal(
        user_id=user_id,
        name=goal.name,
        target_amount=goal.target_amount,
        priority=goal.priority,
        current_savings=0.0
    )
    
    db.add(new_goal)
    await db.commit()
    await db.refresh(new_goal)
    return new_goal

@router.get("/", response_model=List[GoalResponse])
async def read_goals(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    """
    Obtiene la lista de metas del usuario.
    """
    # Filtrar por usuario en producción
    result = await db.execute(select(Goal).offset(skip).limit(limit))
    goals = result.scalars().all()
    return goals

@router.get("/{goal_id}", response_model=GoalResponse)
async def read_goal(goal_id: UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Goal).where(Goal.id == goal_id))
    goal = result.scalars().first()
    if goal is None:
        raise HTTPException(status_code=404, detail="Goal not found")
    return goal

@router.patch("/{goal_id}", response_model=GoalResponse)
async def update_goal(goal_id: UUID, goal_update: GoalUpdate, db: AsyncSession = Depends(get_db)):
    """
    Actualiza el progreso o detalles de una meta.
    """
    result = await db.execute(select(Goal).where(Goal.id == goal_id))
    db_goal = result.scalars().first()
    if db_goal is None:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    update_data = goal_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_goal, key, value)
    
    await db.commit()
    await db.refresh(db_goal)
    return db_goal
