from openai import AsyncOpenAI
import asyncio
import time
from typing import Dict, Any, AsyncGenerator

# Use absolute imports for clarity
from backend.models.ai_models import AIModelType, AIModelRequest, AIModelResponse, AI_MODELS # type: ignore
from backend.config import settings  # Load API key from .env


class AIService:
    def __init__(self):
        # Create async OpenAI client with API key from settings
        self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
        self.model_configs = AI_MODELS

    async def process_request(self, request: AIModelRequest) -> AIModelResponse:
        """Process AI request with selected model"""
        start_time = time.time()
        try:
            model_config = self.model_configs.get(request.model_id)  # type: ignore
            if not model_config:
                raise ValueError(f"Unsupported model: {request.model_id}")

            # Route to appropriate AI service
            if model_config.provider == "OpenAI":
                response = await self._process_openai_request(request, model_config)
            elif model_config.provider == "Anthropic":
                response = await self._process_claude_request(request, model_config)
            elif model_config.provider == "Google":
                response = await self._process_gemini_request(request, model_config)
            else:
                raise ValueError(f"Unsupported provider: {model_config.provider}")

            processing_time = time.time() - start_time
            return AIModelResponse(
                model_id=request.model_id,
                response=response["text"],
                tokens_used=response.get("tokens_used", 0),
                processing_time=processing_time,
                confidence=response.get("confidence", 0.9),
                metadata={
                    "model_config": model_config.dict(),
                    "request_params": {
                        "temperature": request.temperature,
                        "max_tokens": request.max_tokens,
                        "stream": request.stream
                    }
                }
            )
        except Exception as e:
            processing_time = time.time() - start_time
            return AIModelResponse(
                model_id=request.model_id,
                response=f"Error processing request: {str(e)}",
                tokens_used=0,
                processing_time=processing_time,
                confidence=0.0,
                metadata={"error": str(e)}
            )

    async def _process_openai_request(self, request: AIModelRequest, config) -> Dict[str, Any]:
        """Process OpenAI API request using new SDK"""
        try:
            if request.stream:
                # Handle streaming mode
                stream = await self.client.chat.completions.create(
                    model=request.model_id,
                    messages=[
                        {"role": "system", "content": "You are an advanced AI research assistant."},
                        {"role": "user", "content": request.prompt}
                    ],
                    max_tokens=request.max_tokens,
                    temperature=request.temperature,
                    stream=True
                )

                collected_text = ""
                async for chunk in stream:
                    if chunk.choices and len(chunk.choices) > 0:
                        delta = chunk.choices[0].delta.content
                        collected_text += chunk.choices[0].delta.content or ""

                return {
                    "text": collected_text,
                    "tokens_used": 0,  # Usage not available in streaming mode
                    "confidence": 0.95
                }

            else:
                # Normal (non-streaming) mode
                response = await self.client.chat.completions.create(
                    model=request.model_id,
                    messages=[
                        {"role": "system", "content": "You are an advanced AI research assistant."},
                        {"role": "user", "content": request.prompt}
                    ],
                    max_tokens=request.max_tokens,
                    temperature=request.temperature,
                    stream=False
                )
                return {
                    "text": response.choices[0].message.content,
                    "tokens_used": response.usage.total_tokens if response.usage else 0,
                    "confidence": 0.95
                }

        except Exception as e:
            return {
                "text": f"OpenAI API Error: {str(e)}",
                "tokens_used": 0,
                "confidence": 0.0
            }

    async def _process_claude_request(self, request: AIModelRequest, config) -> Dict[str, Any]:
        """Process Anthropic Claude request (placeholder)"""
        await asyncio.sleep(0.5)
        return {
            "text": f"Claude response to: {request.prompt[:100]}... (Claude API integration needed)",
            "tokens_used": len(request.prompt.split()) * 2,
            "confidence": 0.92
        }

    async def _process_gemini_request(self, request: AIModelRequest, config) -> Dict[str, Any]:
        """Process Google Gemini request (placeholder)"""
        await asyncio.sleep(0.3)
        return {
            "text": f"Gemini response to: {request.prompt[:100]}... (Gemini API integration needed)",
            "tokens_used": len(request.prompt.split()) * 2,
            "confidence": 0.90
        }

    async def get_available_models(self) -> Dict[str, Any]:
        """Get list of available AI models"""
        return {
            "models": [config.dict() for config in self.model_configs.values()],
            "total_models": len(self.model_configs),
            "providers": list({config.provider for config in self.model_configs.values()})
        }

    async def analyze_text(self, text: str, model_id: str = "gpt-4o-mini") -> Dict[str, Any]:
        request = AIModelRequest(
            model_id=model_id,
            prompt=f"Analyze the following text and provide insights, key topics, and sentiment:\n\n{text}",
            max_tokens=1000,
            temperature=0.3
        )
        response = await self.process_request(request)
        return {
            "analysis": response.response,
            "model_used": response.model_id,
            "confidence": response.confidence,
            "processing_time": response.processing_time
        }

    async def generate_insights(self, data: Dict[str, Any], model_id: str = "gpt-4o-mini") -> Dict[str, Any]:
        prompt = f"""
Analyze the following data and generate actionable insights:
Data: {data}
Please provide:
1. Key patterns and trends
2. Actionable recommendations
3. Potential risks or opportunities
4. Confidence level for each insight
"""
        request = AIModelRequest(
            model_id=model_id,
            prompt=prompt,
            max_tokens=1500,
            temperature=0.4
        )
        response = await self.process_request(request)
        return {
            "insights": response.response,
            "model_used": response.model_id,
            "confidence": response.confidence,
            "processing_time": response.processing_time,
            "metadata": response.metadata
        }


# Global AI service instance
ai_service = AIService()