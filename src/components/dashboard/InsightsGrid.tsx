import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { formatDistanceToNow } from 'date-fns';
import { SparklesIcon, TagIcon } from '@heroicons/react/24/outline';

export const InsightsGrid: React.FC = () => {
  const { insights, darkMode } = useStore();

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-500 bg-green-50 dark:bg-green-900/20';
    if (confidence >= 0.8) return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
    return 'text-red-500 bg-red-50 dark:bg-red-900/20';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-semibold flex items-center space-x-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          <SparklesIcon className="w-6 h-6 text-purple-500" />
          <span>Latest AI Insights</span>
        </h2>
        <button className="text-blue-500 text-sm font-medium hover:text-blue-600 transition-colors">
          Generate New Insights
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className={`${
              darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
            } backdrop-blur-xl border rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer relative overflow-hidden`}
          >
            {/* Gradient Background */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            
            <div className="flex items-start justify-between mb-4">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {insight.title}
              </h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConfidenceColor(insight.confidence)}`}>
                {Math.round(insight.confidence * 100)}% confident
              </span>
            </div>

            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4 leading-relaxed`}>
              {insight.summary}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TagIcon className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <div className="flex space-x-2">
                  {insight.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {formatDistanceToNow(insight.createdAt)} ago
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {insight.source}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
