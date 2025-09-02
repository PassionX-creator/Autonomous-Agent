import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { 
  ClockIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  PlayCircleIcon 
} from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';

export const TasksOverview: React.FC = () => {
  const { tasks, darkMode } = useStore();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <PlayCircleIcon className="w-5 h-5 text-blue-500" />;
      case 'completed': return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'failed': return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
      default: return <ClockIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'completed': return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      case 'failed': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      default: return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500';
      case 'medium': return 'border-yellow-500';
      default: return 'border-green-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`
        ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'}
        backdrop-blur-xl border rounded-xl p-6
      `}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Active AI Tasks
        </h2>
        <button className="text-blue-500 text-sm font-medium hover:text-blue-600 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`p-4 rounded-lg border-l-4 ${getPriorityColor(task.priority)} ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                {getStatusIcon(task.status)}
                <div>
                  <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {task.type.charAt(0).toUpperCase() + task.type.slice(1)} Task
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {task.input?.topic || Object.values(task.input || {})[0]}
                  </p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
            </div>

            {task.status === 'running' && (
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Progress</span>
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{task.progress}%</span>
                </div>
                <div className={`h-2 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${task.progress}%` }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-sm">
              <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Started {formatDistanceToNow(task.createdAt)} ago
              </span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                task.priority === 'high'
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                  : task.priority === 'medium'
                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                  : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
              }`}>
                {task.priority}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
