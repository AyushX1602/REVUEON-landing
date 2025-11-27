import { motion } from 'framer-motion';
import { BarChart3, Package, Settings, HelpCircle, Sparkles, LayoutDashboard, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(() => {
    const saved = localStorage.getItem('sidebar-expanded');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', JSON.stringify(isExpanded));
  }, [isExpanded]);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'products', label: 'Products Reports', icon: Package },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'support', label: 'Support', icon: HelpCircle },
  ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ 
        x: 0, 
        opacity: 1,
        width: isExpanded ? 256 : 80
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200 dark:border-gray-800 flex flex-col h-screen relative"
      style={{
        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
      }}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-b from-white/95 to-white/90 dark:from-gray-900/95 dark:to-gray-900/90 backdrop-blur-xl"
        aria-hidden="true"
      />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -right-3 top-20 z-[60] w-6 h-6 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
          style={{ background: 'linear-gradient(135deg, #635BFF 0%, #00D4FF 100%)' }}
        >
          {isExpanded ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        </button>

        {/* Logo/Brand */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="p-6 border-b border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #635BFF 0%, #00D4FF 100%)' }}>
              <span className="text-white font-display relative z-10" style={{ fontFamily: 'var(--font-display)' }}>R</span>
              {/* Animated shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            </div>
            <motion.h1 
              initial={false}
              animate={{ 
                opacity: isExpanded ? 1 : 0,
                width: isExpanded ? 'auto' : 0
              }}
              transition={{ duration: 0.3 }}
              className="tracking-tight whitespace-nowrap overflow-hidden font-display"
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: '1.25rem', 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #635BFF 0%, #00D4FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Revueon
            </motion.h1>
          </div>
        </motion.div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isHovered = hoveredItem === item.id;

            return (
              <motion.button
                key={item.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index + 0.3, duration: 0.4 }}
                onClick={() => onTabChange(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="w-full relative"
              >
                {/* Background glow effect */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(99, 91, 255, 0.08) 0%, rgba(0, 212, 255, 0.08) 100%)'
                    }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {/* Hover effect */}
                {isHovered && !isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  />
                )}

                {/* Content */}
                <div className="relative flex items-center gap-3 p-3 text-left">
                  <motion.div
                    animate={{
                      scale: isActive ? 1.1 : 1,
                      rotate: isHovered ? 5 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? 'text-[#635BFF]' : 'text-gray-500 dark:text-gray-400'
                      }`}
                    />
                  </motion.div>
                  <motion.span
                    initial={false}
                    animate={{ 
                      opacity: isExpanded ? 1 : 0,
                      width: isExpanded ? 'auto' : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className={`text-sm whitespace-nowrap overflow-hidden ${
                      isActive ? 'text-[#635BFF] dark:text-[#B19EFF]' : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {item.label}
                  </motion.span>
                </div>
              </motion.button>
            );
          })}
        </nav>

        {/* Upgrade Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="p-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full relative overflow-hidden rounded-lg p-4 text-white"
            style={{ background: 'linear-gradient(135deg, #635BFF 0%, #00D4FF 100%)' }}
          >
            {/* Animated background shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />

            <div className="relative flex items-center gap-2 justify-center">
              <Sparkles className="w-4 h-4 flex-shrink-0" />
              <motion.span 
                initial={false}
                animate={{ 
                  opacity: isExpanded ? 1 : 0,
                  width: isExpanded ? 'auto' : 0
                }}
                transition={{ duration: 0.3 }}
                className="text-sm whitespace-nowrap overflow-hidden"
              >
                Upgrade now
              </motion.span>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}