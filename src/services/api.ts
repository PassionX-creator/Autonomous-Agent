// api.ts

// ------------------------------
// API Base URL
// ------------------------------
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
console.log("API_BASE set to:", API_BASE);

// ------------------------------
// Fetch with Retry
// ------------------------------
async function fetchWithRetry<T>(
  apiCall: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  try {
    return await apiCall();
  } catch (error: any) {
    if (retries <= 0) {
      console.error("All retries failed:", error);
      throw error;
    }
    console.warn(`Retrying... attempts left: ${retries}`, error);
    await new Promise((resolve) => setTimeout(resolve, delay));
    return fetchWithRetry(apiCall, retries - 1, delay);
  }
}

// ------------------------------
// API Functions
// ------------------------------
async function getModels() {
  return fetchWithRetry(async () => {
    console.log("Fetching models from:", `${API_BASE}/ai-models/`);
    const res = await fetch(`${API_BASE}/ai-models/`);
    if (!res.ok) throw new Error(`Error fetching models: ${res.statusText}`);
    const data = await res.json();
    console.log("Models fetched:", data);
    return data;
  });
}

async function processAIRequest(payload: any) {
  return fetchWithRetry(async () => {
    console.log("Sending payload to AI model:", payload);
    const res = await fetch(`${API_BASE}/ai-models/process`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Error processing request: ${res.statusText}`);
    const data = await res.json();
    console.log("AI model response:", data);
    return data;
  });
}

// ------------------------------
// Exports
// ------------------------------
export { getModels, processAIRequest };