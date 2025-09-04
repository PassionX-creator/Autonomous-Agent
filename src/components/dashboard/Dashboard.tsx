import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "../../store/useStore";
import { MetricsCards } from "./MetricsCards";
import { TasksOverview } from "./TasksOverview";
import { InsightsGrid } from "./InsightsGrid";
import { DataSourcesStatus } from "./DataSourcesStatus";
import { RecentActivity } from "./RecentActivity";
import { AIModelSelector } from "./AIModelSelector";
import ThreeBackground from "../3d/ThreeBackground";

async function fetchWithRetry({
  apiCall,
  retries = 3,
  delay = 1000,
}: {
  apiCall: () => Promise<any>;
  retries?: number;
  delay?: number;
}): Promise<any> {
  try {
    return await apiCall();
  } catch (error) {
    if (retries <= 0) throw error;
    console.warn(`Retrying... attempts left: ${retries}`);
    await new Promise((resolve) => setTimeout(resolve, delay));
    return fetchWithRetry({ apiCall, retries: retries - 1, delay });
  }
}

export const Dashboard: React.FC = () => {
  const { darkMode, currentUser } = useStore();
  const [aiModels, setAiModels] = useState<any[]>([]);
  const [providers, setProviders] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [query, setQuery] = useState("");
  const [file] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");

  const firstName = currentUser?.name ? currentUser.name.split(" ")[0] : "Guest";
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
console.log("🚀 Dashboard version: 2025-09-03");

  // Fetch AI Models
  useEffect(() => {
    fetchWithRetry({
      apiCall: async () => {
        const res = await fetch(`${API_BASE}/ai-models/`, {
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error(`API request failed: ${res.status} ${res.statusText}`);
        return res.json();
      },
    })
      .then((data) => {
        setAiModels(data.models || []);
        setProviders(data.providers || []);
        if (data.models?.length) setSelectedModel(data.models[0].id); // default selection
      })
      .catch((err) => console.error("Failed to fetch AI models:", err));
  }, [API_BASE]);

  // Start AI Research
  const handleStartResearch = async () => {
    if (!selectedModel || !query) return;
    setLoading(true);
    setResult("");
    try {
      const formData = new FormData();
      formData.append("query", query);
      formData.append("model_id", selectedModel);
      if (file) formData.append("file", file);

      const res = await fetch(`${API_BASE}/research`, { method: "POST", body: formData });
      if (!res.ok) throw new Error("Failed to fetch research");
      const data = await res.json();
      setResult(data.answer || "No result returned.");
    } catch (err) {
      console.error(err);
      setResult("❌ Error: Could not fetch AI research.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <ThreeBackground />

      <div className="relative z-10 p-6 space-y-8">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            Welcome back, {firstName}
          </h1>
          <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Your autonomous AI system is running smoothly.
          </p>
        </motion.div>

        {/* AI Model Selector */}
        <AIModelSelector
          models={aiModels}
          providers={providers}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          query={query}
          setQuery={setQuery}
          handleStartResearch={handleStartResearch}
          loading={loading}
        />

        {/* AI Research Result */}
        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className={`p-4 rounded-lg shadow-inner ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
              <h3 className="font-bold mb-2">📊 Research Result</h3>
              <p className="text-sm whitespace-pre-wrap">{result}</p>
            </div>
          </motion.div>
        )}

        {/* Metrics & Grid */}
        <MetricsCards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TasksOverview />
            <DataSourcesStatus />
          </div>
          <div className="space-y-6">
            <RecentActivity />
          </div>
        </div>

        <InsightsGrid />
      </div>
    </div>
  );
};
