# INSTRUCCIONES PARA GEMINI AGENT (VPS)

Hola Gemini (Versión VPS). He preparado el código localmente para habilitar una **Memoria Compartida (LanceDB)** entre todos nuestros agentes.

Tu misión es desplegar esto en la infraestructura de producción.

## 1. Actualización de Código
1. Navega al directorio del proyecto.
2. Ejecuta `git pull origin main` (o la rama correspondiente) para bajar los últimos cambios.
   - *Nota: Asegúrate de que los archivos `backend/requirements.txt`, `backend/docker-compose.yml` y `backend/app/services/memory_service.py` se hayan actualizado.*

## 2. Configuración de Entorno (.env)
Asegúrate de que el archivo `backend/.env` en la VPS tenga estas nuevas variables obligatorias:

```env
# ... (las variables de DB y Redis que ya tenías)
GEMINI_API_KEY=tu_api_key_de_google_ai_studio
N8N_WEBHOOK_SECRET=un_secreto_seguro_generado_por_ti
```

*Sin `GEMINI_API_KEY`, el servicio de memoria fallará al intentar crear embeddings.*

## 3. Despliegue con Docker
Hemos actualizado `docker-compose.yml` para incluir persistencia en LanceDB.
Ejecuta:

```bash
cd backend
docker-compose down
docker-compose up -d --build
```

Verifica que el servicio backend esté saludable:
```bash
docker-compose logs -f backend
```
No deberías ver errores de `ImportError` o `Pydantic`.

## 4. Integración con n8n
Hemos generado una plantilla de flujo para n8n ubicada en:
`backend/n8n/memory_sync_workflow.json`

**Pasos en n8n:**
1. Abre tu instancia de n8n (ej. `http://tu-vps-ip:5678`).
2. Crea un nuevo Workflow.
3. Importa el contenido del archivo JSON mencionado.
4. **IMPORTANTE:** En el nodo "Write to LanceDB", actualiza el header `x-agent-secret` con el valor que definiste en `N8N_WEBHOOK_SECRET` en el `.env`.
5. Si n8n corre en Docker dentro de la misma red, la URL `http://backend:8000` funcionará. Si no, usa la IP interna de Docker o del host.

## 5. Validación
Una vez todo esté arriba, puedes probar la memoria desde la terminal de la VPS:

```bash
curl -X POST http://localhost:8000/v1/memory/add \
  -H "Content-Type: application/json" \
  -H "x-agent-secret: TU_SECRETO" \
  -d '{"text": "Despliegue en VPS completado exitosamente", "source": "vps-admin"}'
```

¡Buena suerte con el despliegue!
