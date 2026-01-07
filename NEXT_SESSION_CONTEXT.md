# CONTEXTO DE SESIÓN: WELLNESS COFFEE (Backend & Architecture)
**Fecha:** 06 Enero 2026
**Estado:** Integración de Memoria Compartida (LanceDB) COMPLETADA

## 1. Resumen Ejecutivo
Estamos construyendo "Wellness Coffee", una PWA para el control de gastos compulsivos y formación de hábitos financieros.
- **Backend:** Python (FastAPI) + PostgreSQL + Redis + LanceDB (Memoria Vectorial).
- **Frontend:** Next.js + Tailwind (Antigravity) + Cliente API Memoria.
- **QA/Ops:** Jules (Test/Release) + n8n (Sincronización).
- **Infraestructura:** VPS KVM (8GB RAM) con Docker Compose orquestando todo.

## 2. Logros Alcanzados (DONE)
### Arquitectura y Backend (Memoria)
- [x] **Cerebro Compartido (LanceDB):** Implementado almacenamiento vectorial local para memoria a largo plazo.
- [x] **Embeddings:** Integrado modelo `text-embedding-004` de Gemini para vectorización.
- [x] **Memory Service:** Creado servicio unificado (`memory_service.py`) para leer/escribir recuerdos.
- [x] **RAG en Chat:** El endpoint `/v1/ai/chat` ahora consulta la memoria antes de responder.
- [x] **API Memoria:** Nuevos endpoints `/v1/memory/add` y `/v1/memory/search` expuestos para Agentes (Jules, n8n, Frontend).
- [x] **Seguridad Agente:** Header `x-agent-secret` implementado para peticiones de sistema (n8n).
- [x] **Docker Persistencia:** Volumen configurado para persistir datos de LanceDB en la VPS.

### Frontend (Antigravity)
- [x] **Cliente API (`api.ts`):** Estructura creada para comunicación tipada con el backend.
- [x] **Onboarding Inteligente:** El Paso 2 ("The Anchor") ahora guarda la meta principal del usuario directamente en la memoria vectorial de la IA.

### Automatización (n8n)
- [x] **Plantilla Generada:** Workflow JSON (`backend/n8n/memory_sync_workflow.json`) listo para importar en la VPS. Permite inyectar recuerdos vía Webhook.

## 3. Estado Actual
El sistema ahora tiene "memoria". El frontend le cuenta cosas al backend, el backend las recuerda y las usa para responder. La infraestructura está lista para ser desplegada en la VPS y orquestada por n8n.

## 4. Tareas Pendientes (TODO)
### Inmediato (Despliegue VPS)
1.  **Deploy:** Subir código a GitHub y hacer `git pull` en VPS.
2.  **Configuración VPS:** Crear `.env` con claves de producción.
3.  **Docker Up:** Levantar servicios en VPS (`docker-compose up -d --build`).
4.  **n8n Setup:** Importar el workflow JSON y conectarlo a la red de Docker.

### Funcionalidad Core
5.  **Lógica "Costo de Oportunidad":** Implementar cálculo matemático en el backend.
6.  **Modo Pánico (Voz):** Implementar grabación de audio en Frontend.

## 5. Instrucciones de Arranque Local
1.  Iniciar DB: `cd backend && docker-compose up -d db redis`
2.  Iniciar Backend: `cd backend && python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload`
3.  Iniciar Frontend: `cd front_end && npm run dev`