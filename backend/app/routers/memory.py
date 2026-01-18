from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from app.services.memory_service import memory_service

router = APIRouter(
    tags=["memory"]
)

class MemoryCreate(BaseModel):
    text: str
    source: str = "user"
    metadata: str = "{}"

class MemorySearch(BaseModel):
    query: str
    limit: int = 5

@router.post("/add")
async def add_memory(item: MemoryCreate):
    """
    Agrega un nuevo recuerdo a la memoria a largo plazo (LanceDB).
    """
    success, error = memory_service.add_memory(item.text, item.source, item.metadata)
    if not success:
        raise HTTPException(status_code=500, detail=f"Error saving memory: {error}")
    return {"status": "success", "message": "Memory stored"}

@router.get("/search")
async def search_memory(query: str, limit: int = 5):
    """
    Busca recuerdos relevantes.
    """
    results = memory_service.search_memory(query, limit)
    return {"results": results}
