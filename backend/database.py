# import os
# from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker

# Flag to disable DB
# DISABLE_DB = os.getenv("DISABLE_DB", "false").lower() == "true"

# engine = None
# AsyncSessionLocal = None

# if not DISABLE_DB:
#     from backend.config import settings  # only import if DB is enabled

#     DATABASE_URL = (
#    f"{settings.DB_TYPE}+asyncpg://{settings.DB_USER}:{settings.DB_PASSWORD}"
#         f"@{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}"
#     )
#     engine = create_async_engine(DATABASE_URL, echo=True)
#     AsyncSessionLocal = async_sessionmaker(
#         bind=engine,
#         class_=AsyncSession,
#         expire_on_commit=False
#     )

# async def get_db():
#     if DISABLE_DB or AsyncSessionLocal is None:
#         yield None
#     else:
#         async with AsyncSessionLocal() as session:
#             yield session