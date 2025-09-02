import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  XMarkIcon,
  PlayIcon,
  PauseIcon 
} from '@heroicons/react/24/outline';

interface Slide {
  id: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  background?: string;
}

export const PresentationMode: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const slides: Slide[] = [
    {
      id: 'title',
      title: 'Autonomous AI Agent System',
      subtitle: 'Next-Generation Intelligence for Enterprise Operations',
      background: 'from-blue-600 to-purple-700',
      content: (
        <div className="text-center space-y-8">
          <div className="w-24 h-24 mx-auto bg-white/20 rounded-2xl flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl animate-pulse"></div>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-white/90">Fully Autonomous Workflow</h3>
            <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Advanced AI system with multi-source integration, intelligent processing, and autonomous decision-making capabilities
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <span className="px-4 py-2 bg-white/10 rounded-full text-white/80">React.js</span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-white/80">Python FastAPI</span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-white/80">OpenAI</span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-white/80">LangChain</span>
          </div>
        </div>
      )
    },
    {
      id: 'architecture',
      title: 'System Architecture',
      subtitle: 'Enterprise-Grade Design',
      background: 'from-green-600 to-teal-700',
      content: (
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Core Components</h3>
            <div className="space-y-4">
              {[
                'Data Collection & Integration',
                'AI Processing Pipeline',
                'Task Orchestration',
                'User Dashboard',
                'Memory & Context Storage'
              ].map((component, index) => (
                <motion.div
                  key={component}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg"
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-white">{component}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Tech Stack</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Frontend', value: 'React.js + Vite' },
                { label: 'Backend', value: 'Python FastAPI' },
                { label: 'Database', value: 'PostgreSQL' },
                { label: 'Vector DB', value: 'Pinecone' },
                { label: 'AI/ML', value: 'OpenAI API' },
                { label: 'Orchestration', value: 'LangChain' }
              ].map((tech) => (
                <div key={tech.label} className="bg-white/10 p-3 rounded-lg">
                  <div className="text-sm text-white/70">{tech.label}</div>
                  <div className="text-white font-medium">{tech.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'features',
      title: 'Core Features',
      subtitle: 'Advanced AI Capabilities',
      background: 'from-purple-600 to-pink-700',
      content: (
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              title: 'Data Integration',
              features: ['NewsAPI Integration', 'Alpha Vantage Markets', 'File Upload Support', 'Real-time Sync']
            },
            {
              title: 'AI Processing',
              features: ['NLU Topic Extraction', 'Intelligent Summarization', 'Insight Generation', 'Predictive Analysis']
            },
            {
              title: 'Autonomy',
              features: ['Task Orchestration', 'Context Memory', 'Historical Analytics', 'Self-Learning']
            }
          ].map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 p-6 rounded-xl"
            >
              <h3 className="text-lg font-semibold text-white mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.features.map((feature) => (
                  <li key={feature} className="flex items-center space-x-2 text-white/80">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      id: 'dashboard',
      title: 'User Dashboard',
      subtitle: 'Stakeholder-Friendly Interface',
      background: 'from-orange-600 to-red-700',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { label: 'System Health', value: '98.5%', color: 'bg-green-400' },
              { label: 'Active Tasks', value: '12', color: 'bg-blue-400' },
              { label: 'Insights Generated', value: '847', color: 'bg-purple-400' },
              { label: 'Data Sources', value: '8', color: 'bg-yellow-400' }
            ].map((metric) => (
              <div key={metric.label} className="bg-white/10 p-4 rounded-lg text-center">
                <div className={`w-3 h-3 ${metric.color} rounded-full mx-auto mb-2`}></div>
                <div className="text-2xl font-bold text-white">{metric.value}</div>
                <div className="text-sm text-white/70">{metric.label}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-4">Key Dashboard Features</h3>
            <div className="flex justify-center space-x-8">
              {[
                'Real-time Monitoring',
                'Voice-based Queries',
                'Interactive Reports',
                'Role-based Access',
                'Collaborative Mode'
              ].map((feature) => (
                <div key={feature} className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                  <span className="text-white text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'deployment',
      title: 'Deployment Guide',
      subtitle: 'Production-Ready Setup',
      background: 'from-teal-600 to-blue-700',
      content: (
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">VS Code Setup</h3>
            <div className="space-y-3 text-white/90">
              <div className="flex items-start space-x-3">
                <span className="bg-white/20 px-2 py-1 rounded text-sm">1</span>
                <div>
                  <div className="font-medium">Clone Repository</div>
                  <code className="text-sm text-white/70">git clone [repository-url]</code>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="bg-white/20 px-2 py-1 rounded text-sm">2</span>
                <div>
                  <div className="font-medium">Install Dependencies</div>
                  <code className="text-sm text-white/70">npm install</code>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="bg-white/20 px-2 py-1 rounded text-sm">3</span>
                <div>
                  <div className="font-medium">Start Development</div>
                  <code className="text-sm text-white/70">npm run dev</code>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Production Deployment</h3>
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-white font-medium mb-2">Frontend (Vercel/Netlify)</div>
                <div className="text-sm text-white/70">Automatic deployment with Git integration</div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-white font-medium mb-2">Backend (Render/Heroku)</div>
                <div className="text-sm text-white/70">Scalable Python FastAPI deployment</div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-white font-medium mb-2">Database Setup</div>
                <div className="text-sm text-white/70">PostgreSQL + Pinecone configuration</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  React.useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(nextSlide, 8000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const currentSlideData = slides[currentSlide];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black"
    >
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.background || 'from-gray-900 to-black'}`}>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Controls */}
      <div className="absolute top-6 right-6 flex items-center space-x-4 z-10">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
        >
          {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
        </button>
        <button
          onClick={onClose}
          className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Counter */}
      <div className="absolute top-6 left-6 text-white/70 z-10">
        {currentSlide + 1} / {slides.length}
      </div>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors z-10"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors z-10"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>

      {/* Slide Content */}
      <div className="relative h-full flex flex-col justify-center px-16 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h1 className="text-5xl font-bold text-white">{currentSlideData.title}</h1>
              {currentSlideData.subtitle && (
                <p className="text-xl text-white/80">{currentSlideData.subtitle}</p>
              )}
            </div>
            <div className="max-w-6xl mx-auto">
              {currentSlideData.content}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <motion.div
          className="h-full bg-white"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};