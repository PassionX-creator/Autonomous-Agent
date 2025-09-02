import { create } from 'zustand';
import { User, DataSource, AITask, Insight, Report, VoiceQuery, SystemMetric } from '../types';

interface AppState {
  // User & Auth
  currentUser: User | null;
  users: User[];
  
  // Data Sources
  dataSources: DataSource[];
  
  // AI Tasks
  tasks: AITask[];
  
  // Insights & Reports
  insights: Insight[];
  reports: Report[];
  
  // Voice Queries
  voiceQueries: VoiceQuery[];
  
  // System Metrics
  metrics: SystemMetric[];
  
  // UI State
  darkMode: boolean;
  activeTab: string;
  sidebarCollapsed: boolean;
  selectedAIModel: string;
  
  // Actions
  setCurrentUser: (user: User | null) => void;
  addTask: (task: Omit<AITask, 'id'>) => void;
  updateTask: (id: string, updates: Partial<AITask>) => void;
  addInsight: (insight: Omit<Insight, 'id'>) => void;
  addVoiceQuery: (query: Omit<VoiceQuery, 'id'>) => void;
  toggleDarkMode: () => void;
  setActiveTab: (tab: string) => void;
  toggleSidebar: () => void;
  setSelectedAIModel: (model: string) => void;
}

export const useStore = create<AppState>((set, _get) => ({
  // Initial state
  currentUser: {
    id: '1',
    name: 'Cothon Solutions',
    email: 'cothonsolutions.com',
    role: 'admin',
  },
  users: [
    { id: '1', name: 'Dr. Sarah Chen', email: 'sarah.chen@company.com', role: 'admin' },
    { id: '2', name: 'Michael Rodriguez', email: 'michael.r@company.com', role: 'analyst' },
    { id: '3', name: 'Emily Watson', email: 'emily.w@company.com', role: 'viewer' },
  ],
  dataSources: [
    {
      id: '1',
      name: 'NewsAPI Integration',
      type: 'api',
      status: 'active',
      lastSync: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      config: { apiKey: '***', categories: ['technology', 'business'] }
    },
    {
      id: '2',
      name: 'Alpha Vantage Markets',
      type: 'api',
      status: 'active',
      lastSync: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      config: { apiKey: '***', symbols: ['AAPL', 'GOOGL', 'MSFT'] }
    },
    {
      id: '3',
      name: 'Weekly Reports Upload',
      type: 'upload',
      status: 'inactive',
      lastSync: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      config: { format: 'csv', schedule: 'weekly' }
    }
  ],
  tasks: [
    {
      id: '1',
      type: 'summarization',
      status: 'running',
      progress: 75,
      createdAt: new Date(Date.now() - 1000 * 60 * 10),
      input: { sources: ['NewsAPI'], topic: 'AI Technology Trends' },
      priority: 'high'
    },
    {
      id: '2',
      type: 'insight',
      status: 'completed',
      progress: 100,
      createdAt: new Date(Date.now() - 1000 * 60 * 30),
      completedAt: new Date(Date.now() - 1000 * 60 * 5),
      input: { data: 'market_analysis.csv' },
      output: { insights: 3, confidence: 0.89 },
      priority: 'medium'
    }
  ],
  insights: [
    {
      id: '1',
      title: 'Emerging AI Adoption Patterns',
      summary: 'Enterprise AI adoption has increased 340% in Q4, with particular growth in automation and data analysis sectors.',
      confidence: 0.92,
      tags: ['AI', 'Enterprise', 'Growth'],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      source: 'NewsAPI + Alpha Vantage',
      data: {}
    },
    {
      id: '2',
      title: 'Market Volatility Indicators',
      summary: 'Tech stocks showing unusual correlation patterns, suggesting potential market adjustment in next 2-3 weeks.',
      confidence: 0.87,
      tags: ['Finance', 'Tech Stocks', 'Volatility'],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
      source: 'Alpha Vantage',
      data: {}
    }
  ],
  reports: [
    {
      id: '1',
      title: 'Daily AI Market Analysis',
      description: 'Comprehensive analysis of AI technology trends and market movements',
      type: 'daily',
      status: 'published',
      createdBy: '1',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
      insights: ['1', '2'],
      config: { autoSchedule: true, recipients: ['stakeholders'] }
    }
  ],
  voiceQueries: [
    {
      id: '1',
      query: 'What are the latest trends in AI adoption?',
      response: 'Based on recent data analysis, AI adoption has accelerated significantly in enterprise environments...',
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      userId: '1'
    }
  ],
  metrics: [
    { name: 'System Health', value: 98.5, unit: '%', trend: 'stable', status: 'healthy' },
    { name: 'API Response Time', value: 145, unit: 'ms', trend: 'down', status: 'healthy' },
    { name: 'Data Processing Rate', value: 1247, unit: 'records/min', trend: 'up', status: 'healthy' },
    { name: 'AI Model Accuracy', value: 94.2, unit: '%', trend: 'up', status: 'healthy' },
    { name: 'Storage Usage', value: 67, unit: '%', trend: 'up', status: 'warning' }
  ],
  darkMode: false,
  activeTab: 'dashboard',
  sidebarCollapsed: false,
  selectedAIModel: 'gpt-4-turbo',

  // Actions
  setCurrentUser: (user) => set({ currentUser: user }),
  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, { ...task, id: Date.now().toString() }]
  })),
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map(task => task.id === id ? { ...task, ...updates } : task)
  })),
  addInsight: (insight) => set((state) => ({
    insights: [...state.insights, { ...insight, id: Date.now().toString() }]
  })),
  addVoiceQuery: (query) => set((state) => ({
    voiceQueries: [...state.voiceQueries, { ...query, id: Date.now().toString() }]
  })),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setActiveTab: (tab) => set({ activeTab: tab }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSelectedAIModel: (model) => set({ selectedAIModel: model })
}));