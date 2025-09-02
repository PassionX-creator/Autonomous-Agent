import React from 'react';
import { 
  HomeIcon, 
  ChartBarIcon, 
  CogIcon, 
  DocumentTextIcon,
  MicrophoneIcon,
  UserGroupIcon,
  ServerIcon,
  LightBulbIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';
import { useStore } from '../../store/useStore';
import { motion } from 'framer-motion';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
  { id: 'data-sources', label: 'Data Sources', icon: ServerIcon },
  { id: 'ai-pipeline', label: 'AI Pipeline', icon: LightBulbIcon },
  { id: 'insights', label: 'Insights', icon: ChartBarIcon },
  { id: 'reports', label: 'Reports', icon: DocumentTextIcon },
  { id: 'voice', label: 'Voice Queries', icon: MicrophoneIcon },
  { id: 'users', label: 'User Management', icon: UserGroupIcon },
  { id: 'settings', label: 'Settings', icon: CogIcon },
];

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, sidebarCollapsed, toggleSidebar, darkMode } = useStore();

  return (
    <motion.div
      initial={{ width: 256 }}
      animate={{ width: sidebarCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`h-screen ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-r flex flex-col relative z-10`}
    >
      {/* Logo & Toggle */}
      <div className="p-6 flex items-center justify-between">
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <LightBulbIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                AI Agent
              </h1>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Autonomous System
              </p>
            </div>
          </motion.div>
        )}
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-lg transition-colors ${
            darkMode 
              ? 'hover:bg-gray-800 text-gray-400' 
              : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <Bars3Icon className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : darkMode
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-medium"
                >
                  {item.label}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Status Indicator */}
      {!sidebarCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="p-4 mx-4 mb-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border border-green-200 dark:border-green-800"
        >
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className={`text-sm font-medium ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
              System Active
            </span>
          </div>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            AI agents running autonomously
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};