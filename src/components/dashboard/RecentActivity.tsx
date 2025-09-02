import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { formatDistanceToNow } from 'date-fns';
import { 
  DocumentTextIcon,
  LightBulbIcon,
  MicrophoneIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';

export const RecentActivity: React.FC = () => {
  const { tasks, insights, voiceQueries, darkMode } = useStore();

  const activities = [
    ...tasks.map(task => ({
      id: `task-${task.id}`,
      type: 'task',
      title: `${task.type?.charAt(0).toUpperCase() + task.type?.slice(1) || 'Task'} task ${task.status || ''}`,
      description: task.input?.topic || 'Processing data',
      timestamp: task.completedAt || task.createdAt || new Date().toISOString(),
      status: task.status || 'pending',
      icon: LightBulbIcon
    })),
    ...insights.map(insight => ({
      id: `insight-${insight.id}`,
      type: 'insight',
      title: 'New insight generated',
      description: insight.title || 'No title',
      timestamp: insight.createdAt || new Date().toISOString(),
      status: 'completed',
      icon: DocumentTextIcon
    })),
    ...voiceQueries.map(query => ({
      id: `voice-${query.id}`,
      type: 'voice',
      title: 'Voice query processed',
      description: query.query || 'No query text',
      timestamp: query.timestamp || new Date().toISOString(),
      status: 'completed',
      icon: MicrophoneIcon
    }))
  ]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 8);

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'task': return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'insight': return 'text-purple-500 bg-purple-50 dark:bg-purple-900/20';
      case 'voice': return 'text-green-500 bg-green-50 dark:bg-green-900/20';
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
      <div className="flex items-center space-x-2 mb-6">
        <ClockIcon className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Recent Activity
        </h2>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`flex items-start space-x-3 p-3 rounded-lg ${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'} transition-colors`}
            >
              <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`} title={activity.title}>
                  {activity.title}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} truncate`} title={activity.description}>
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDistanceToNow(new Date(activity.timestamp))} ago
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};