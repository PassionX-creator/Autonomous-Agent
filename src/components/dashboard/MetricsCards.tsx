import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  MinusIcon 
} from '@heroicons/react/24/outline';

export const MetricsCards: React.FC = () => {
  const { metrics, darkMode } = useStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />;
      default: return <MinusIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  const getBgGradient = (index: number) => {
    const gradients = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-green-500 to-green-600',
      'from-orange-500 to-orange-600',
      'from-pink-500 to-pink-600',
    ];
    return gradients[index % gradients.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 
        ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'} 
        backdrop-blur-xl border rounded-xl p-6 relative overflow-hidden`}
    >
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.name}
          whileHover={{ scale: 1.05 }}
          className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} 
            border rounded-xl p-6 relative overflow-hidden`}
        >
          {/* Background Gradient */}
          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${getBgGradient(index)}`} />
          
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {metric.name}
            </h3>
            {getTrendIcon(metric.trend)}
          </div>
          
          <div className="flex items-baseline space-x-2">
            <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {metric.value.toLocaleString()}
            </span>
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {metric.unit}
            </span>
          </div>
          
          <div className={`mt-2 text-xs font-medium ${getStatusColor(metric.status)}`}>
            {metric.status.toUpperCase()}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
