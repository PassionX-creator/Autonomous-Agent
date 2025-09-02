import logging
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from contextlib import asynccontextmanager

# Use relative imports if running as module
from backend.models.ai_models import AIModelRequest, AIModelResponse
from backend.services.ai_service import ai_service

# ---------------------------
# Logging Setup
# ---------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(name)s - %(message)s",
)
logger = logging.getLogger("ai-backend")

# ---------------------------
# Dummy DB placeholders
# ---------------------------
DISABLE_DB = True
engine = None

async def get_db():
    """Disabled DB dependency placeholder."""
    yield None

# ---------------------------
# Lifespan for startup/shutdown
# ---------------------------
@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("🚀 App startup (DB disabled)")
    yield
    logger.info("🛑 App shutdown")

# ---------------------------
# FastAPI app
# ---------------------------
app = FastAPI(title="AI Backend", lifespan=lifespan)

# ---------------------------
# CORS Middleware
# ---------------------------
origins = [
    "http://localhost:5173",  # Vite dev server
    "http://localhost:5178",  # alternate Vite
    "http://localhost:3000",  # CRA default
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev: allow all. Replace with `origins` in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
# Request Models
# ---------------------------
class AnalyzeRequest(BaseModel):
    text: str
    model_id: str = "gpt-3.5-turbo"

class InsightsRequest(BaseModel):
    data: dict
    model_id: str = "gpt-4-turbo"

# ---------------------------
# Middleware: Log requests
# ---------------------------
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Incoming request: {request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"Response status: {response.status_code} for {request.url}")
    return response

# ---------------------------
# Health Check
# ---------------------------
@app.get("/status")
async def status():
    logger.info("Health check called")
    return {"status": "ok", "db_enabled": not DISABLE_DB}

# ---------------------------
# AI Model Endpoints
# ---------------------------
@app.get("/ai-models/")
async def get_ai_models():
    try:
        logger.info("Fetching available AI models")
        models = await ai_service.get_available_models()
        return models
    except Exception as e:
        logger.error(f"Error fetching models: {e}")
        raise HTTPException(status_code=500, detail=f"Error fetching models: {str(e)}")

@app.post("/ai-models/process", response_model=AIModelResponse)
async def process_ai_request(request: AIModelRequest):
    try:
        logger.info(f"Processing AI request with model {request.model_id}")
        return await ai_service.process_request(request)
    except Exception as e:
        logger.error(f"Processing failed: {e}")
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")

@app.post("/ai-models/analyze")
async def analyze_text(request: AnalyzeRequest):
    try:
        logger.info(f"Analyzing text with model {request.model_id}")
        analysis = await ai_service.analyze_text(request.text, request.model_id)
        return analysis
    except Exception as e:
        logger.error(f"Analysis failed: {e}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.post("/ai-models/insights")
async def generate_insights_endpoint(request: InsightsRequest):
    try:
        logger.info(f"Generating insights with model {request.model_id}")
        insights = await ai_service.generate_insights(request.data, request.model_id)
        return insights
    except Exception as e:
        logger.error(f"Insight generation failed: {e}")
        raise HTTPException(status_code=500, detail=f"Insight generation failed: {str(e)}")
# ---------------------------
# AI Research Endpoint
# ---------------------------
class ResearchRequest(BaseModel):
    model_id: str
    query: str

@app.post("/ai-search/")
async def ai_search(request: ResearchRequest):
    try:
        logger.info(f"Starting AI research with model {request.model_id} for query: {request.query}")
        
        # Call your ai_service (dummy for now)
        result = await ai_service.process_request(
            AIModelRequest(model_id=request.model_id, prompt=request.query)
        )
        
        return {"message": "Research started successfully", "result": result}
    except Exception as e:
        logger.error(f"AI search failed: {e}")
        raise HTTPException(status_code=500, detail=f"AI search failed: {str(e)}")