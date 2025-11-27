import { motion } from 'framer-motion';
import { StatsCards } from './analytics/StatsCards';
import { InteractiveSentimentChart } from './analytics/InteractiveSentimentChart';
import { EnhancedAnalyticsChart } from './analytics/EnhancedAnalyticsChart';
import { KeyInsights } from './analytics/KeyInsights';
import { ProductSentiment } from './analytics/ProductSentiment';
import { FixThisFirst } from './analytics/FixThisFirst';
import { AIRecommendations } from './analytics/AIRecommendations';
import { ReportActions } from './analytics/ReportActions';
import { SectionDivider } from './shared/SectionDivider';
import { CollapsibleWidget } from './shared/CollapsibleWidget';
import { DashboardFilters } from './shared/DashboardFilters';
import { KeyboardShortcuts, useKeyboardShortcuts } from './shared/KeyboardShortcuts';
import { PieChart, TrendingUp, AlertCircle, BarChart3 } from 'lucide-react';

export function Analytics() {
  const shortcuts = [
    { keys: ['?'], description: 'Show keyboard shortcuts', action: () => {} },
    { keys: ['f'], description: 'Focus filter search', action: () => document.querySelector('[data-filter-trigger]')?.click() },
    { keys: ['d'], description: 'Toggle dark mode', action: () => {} },
    { keys: ['e'], description: 'Export report', action: () => {} },
  ];

  const { showHelp, setShowHelp } = useKeyboardShortcuts(shortcuts);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen">
      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcuts
        shortcuts={shortcuts}
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 
            className="text-4xl sm:text-5xl text-gray-900 dark:text-white tracking-tight font-heading font-extrabold"
          >
            Analytics Dashboard
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Review analytics and insights at a glance • Press <kbd className="px-1.5 py-0.5 text-xs font-semibold bg-gray-200 dark:bg-gray-700 rounded">?</kbd> for shortcuts
          </p>
        </div>
        <ReportActions />
      </motion.div>

      {/* Dashboard Filters */}
      <DashboardFilters />

      {/* Stats Cards */}
      <StatsCards />

      {/* Section Divider with Icon */}
      <SectionDivider 
        title={
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-[#635BFF]" />
            <span>Sentiment Analysis</span>
          </div>
        } 
        subtitle="Overall sentiment trends and distribution" 
        className="my-8" 
      />

      {/* Interactive Sentiment Analysis */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <InteractiveSentimentChart />
      </motion.div>

      {/* Section Divider with Icon */}
      <SectionDivider 
        title={
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span>Insights & Trends</span>
          </div>
        } 
        subtitle="Key patterns and product performance analysis" 
        className="my-8" 
      />

      {/* Key Insights and Product Sentiment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <KeyInsights />
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ProductSentiment />
        </motion.div>
      </div>

      {/* Section Divider with Icon */}
      <SectionDivider 
        title={
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <span>Action Items</span>
          </div>
        } 
        subtitle="Prioritized issues and AI-powered recommendations" 
        className="my-8" 
      />

      {/* Fix This First & AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <FixThisFirst />
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <CollapsibleWidget 
            title="AI Action Recommendations" 
            subtitle="Powered by advanced analytics"
            defaultExpanded={true}
          >
            <AIRecommendations />
          </CollapsibleWidget>
        </motion.div>
      </div>
    </div>
  );
}
