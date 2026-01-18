from google import genai
from google.genai import types
from app.core.config import settings
from app.models.all_models import PersonalityType
from app.services.memory_service import memory_service

# System Prompts (Trailers / Guiones base)
SYSTEM_PROMPTS = {
    PersonalityType.ZEN: """
    Eres el Agente ZEN de Wellness Coffee. Tu tono es calmado, empático y minimalista.
    Tu objetivo es reducir la ansiedad financiera del usuario.
    Analiza los gastos desde la perspectiva de la necesidad real y la paz mental.
    Frase clave: \"La verdadera riqueza es la ausencia de deseos innecesarios.\"
    """,
    
    PersonalityType.HARTMAN: """
    Eres el SARGENTO HARTMAN, instructor de disciplina financiera.
    Tu tono es agresivo, directo y militar. No toleras excusas.
    Tu objetivo es proteger la misión (Ometepe/Van) a toda costa.
    Trata los gastos impulsivos como insubordinación o debilidad.
    Frase clave: \"¡Ese dinero no es tuyo, pertenece a tu futuro!\"
    """,
    
    PersonalityType.HOUSE: """
    Eres el DR. HOUSE. Tu tono es sarcástico, clínico y brutalmente honesto.
    No te importan los sentimientos del usuario, solo los datos.
    Diagnosticas el gasto compulsivo como una patología.
    Frase clave: \"Todo el mundo miente, pero los números en tu cuenta bancaria no.\"
    """,
    
    PersonalityType.TRACY: """
    Eres BRYAN TRACY, consultor de alto rendimiento.
    Tu tono es profesional, enfocado en ROI (Retorno de Inversión) y eficiencia.
    Calcula el costo de oportunidad de cada gasto.
    Frase clave: \"¿Este gasto te acerca o te aleja de tu meta de 10 años?\"
    """
}

class AIService:
    def __init__(self):
        self.model_id = "gemini-2.0-flash"
        self.client = genai.Client(api_key=settings.GEMINI_API_KEY)

    async def generate_response(self, user_input: str, personality: PersonalityType, context_data: dict = None) -> str:
        """
        Genera una respuesta utilizando la personalidad configurada con el nuevo SDK google.genai
        """
        if not self.client:
             return "Error: GEMINI_API_KEY no configurada."

        system_instruction = SYSTEM_PROMPTS.get(personality, SYSTEM_PROMPTS[PersonalityType.ZEN])
        
        # 1. Recuperar memoria a largo plazo (RAG)
        relevant_memories = memory_service.search_memory(user_input, limit=3)
        memory_context = ""
        if relevant_memories:
            memory_context = "\nMEMORIA A LARGO PLAZO RECUPERADA:\n" + "\n".join([f"- {m['text']}" for m in relevant_memories])

        # 2. Construir el prompt enriquecido con contexto
        context_str = ""
        if context_data:
            context_str = f"\nCONTEXTO INMEDIATO (SESIÓN ACTUAL):\nMetas: {context_data.get('goals')}\nPresupuesto Restante: {context_data.get('budget')}"

        full_prompt = f"{context_str}\n{memory_context}\n\nUSUARIO DICE: {user_input}"

        try:
            response = self.client.models.generate_content(
                model=self.model_id,
                contents=full_prompt,
                config=types.GenerateContentConfig(
                    system_instruction=system_instruction,
                    temperature=0.7
                )
            )
            return response.text
        except Exception as e:
            print(f"Error calling Google GenAI API: {e}")
            return "Lo siento, mi conexión neuronal está fallando. Pero tu billetera debería seguir cerrada."

    async def analyze_voice_transcript(self, transcript: str) -> dict:
        """
        Analiza texto de voz para extraer intención de gasto y nivel de impulsividad usando el nuevo SDK.
        """
        if not self.client:
            return {"error": "API Key not configured"}

        prompt = f"""
        Analiza el siguiente texto transcrito de una nota de voz.
        Extrae:
        1. Intención de gasto (¿Quiere comprar algo? ¿Qué es?)
        2. Monto (si se menciona)
        3. Nivel de Impulsividad (1-10)
        4. Sentimiento (Ansioso, Eufórico, Deprimido, Neutral)

        Responde SOLO en formato JSON.
        Texto: "{transcript}"
        """
        try:
            response = self.client.models.generate_content(
                model=self.model_id,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json"
                )
            )
            return response.text 
        except Exception as e:
            raise Exception(f"Voice analysis failed: {str(e)}")