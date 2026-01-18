from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    # Database components
    DB_USER: str
    DB_PASSWORD: str
    DB_HOST: str
    DB_PORT: str
    DB_NAME: str
    DATABASE_URL: str
    
    # Other services
    REDIS_URL: str
    GEMINI_API_KEY: str
    N8N_WEBHOOK_SECRET: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"
        extra = "ignore" # Ignorar campos extra si los hay

settings = Settings()
