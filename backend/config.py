from pydantic_settings import BaseSettings
from urllib.parse import quote_plus  # for encoding special characters in password

class Settings(BaseSettings):
    # AI API keys
    OPENAI_API_KEY: str = ""
    ANTHROPIC_API_KEY: str = ""
    GOOGLE_GEMINI_API_KEY: str = ""

    # Database toggle
    DISABLE_DB: bool = True  # <-- Set to True to disable DB, False to enable

    # Database (PostgreSQL)
    DB_TYPE: str = "postgresql"
    DB_HOST: str = "localhost"
    DB_PORT: int = 5432
    DB_USER: str = "your_username"       # replace with your PostgreSQL username
    DB_PASSWORD: str = "your_password"   # replace with your PostgreSQL password
    DB_NAME: str = "your_database_name"  # replace with your PostgreSQL database name

    @property
    def DATABASE_URL(self) -> str | None:
        """Return DB URL if enabled, otherwise None"""
        if self.DISABLE_DB:
            return None
        password = quote_plus(self.DB_PASSWORD)  # encode special characters like '@'
        return f"{self.DB_TYPE}+asyncpg://{self.DB_USER}:{password}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

    class Config:
        env_file = r"E:\Autonomous Ai Agent\backend\.env"
        env_file_encoding = 'utf-8'


settings = Settings()  # type: ignore