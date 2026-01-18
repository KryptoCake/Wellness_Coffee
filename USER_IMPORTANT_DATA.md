# Información Crítica para el Usuario y Futuras Sesiones

## Credenciales de Base de Datos (Local/Docker)
Estas credenciales son necesarias para que la aplicación se conecte a la base de datos PostgreSQL local gestionada por Docker.

- **Usuario:** `wellness_admin`
- **Contraseña:** `Orkutorkut.01`
- **Host:** `localhost` (Desde la máquina host) / `db` (Desde dentro de la red Docker)
- **Puerto:** `5432`
- **Base de Datos:** `wellness_coffee`

## Comandos Útiles

**Reiniciar Base de Datos (Borra todo y recrea):**
```powershell
cd backend
docker-compose down -v
docker-compose up -d
```

**Ejecutar Migraciones (Crear tablas):**
```powershell
cd backend
alembic upgrade head
```

**Iniciar Backend (Desarrollo local sin Docker):**
```powershell
cd backend
uvicorn app.main:app --reload
```

## Estado Actual
- **LanceDB:** Configurado y verificado en `backend/data/lancedb`.
- **Backend:** Configurado y funcionando con las credenciales arriba mencionadas.
- **Frontend:** Listo para iniciar en `front_end/`.
