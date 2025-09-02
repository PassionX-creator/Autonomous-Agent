import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { formatDistanceToNow } from 'date-fns';
import { 
  ServerIcon, 
  CloudArrowUpIcon, 
  CalendarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon 
} from '@heroicons/react/24/outline';

export const DataSourcesStatus: React.FC = () => {
  const { dataSources, darkMode } = useStore();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'api': return <ServerIcon className="w-5 h-5" />;
      case 'upload': return <CloudArrowUpIcon className="w-5 h-5" />;
      case 'scheduled': return <CalendarIcon className="w-5 h-5" />;
      default: return <ServerIcon className="w-5 h-5" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'inactive': return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />;
      case 'error': return <XCircleIcon className="w-5 h-5 text-red-500" />;
      default: return <CheckCircleIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      case 'inactive': return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'error': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      default: return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-xl border rounded-xl p-6`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Data Sources
        </h2>
        <button className="text-blue-500 text-sm font-medium hover:text-blue-600 transition-colors">
          Manage Sources
        </button>
      </div>

      <div className="space-y-4">
        {dataSources.map((source, index) => (
          <motion.div
            key={source.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} hover:shadow-md transition-all`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
                  {getTypeIcon(source.type)}
                </div>
                <div>
                  <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {source.name}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {source.type.charAt(0).toUpperCase() + source.type.slice(1)} Integration
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(source.status)}
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(source.status)}`}>
                  {source.status}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Last sync: {formatDistanceToNow(source.lastSync)} ago
              </span>
              <button className="text-blue-500 hover:text-blue-600 transition-colors">
                Configure
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
