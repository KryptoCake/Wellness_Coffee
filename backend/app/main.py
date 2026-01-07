from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import ai_personality, goals, expenses, memory
import os

app = FastAPI(
    title="Wellness Coffee API",
    description="Backend for Habit Control & Financial Wellness App",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Configuration
# Allow all origins for development/prototype. Restrict in production.
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(expenses.router, prefix="/v1/expenses", tags=["Finance"])
app.include_router(goals.router, prefix="/v1/goals", tags=["Objectives"])
app.include_router(ai_personality.router, prefix="/v1/ai", tags=["Intervention"])
app.include_router(memory.router, prefix="/v1/memory", tags=["Memory"])

@app.get("/")
async def root():
    return {
        "app": "Wellness Coffee", 
        "version": "1.0.0",
        "status": "Online",
        "motto": "Discipline is freedom."
    }

@app.get("/health")
async def health_check():
    return {
        "status": "operational", 
        "infrastructure": "KVM-VPS-8GB",
        "database": "connected", 
        "redis": "connected"
    }