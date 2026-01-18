import sys
import os
import asyncio

# Ensure backend modules can be imported
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from app.core.config import settings
from app.services.ai_service import AIService
from app.models.all_models import PersonalityType

async def test_connection():
    print(f"Testing Gemini API Connection...")
    print(f"API Key present: {'Yes' if settings.GEMINI_API_KEY else 'No'}")
    if settings.GEMINI_API_KEY:
        print(f"API Key prefix: {settings.GEMINI_API_KEY[:5]}...")
    
    ai = AIService()
    print(f"Client initialized. Model: {ai.model_id}")
    
    try:
        print("Attempting to generate response...")
        response = await ai.generate_response("Hello, is this working?", PersonalityType.ZEN)
        print("\n--- Response Received ---")
        print(response)
        print("-------------------------")
    except Exception as e:
        print(f"\n!!! ERROR !!!")
        print(f"Type: {type(e)}")
        print(f"Details: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_connection())
