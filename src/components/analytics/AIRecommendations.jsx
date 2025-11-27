import { motion } from 'framer-motion';
import { Sparkles, Check, X, Flag, TrendingUp, AlertTriangle, Zap } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '../../contexts/ToastContext';

const recommendations = [
  {
    id: 1,
    title: 'Improve Product B packaging quality',
    description: 'Multiple customers reported damaged items. Consider reinforcing packaging materials.',
    confidence: 94,
    priority: 'critical',
    tag: 'Critical',
    impact: 'High',
    effort: 'Medium',
    icon: AlertTriangle,
    color: 'red',
  },
  {
    id: 2,
    title: 'Reduce shipping times for Product C',
    description: 'Average delivery time is 7 days vs industry standard of 3-4 days.',
    confidence: 88,
    priority: 'high',
    tag: 'Quick Win',
    impact: 'High',
    effort: 'Low',
    icon: TrendingUp,
    color: 'orange',
  },
  {
    id: 3,
    title: 'Add size chart to Product E listings',
    description: 'Size inconsistency complaints can be reduced with detailed sizing guide.',
    confidence: 82,
    priority: 'medium',
    tag: 'Quick Win',
    impact: 'Medium',
    effort: 'Low',
    icon: Zap,
    color: 'yellow',
  },
  {
    id: 4,
    title: 'Update Product A color descriptions',
    description: 'Color mismatch complaints suggest product images need calibration.',
    confidence: 76,
    priority: 'low',
    tag: 'Low Effort',
    impact: 'Low',
    effort: 'Low',
    icon: Sparkles,
    color: 'blue',
  },
];

export function AIRecommendations() {
  const [appliedItems, setAppliedItems] = useState([]);
  const [ignoredItems, setIgnoredItems] = useState([]);
  const { addToast } = useToast();

  const handleApply = (id, title) => {
    setAppliedItems([...appliedItems, id]);
    addToast(`Applied: ${title}`, 'success');
  };

  const handleIgnore = (id, title) => {
    setIgnoredItems([...ignoredItems, id]);
    addToast(`Ignored: ${title}`, 'info');
  };

  const handleFlag = (title) => {
    addToast(`Flagged for review: ${title}`, 'info');
  };

  const getTagColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'bg-[#FFE8E8] dark:bg-[#FF5B5B]/20 text-[#FF5B5B] border-[#FF5B5B]/30';
      case 'high':
        return 'bg-[#FFF8E6] dark:bg-[#FFC542]/20 text-[#FFC542] dark:text-[#FFC542] border-[#FFC542]/30';
      case 'medium':
        return 'bg-[#E6F3FF] dark:bg-[#3297FF]/20 text-[#3297FF] border-[#3297FF]/30';
      default:
        return 'bg-[#E6F9F2] dark:bg-[#00B86B]/20 text-[#00B86B] border-[#00B86B]/30';
    }
  };

  const getBorderColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'border-l-[#FF5B5B]';
      case 'high':
        return 'border-l-[#FFC542]';
      case 'medium':
        return 'border-l-[#3297FF]';
      default:
        return 'border-l-[#00B86B]';
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI-Powered Recommendations</h3>
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">Powered by ML</span>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, index) => {
          const Icon = rec.icon;
          const isApplied = appliedItems.includes(rec.id);
          const isIgnored = ignoredItems.includes(rec.id);

          return (
            <motion.div
              key={rec.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-4 rounded-lg border-l-4 ${getBorderColor(rec.priority)} bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${
                isApplied ? 'opacity-50' : ''
              } ${isIgnored ? 'opacity-30' : ''}`}
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className={`p-2 rounded-lg ${
                  rec.priority === 'critical' ? 'bg-red-100 dark:bg-red-900/30' :
                  rec.priority === 'high' ? 'bg-orange-100 dark:bg-orange-900/30' :
                  rec.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                  'bg-blue-100 dark:bg-blue-900/30'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    rec.priority === 'critical' ? 'text-red-600 dark:text-red-400' :
                    rec.priority === 'high' ? 'text-orange-600 dark:text-orange-400' :
                    rec.priority === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-blue-600 dark:text-blue-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{rec.title}</h4>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getTagColor(rec.priority)}`}>
                      {rec.tag}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{rec.description}</p>
                  
                  {/* Metrics */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1.5">
                      <div className="text-xs text-gray-500 dark:text-gray-400">Confidence:</div>
                      <div className="flex items-center gap-1">
                        <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${rec.confidence}%` }}
                            transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                            className={`h-full ${
                              rec.confidence >= 90 ? 'bg-green-500' :
                              rec.confidence >= 80 ? 'bg-yellow-500' :
                              'bg-orange-500'
                            }`}
                          />
                        </div>
                        <span className="text-xs font-semibold text-gray-900 dark:text-white">{rec.confidence}%</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Impact: <span className="font-medium text-gray-900 dark:text-white">{rec.impact}</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Effort: <span className="font-medium text-gray-900 dark:text-white">{rec.effort}</span>
                    </div>
                  </div>

                  {/* CTAs */}
                  {!isApplied && !isIgnored && (
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleApply(rec.id, rec.title)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white rounded-lg transition-all hover:shadow-md"
                        style={{ background: 'linear-gradient(135deg, #635BFF 0%, #00D4FF 100%)' }}
                      >
                        <Check className="w-3 h-3" />
                        Apply Fix
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleIgnore(rec.id, rec.title)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                        Ignore
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleFlag(rec.title)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Flag className="w-3 h-3" />
                        Flag
                      </motion.button>
                    </div>
                  )}

                  {isApplied && (
                    <div className="flex items-center gap-2 text-xs text-[#00B86B]">
                      <Check className="w-4 h-4" />
                      <span className="font-medium">Applied</span>
                    </div>
                  )}

                  {isIgnored && (
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <X className="w-4 h-4" />
                      <span className="font-medium">Ignored</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
