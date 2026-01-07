from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.services.ai_service import AIService
from app.models.all_models import PersonalityType

router = APIRouter()
ai_service = AIService()

class ChatRequest(BaseModel):
    message: str
    personality: PersonalityType = PersonalityType.ZEN
    # Opcionalmente podemos pasar contexto aquí en el futuro
    context: dict = None

@router.post("/chat")
async def chat_with_persona(request: ChatRequest):
    """
    Endpoint principal para el chat. Recibe el mensaje y la personalidad activa.
    """
    try:
        response = await ai_service.generate_response(
            user_input=request.message,
            personality=request.personality,
            context_data=request.context
        )
        return {
            "response": response,
            "personality": request.personality,
            "status": "analyzed"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/analyze-voice")
async def analyze_voice(request: dict):
    """
    Endpoint para el 'Modo Pánico'. Recibe la transcripción y devuelve el análisis de impulsividad.
    """
    transcript = request.get("transcript")
    if not transcript:
        raise HTTPException(status_code=400, detail="Transcript is required")
    
    analysis = await ai_service.analyze_voice_transcript(transcript)
    return {
        "analysis": analysis,
        "mode": "panic"
    }
