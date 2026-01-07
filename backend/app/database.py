from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

# Construir URL de base de datos.
# Nota: En Docker usamos el nombre del servicio 'db', localmente localhost.
# La URL debe empezar con postgresql+asyncpg://
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+psycopg://wellness_admin:change_this_secure_password@localhost/wellness_coffee")

engine = create_async_engine(
    DATABASE_URL,
    echo=True, # Log SQL queries (disable in production)
    future=True
)

SessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False
)

Base = declarative_base()

# Dependency for FastAPI endpoints
async def get_db():
    async with SessionLocal() as session:
        yield session
