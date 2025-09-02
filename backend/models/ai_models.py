from enum import Enum
from typing import List, Dict, Any, Optional
from pydantic import BaseModel

# ---------------------------
# Enums
# ---------------------------
class AIModelType(str, Enum):
    GPT_4_TURBO = "gpt-4-turbo"
    GPT_3_5_TURBO = "gpt-3.5-turbo"
    CLAUDE_3_OPUS = "claude-3-opus"
    GEMINI_PRO = "gemini-pro"

# ---------------------------
# Pydantic Models (Request/Response)
# ---------------------------
class AIModelConfig(BaseModel):
    id: str
    name: str
    provider: str
    description: str
    capabilities: List[str]
    performance: Dict[str, int]
    max_tokens: int
    cost_per_1k_tokens: float
    supports_streaming: bool = True
    supports_function_calling: bool = False

class AIModelRequest(BaseModel):
    model_id: str
    prompt: str
    max_tokens: Optional[int] = 1000
    temperature: Optional[float] = 0.7
    stream: Optional[bool] = False
    context: Optional[Dict[str, Any]] = None

class AIModelResponse(BaseModel):
    model_id: str
    response: str
    tokens_used: int
    processing_time: float
    confidence: float
    metadata: Optional[Dict[str, Any]] = None

# ---------------------------
# AI Model Configurations
# ---------------------------
AI_MODELS = {
    AIModelType.GPT_4_TURBO: AIModelConfig(
        id="gpt-4-turbo",
        name="GPT-4 Turbo",
        provider="OpenAI",
        description="Most advanced model for complex reasoning, analysis, and creative tasks",
        capabilities=["Advanced Reasoning", "Code Generation", "Complex Analysis", "Creative Writing"],
        performance={"speed": 85, "accuracy": 98, "cost": 90},
        max_tokens=4096,
        cost_per_1k_tokens=0.03,
        supports_function_calling=True
    ),
    AIModelType.GPT_3_5_TURBO: AIModelConfig(
        id="gpt-3.5-turbo",
        name="GPT-3.5 Turbo",
        provider="OpenAI",
        description="Fast and efficient model for general-purpose tasks and quick responses",
        capabilities=["Text Generation", "Summarization", "Q&A", "Basic Analysis"],
        performance={"speed": 95, "accuracy": 88, "cost": 30},
        max_tokens=4096,
        cost_per_1k_tokens=0.002,
        supports_function_calling=True
    ),
    AIModelType.CLAUDE_3_OPUS: AIModelConfig(
        id="claude-3-opus",
        name="Claude 3 Opus",
        provider="Anthropic",
        description="Excellent for research, analysis, and detailed explanations",
        capabilities=["Research Analysis", "Long-form Content", "Data Interpretation", "Academic Writing"],
        performance={"speed": 75, "accuracy": 96, "cost": 85},
        max_tokens=4096,
        cost_per_1k_tokens=0.015
    ),
    AIModelType.GEMINI_PRO: AIModelConfig(
        id="gemini-pro",
        name="Gemini Pro",
        provider="Google",
        description="Multimodal AI with strong performance in reasoning and code",
        capabilities=["Multimodal Processing", "Code Analysis", "Mathematical Reasoning", "Visual Understanding"],
        performance={"speed": 88, "accuracy": 92, "cost": 40},
        max_tokens=2048,
        cost_per_1k_tokens=0.001
    )
}