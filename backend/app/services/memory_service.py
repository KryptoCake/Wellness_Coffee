import lancedb
import os
import uuid
import time
from app.core.config import settings
from google import genai
from google.genai import types
from pydantic import BaseModel
from typing import List, Optional

# Definición del esquema de Memoria
class MemoryItem(BaseModel):
    id: str
    text: str
    vector: List[float]
    source: str  # "user", "system", "document", "contract"
    metadata: str # JSON string para flexibilidad extra
    timestamp: float

class MemoryService:
    def __init__(self):
        # Persistencia local en la carpeta del proyecto
        self.db_path = os.path.join(os.getcwd(), "data", "lancedb")
        os.makedirs(self.db_path, exist_ok=True)
        
        self.db = lancedb.connect(self.db_path)
        self.table_name = "memories"
        
        # Cliente Gemini para embeddings
        self.client = genai.Client(api_key=settings.GEMINI_API_KEY)
        self.embedding_model = "text-embedding-004"

    def _get_embedding(self, text: str) -> List[float]:
        """Genera el vector embedding para un texto usando Gemini."""
        try:
            result = self.client.models.embed_content(
                model=self.embedding_model,
                contents=text,
                config=types.EmbedContentConfig()
            )
            # Manejo robusto de la respuesta dependiendo de la versión del SDK
            if hasattr(result, 'embeddings') and result.embeddings:
                return result.embeddings[0].values
            return []
        except Exception as e:
            print(f"Error generando embedding: {e}")
            return []

    def add_memory(self, text: str, source: str = "user", metadata: str = "{}"):
        """Guarda un nuevo recuerdo en la base de datos vectorial."""
        vector = self._get_embedding(text)
        if not vector:
            print("No se pudo generar el vector para la memoria.")
            return None
        
        memory_data = [
            {
                "id": str(uuid.uuid4()),
                "text": text,
                "vector": vector,
                "source": source,
                "metadata": metadata,
                "timestamp": time.time()
            }
        ]
        
        try:
            if self.table_name not in self.db.table_names():
                self.db.create_table(self.table_name, data=memory_data)
            else:
                self.db.open_table(self.table_name).add(memory_data)
            return True
        except Exception as e:
            print(f"Error guardando memoria en LanceDB: {e}")
            return False

    def search_memory(self, query: str, limit: int = 5) -> List[dict]:
        """Busca recuerdos semánticamente similares a la query."""
        vector = self._get_embedding(query)
        if not vector:
            return []
        
        if self.table_name not in self.db.table_names():
            return []

        try:
            table = self.db.open_table(self.table_name)
            # LanceDB search devuelve objetos, convertimos a lista de dicts
            results = table.search(vector).limit(limit).to_list()
            return results
        except Exception as e:
            print(f"Error buscando en memoria: {e}")
            return []

# Instancia global para facilitar importación
memory_service = MemoryService()
