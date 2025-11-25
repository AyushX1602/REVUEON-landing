import { motion } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle, Clock, Flag, AlertTriangle, Info } from 'lucide-react';

interface Recommendation {
  title: string;
  description: string;
  impact: string;
  confidence: number; // 0-100
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: string;
}

const recommendations: Recommendation[] = [
  {
    title: 'Improve shipping logistics',
    description: 'Partner with faster shipping carriers to reduce delivery times by 2-3 days',
    impact: 'Could reduce negative reviews by 45%',
    confidence: 92,
    priority: 'critical',
    category: 'Operations'
  },
  {
    title: 'Enhance product packaging',
    description: 'Upgrade to premium protective packaging for fragile items',
    impact: 'Potential 30% reduction in damage complaints',
    confidence: 87,
    priority: 'high',
    category: 'Quality'
  },
  {
    title: 'Update size guides',
    description: 'Add detailed measurement charts and fit recommendations',
    impact: 'Expected to reduce returns by 25%',
    confidence: 78,
    priority: 'medium',
    category: 'Content'
  },
  {
    title: 'Expand customer support hours',
    description: 'Add weekend support coverage to improve response times',
    impact: 'Could increase satisfaction score by 18%',
    confidence: 85,
    priority: 'high',
    category: 'Support'
  },
];

const priorityConfig = {
  critical: {
    label: 'Critical',
    icon: AlertTriangle,
    color: '#FF5B5B',
    bg: '#FFE8E8',
    darkBg: 'rgba(255, 91, 91, 0.15)'
  },
  high: {
    label: 'High',
    icon: Flag,
    color: '#FFC542',
    bg: '#FFF8E6',
    darkBg: 'rgba(255, 197, 66, 0.15)'
  },
  medium: {
    label: 'Medium',
    icon: Info,
    color: '#3297FF',
    bg: '#E6F3FF',
    darkBg: 'rgba(50, 151, 255, 0.15)'
  },
  low: {
    label: 'Low',
    icon: Clock,
    color: '#6B7C93',
    bg: '#F6F9FC',
    darkBg: 'rgba(107, 124, 147, 0.15)'
  }
};

export function AIRecommendations() {
  return (
    <div 
      className="border border-[#635BFF]/20 rounded-xl p-6 shadow-sm h-full relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #635BFF08 0%, #00D4FF08 100%)'
      }}
    >
      {/* Decorative gradient orb */}
      <div 
        className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #635BFF, transparent)' }}
      />

      {/* Header */}
      <div className="mb-6 flex items-center gap-3 relative z-10">
        <motion.div 
          className="p-2 rounded-lg"
          style={{ background: 'linear-gradient(135deg, #635BFF 0%, #00D4FF 100%)' }}
          animate={{ 
            boxShadow: [
              '0 0 0 0 rgba(99, 91, 255, 0.4)',
              '0 0 0 8px rgba(99, 91, 255, 0)',
              '0 0 0 0 rgba(99, 91, 255, 0)'
            ]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut'
          }}
        >
          <Sparkles className="w-5 h-5 text-white" />
        </motion.div>
        <div>
          <h2 
            className="text-xl text-gray-900 dark:text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            AI Action Recommendations
          </h2>
          <p 
            className="text-sm text-gray-600 dark:text-gray-400 mt-0.5"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Powered by advanced analytics
          </p>
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-3 relative z-10">
        {recommendations.map((rec, index) => {
          const priorityData = priorityConfig[rec.priority];
          const PriorityIcon = priorityData.icon;

          return (
            <motion.div
              key={index}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -2,
                boxShadow: '0 8px 16px -4px rgba(99, 91, 255, 0.2)'
              }}
              className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-[#635BFF]/30 transition-all cursor-pointer group"
            >
              {/* Header with Priority */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 
                      className="text-sm text-gray-900 dark:text-white group-hover:text-[#635BFF] transition-colors"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {rec.title}
                    </h3>
                  </div>
                  <p 
                    className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {rec.description}
                  </p>
                </div>

                {/* Priority Badge */}
                <div 
                  className="flex items-center gap-1 px-2 py-1 rounded-full text-xs whitespace-nowrap ml-2"
                  style={{ 
                    backgroundColor: priorityData.bg,
                    color: priorityData.color
                  }}
                >
                  <PriorityIcon className="w-3 h-3" />
                  <span 
                    style={{ 
                      letterSpacing: 'var(--tracking-wide)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600
                    }}
                  >
                    {priorityData.label}
                  </span>
                </div>
              </div>

              {/* Confidence Meter */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span 
                    className="text-xs text-gray-500 dark:text-gray-400"
                    style={{ 
                      letterSpacing: 'var(--tracking-wider)',
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-body)',
                      fontSize: '10px'
                    }}
                  >
                    AI Confidence
                  </span>
                  <span className="text-xs font-semibold text-[#635BFF]">
                    {rec.confidence}%
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${rec.confidence}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ 
                      background: rec.confidence >= 85 
                        ? 'linear-gradient(90deg, #00B86B, #00D4FF)' 
                        : rec.confidence >= 70
                        ? 'linear-gradient(90deg, #635BFF, #00D4FF)'
                        : 'linear-gradient(90deg, #FFC542, #F59E0B)'
                    }}
                  />
                </div>
              </div>

              {/* Impact & Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <span 
                    className="text-xs px-2 py-1 rounded-full"
                    style={{ 
                      backgroundColor: '#E6F9F2',
                      color: '#00B86B',
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    {rec.impact}
                  </span>
                  <span 
                    className="text-xs text-gray-400 dark:text-gray-500"
                    style={{ 
                      letterSpacing: 'var(--tracking-wide)',
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    {rec.category}
                  </span>
                </div>

                {/* Action Chips */}
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-1.5 text-gray-400 hover:text-[#00B86B] hover:bg-[#E6F9F2] dark:hover:bg-[#00B86B]/10 rounded transition-colors"
                    title="Apply recommendation"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-1.5 text-gray-400 hover:text-[#FFC542] hover:bg-[#FFF8E6] dark:hover:bg-[#FFC542]/10 rounded transition-colors"
                    title="Snooze for later"
                  >
                    <Clock className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-1.5 text-gray-400 hover:text-[#635BFF] hover:bg-[#635BFF]/10 rounded transition-colors"
                    title="Flag for review"
                  >
                    <Flag className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Hover Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="hidden group-hover:block mt-3 p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400 border-l-2 border-[#635BFF]"
              >
                💡 This recommendation is based on sentiment analysis of {Math.floor(Math.random() * 5000 + 1000)} reviews
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
