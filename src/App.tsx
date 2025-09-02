import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useStore } from './store/useStore';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { VoiceInterface } from './components/voice/VoiceInterface';
import { ReportBuilder } from './components/reports/ReportBuilder';
import { PresentationMode } from './components/presentation/PresentationMode';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlayIcon,
  ServerIcon,
  LightBulbIcon,
  ChartBarIcon,
  UserGroupIcon,
  CogIcon 
} from '@heroicons/react/24/outline';
import * as api from './services/api';

// ---------- New AI Query Tab ----------
const AIQuery: React.FC = () => {
  const { darkMode } = useStore();
  const [models, setModels] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    async function fetchModels() {
      try {
        const data = await api.getModels();
        setModels(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchModels();
  }, []);

  const handleQuery = async () => {
    try {
      const response = await api.processAIRequest({ prompt: query });
      setResult(response.answer || JSON.stringify(response));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI Query</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask something..."
        className={`border p-2 rounded w-full mb-2 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
      />
      <button 
        onClick={handleQuery} 
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>

      <h2 className={`mt-4 text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Result:</h2>
      <p>{result}</p>

      <h2 className={`mt-4 text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Available Models:</h2>
      <ul>
        {models.map((model) => (
          <li key={model.id}>{model.name}</li>
        ))}
      </ul>
    </div>
  );
};

// ---------- Placeholder Tabs ----------
const DataSources: React.FC = () => { const { darkMode } = useStore(); return (
  <div className="p-6">
    <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Data Sources Management</h1>
    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-8 text-center`}>
      <ServerIcon className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
      <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Data source management interface with API integrations, file uploads, and sync controls.</p>
    </div>
  </div>
)};
const AIPipeline: React.FC = () => { const { darkMode } = useStore(); return (
  <div className="p-6">
    <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI Processing Pipeline</h1>
    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-8 text-center`}>
      <LightBulbIcon className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
      <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>AI pipeline with NLU, summarization, insight generation, and autonomous task orchestration.</p>
    </div>
  </div>
)};
const Insights: React.FC = () => { const { darkMode } = useStore(); return (
  <div className="p-6">
    <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI Insights & Analytics</h1>
    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-8 text-center`}>
      <ChartBarIcon className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
      <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Advanced analytics dashboard with AI-generated insights, trend analysis, and predictive models.</p>
    </div>
  </div>
)};
const UserManagement: React.FC = () => { const { darkMode } = useStore(); return (
  <div className="p-6">
    <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>User Management</h1>
    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-8 text-center`}>
      <UserGroupIcon className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
      <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Role-based access control, user permissions, and collaborative workspace management.</p>
    </div>
  </div>
)};
const Settings: React.FC = () => { const { darkMode } = useStore(); return (
  <div className="p-6">
    <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>System Settings</h1>
    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-8 text-center`}>
      <CogIcon className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
      <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>System configuration, API settings, security controls, and performance optimization.</p>
    </div>
  </div>
)};

// ---------- Main App ----------
function App() {
  const { activeTab, darkMode } = useStore();
  const [showPresentation, setShowPresentation] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'data-sources': return <DataSources />;
      case 'ai-pipeline': return <AIPipeline />;
      case 'insights': return <Insights />;
      case 'reports': return <ReportBuilder />;
      case 'voice': return <VoiceInterface />;
      case 'users': return <UserManagement />;
      case 'settings': return <Settings />;
      case 'ai-query': return <AIQuery />;  // <-- New AI Query Tab
      default: return <Dashboard />;
    }
  };

  return (
    <div className={`h-screen flex ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowPresentation(true)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all z-20"
        title="Start Presentation"
      >
        <PlayIcon className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {showPresentation && (
          <PresentationMode onClose={() => setShowPresentation(false)} />
        )}
      </AnimatePresence>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: darkMode ? '#374151' : '#ffffff',
            color: darkMode ? '#ffffff' : '#000000',
            border: darkMode ? '1px solid #4B5563' : '1px solid #E5E7EB',
          },
        }}
      />
    </div>
  );
}

export default App;