export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'analyst' | 'viewer';
  avatar?: string;
}

export interface DataSource {
  id: string;
  name: string;
  type: 'api' | 'upload' | 'scheduled';
  status: 'active' | 'inactive' | 'error';
  lastSync: Date;
  config: Record<string, any>;
}

export interface AITask {
  id: string;
  type: 'summarization' | 'insight' | 'search' | 'analysis';
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  createdAt: Date;
  completedAt?: Date;
  input: any;
  output?: any;
  priority: 'low' | 'medium' | 'high';
}

export interface Insight {
  id: string;
  title: string;
  summary: string;
  confidence: number;
  tags: string[];
  createdAt: Date;
  source: string;
  data: any;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'custom';
  status: 'draft' | 'published' | 'scheduled';
  createdBy: string;
  createdAt: Date;
  insights: string[];
  config: any;
}

export interface VoiceQuery {
  id: string;
  query: string;
  response: string;
  timestamp: Date;
  userId: string;
}

export interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'healthy' | 'warning' | 'critical';
}