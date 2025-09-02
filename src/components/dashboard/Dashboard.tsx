import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { MetricsCards } from './MetricsCards';
import { TasksOverview } from './TasksOverview';
import { InsightsGrid } from './InsightsGrid';
import { DataSourcesStatus } from './DataSourcesStatus';
import { RecentActivity } from './RecentActivity';
import { AIModelSelector } from './AIModelSelector';
import ThreeBackground from "../3d/ThreeBackground";

async function fetchWithRetry({
  apiCall,
  retries = 3,
  delay = 1000
}: { apiCall: () => Promise<any>; retries?: number; delay?: number; }): Promise<any> {
  try {
    return await apiCall();
  } catch (error) {
    if (retries <= 0) throw error;
    console.warn(`Retrying... attempts left: ${retries}`);
    await new Promise(resolve => setTimeout(resolve, delay));
    return fetchWithRetry({ apiCall, retries: retries - 1, delay });
  }
}

export const Dashboard: React.FC = () => {
  const { darkMode, currentUser } = useStore();
  const [aiModels, setAiModels] = useState<any[]>([]);
  const [providers, setProviders] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const firstName = currentUser?.name ? currentUser.name.split(" ")[0] : "Guest";

  // ✅ Use environment variable or fallback to localhost
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    fetchWithRetry({
      apiCall: async () => {
        const res = await fetch(`${API_BASE}/ai-models/`, {
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          throw new Error(`API request failed: ${res.status} ${res.statusText}`);
        }
        return res.json();
      }
    })
      .then(data => {
        setAiModels(data.models || []);
        setProviders(data.providers || []);
      })
      .catch(err => console.error("Failed to fetch AI models:", err));
  }, [API_BASE]);

  // ✅ Filtering logic
  const filteredModels = aiModels.filter(
    (m) =>
      (selectedProvider === "" || m.provider === selectedProvider) &&
      (m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.description?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="relative min-h-screen">
      <ThreeBackground />

      <div className="relative z-10 p-6 space-y-6">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Welcome back, {firstName}
          </h1>
          <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Your autonomous AI system is running smoothly.
          </p>
        </motion.div>

        {/* AI Models */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`}
        >
          <h2 className="text-lg font-semibold mb-4">Available AI Models</h2>

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            {/* Search box */}
            <input
              type="text"
              placeholder="🔍 Search models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`flex-1 px-3 py-2 rounded-lg border ${
                darkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-black"
              }`}
            />

            {/* Provider filter */}
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className={`px-3 py-2 rounded-lg border ${
                darkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-black"
              }`}
            >
              <option value="">All Providers</option>
              {providers.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Models list */}
          {filteredModels.length === 0 ? (
            <p>No models found.</p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredModels.map(model => (
                <li
                  key={model.id}
                  className={`p-4 rounded-xl shadow-md border ${
                    darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                  }`}
                >
                  <h3 className="text-xl font-bold mb-1">{model.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {model.provider}
                  </p>

                  <p className="text-sm mb-3">{model.description}</p>

                  {/* Capabilities */}
                  <div className="mb-3">
                    <p className="text-xs font-semibold mb-1">Capabilities:</p>
                    <ul className="flex flex-wrap gap-1">
                      {model.capabilities?.slice(0, 3).map((cap: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200"
                        >
                          {cap}
                        </span>
                      ))}
                    </ul>
                  </div>

                  {/* Performance */}
                  {model.performance && (
                    <div className="flex justify-between text-xs mb-2">
                      <span>⚡ {model.performance.speed}%</span>
                      <span>🎯 {model.performance.accuracy}%</span>
                      <span>💰 {model.performance.cost}%</span>
                    </div>
                  )}

                  {/* Pricing + features */}
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    <p>Max Tokens: {model.max_tokens}</p>
                    <p>Cost/1k tokens: ${model.cost_per_1k_tokens}</p>
                    <p>
                      {model.supports_streaming ? "✅ Streaming" : "❌ No Streaming"} |{" "}
                      {model.supports_function_calling ? "✅ Functions" : "❌ No Functions"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </motion.div>

        {/* AI Model Selector */}
        <AIModelSelector models={filteredModels} />

        {/* System Metrics */}
        <MetricsCards />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TasksOverview />
            <DataSourcesStatus />
          </div>

          <div className="space-y-6">
            <RecentActivity />
          </div>
        </div>

        {/* Latest Insights */}
        <InsightsGrid />
      </div>
    </div>
  );
};