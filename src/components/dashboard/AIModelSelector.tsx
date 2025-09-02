import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { 
  CpuChipIcon,
  SparklesIcon,
  BeakerIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  capabilities: string[];
  performance: {
    speed: number;
    accuracy: number;
    cost: number;
  };
  icon: React.ComponentType<any>;
  color: string;
  recommended?: boolean;
}

const aiModels: AIModel[] = [
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    description: 'Most advanced model for complex reasoning, analysis, and creative tasks',
    capabilities: ['Advanced Reasoning', 'Code Generation', 'Complex Analysis', 'Creative Writing'],
    performance: { speed: 85, accuracy: 98, cost: 90 },
    icon: SparklesIcon,
    color: 'from-purple-500 to-pink-500',
    recommended: true
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'OpenAI',
    description: 'Fast and efficient model for general-purpose tasks and quick responses',
    capabilities: ['Text Generation', 'Summarization', 'Q&A', 'Basic Analysis'],
    performance: { speed: 95, accuracy: 88, cost: 30 },
    icon: RocketLaunchIcon,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    description: 'Excellent for research, analysis, and detailed explanations',
    capabilities: ['Research Analysis', 'Long-form Content', 'Data Interpretation', 'Academic Writing'],
    performance: { speed: 75, accuracy: 96, cost: 85 },
    icon: BeakerIcon,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'Google',
    description: 'Multimodal AI with strong performance in reasoning and code',
    capabilities: ['Multimodal Processing', 'Code Analysis', 'Mathematical Reasoning', 'Visual Understanding'],
    performance: { speed: 88, accuracy: 92, cost: 40 },
    icon: CpuChipIcon,
    color: 'from-orange-500 to-red-500'
  }
];

export const AIModelSelector: React.FC = () => {
  const { darkMode } = useStore();
  const [selectedModel, setSelectedModel] = useState<string>('gpt-4-turbo');
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
    const model = aiModels.find(m => m.id === modelId);
    toast.success(`Selected ${model?.name} for AI research tasks`);
  };

  const getPerformanceColor = (value: number) => {
    if (value >= 90) return 'text-green-500';
    if (value >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-xl border rounded-2xl p-8 mb-8`}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Choose Your AI Research Model
          </h2>
          <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Select the AI model that best fits your research and analysis needs
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <InformationCircleIcon className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Current: {aiModels.find(m => m.id === selectedModel)?.name}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {aiModels.map((model) => {
          const Icon = model.icon;
          const isSelected = selectedModel === model.id;
          
          return (
            <motion.div
              key={model.id}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className={`relative cursor-pointer transition-all duration-300 ${
                isSelected 
                  ? `ring-2 ring-blue-500 ${darkMode ? 'bg-gray-700/80' : 'bg-blue-50/80'}` 
                  : darkMode 
                  ? 'bg-gray-700/50 hover:bg-gray-700/80' 
                  : 'bg-gray-50/50 hover:bg-gray-100/80'
              } backdrop-blur-sm rounded-xl p-6 border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}
              onClick={() => handleModelSelect(model.id)}
              onMouseEnter={() => setShowDetails(model.id)}
              onMouseLeave={() => setShowDetails(null)}
            >
              {/* Recommended Badge */}
              {model.recommended && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Recommended
                </div>
              )}

              {/* Selection Indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4"
                >
                  <CheckCircleIcon className="w-6 h-6 text-blue-500" />
                </motion.div>
              )}

              {/* Model Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${model.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>

              {/* Model Info */}
              <div className="space-y-3">
                <div>
                  <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {model.name}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    by {model.provider}
                  </p>
                </div>

                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {model.description}
                </p>

                {/* Performance Metrics */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Speed</span>
                    <span className={`text-xs font-medium ${getPerformanceColor(model.performance.speed)}`}>
                      {model.performance.speed}%
                    </span>
                  </div>
                  <div className={`h-1.5 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${model.performance.speed}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={`h-full bg-gradient-to-r ${model.color} rounded-full`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Accuracy</span>
                    <span className={`text-xs font-medium ${getPerformanceColor(model.performance.accuracy)}`}>
                      {model.performance.accuracy}%
                    </span>
                  </div>
                  <div className={`h-1.5 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${model.performance.accuracy}%` }}
                      transition={{ duration: 1, delay: 0.4 }}
                      className={`h-full bg-gradient-to-r ${model.color} rounded-full`}
                    />
                  </div>
                </div>

                {/* Capabilities */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {model.capabilities.slice(0, 2).map((capability) => (
                    <span
                      key={capability}
                      className={`px-2 py-1 text-xs rounded-full ${
                        darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {capability}
                    </span>
                  ))}
                  {model.capabilities.length > 2 && (
                    <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                      +{model.capabilities.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              {/* Detailed Tooltip */}
              <AnimatePresence>
                {showDetails === model.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className={`absolute z-10 top-full left-0 right-0 mt-2 p-4 ${
                      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    } border rounded-lg shadow-xl backdrop-blur-sm`}
                  >
                    <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      All Capabilities:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {model.capabilities.map((capability) => (
                        <span
                          key={capability}
                          className={`px-2 py-1 text-xs rounded-full ${
                            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {capability}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between text-xs">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Cost Efficiency:</span>
                        <span className={`font-medium ${getPerformanceColor(100 - model.performance.cost)}`}>
                          {100 - model.performance.cost}%
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex items-center justify-between">
        <div className="flex space-x-4">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium">
            Start AI Research
          </button>
          <button className={`px-6 py-3 rounded-lg border transition-all font-medium ${
            darkMode 
              ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}>
            Compare Models
          </button>
        </div>
        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Switch models anytime during your research session
        </div>
      </div>
    </motion.div>
  );
};