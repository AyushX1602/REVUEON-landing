import { motion } from 'framer-motion';
import { BarChart3, Package, Settings, HelpCircle, Sparkles, LayoutDashboard, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';

export function Sidebar({ activeTab, onTabChange }) {
  const [hoveredItem, setHoveredItem] = useState(null);
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
      className="bg-sidebar border-r border-sidebar-border flex flex-col h-screen relative transition-colors duration-300"
    >
      <div 
        className="absolute inset-0 bg-sidebar transition-colors duration-300"
        aria-hidden="true"
      />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -right-3 top-20 z-[60] w-6 h-6 text-sidebar-foreground rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
          style={{ background: 'var(--sidebar-primary)' }}
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
          <div className="flex items-center gap-3 overflow-hidden">
             <Link to="/" className="flex items-center gap-2">
                <BrandLogo light={true} />
             </Link>
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
                {/* Background glow effect - Active State */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl"
                    style={{ 
                      background: 'var(--sidebar-primary)',
                      boxShadow: '0 4px 12px -2px rgba(227, 242, 33, 0.3)'
                    }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {/* Hover effect - Inactive State */}
                {isHovered && !isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 rounded-xl"
                    style={{ background: 'var(--sidebar-accent)' }}
                  />
                )}

                {/* Content */}
                <div className="relative flex items-center gap-3 p-3 text-left">
                  <motion.div
                    animate={{
                      scale: isActive ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <Icon
                      className={`w-5 h-5 transition-colors duration-200 ${
                        isActive ? 'text-sidebar-foreground' : 'text-sidebar-foreground/70 group-hover:text-sidebar-foreground'
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
                    className={`text-sm whitespace-nowrap overflow-hidden transition-colors duration-200 ${
                      isActive ? 'text-sidebar-foreground font-medium' : 'text-sidebar-foreground/70 group-hover:text-sidebar-foreground'
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
            className="w-full relative overflow-hidden rounded-lg p-4 text-sidebar-foreground"
            style={{ background: 'var(--sidebar-primary)' }}
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
