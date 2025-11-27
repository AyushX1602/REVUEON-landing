import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  BarChart3, 
  Package, 
  Settings, 
  HelpCircle, 
  Home,
  Download,
  Filter,
  Moon,
  Sun,
  Command
} from 'lucide-react';

export function CommandPalette({ isOpen, onClose, onNavigate, darkMode, onToggleDarkMode }) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const commands = [
    {
      id: 'nav-overview',
      title: 'Dashboard Overview',
      subtitle: 'View key metrics and insights',
      icon: Home,
      category: 'Pages',
      action: () => { onNavigate('overview'); onClose(); },
      keywords: ['home', 'dashboard', 'overview', 'main']
    },
    {
      id: 'nav-analytics',
      title: 'Analytics',
      subtitle: 'Deep dive into review data',
      icon: BarChart3,
      category: 'Pages',
      action: () => { onNavigate('analytics'); onClose(); },
      keywords: ['analytics', 'charts', 'data', 'sentiment']
    },
    {
      id: 'nav-products',
      title: 'Products',
      subtitle: 'Product performance reports',
      icon: Package,
      category: 'Pages',
      action: () => { onNavigate('products'); onClose(); },
      keywords: ['products', 'items', 'catalog']
    },
    {
      id: 'nav-settings',
      title: 'Settings',
      subtitle: 'Configure your preferences',
      icon: Settings,
      category: 'Pages',
      action: () => { onNavigate('settings'); onClose(); },
      keywords: ['settings', 'preferences', 'config']
    },
    {
      id: 'nav-support',
      title: 'Support',
      subtitle: 'Get help and documentation',
      icon: HelpCircle,
      category: 'Pages',
      action: () => { onNavigate('support'); onClose(); },
      keywords: ['support', 'help', 'faq', 'documentation']
    },
    {
      id: 'action-export',
      title: 'Export Report',
      subtitle: 'Download current data as PDF',
      icon: Download,
      category: 'Actions',
      action: () => { alert('Export initiated'); onClose(); },
      keywords: ['export', 'download', 'pdf', 'report']
    },
    {
      id: 'action-filter',
      title: 'Open Filters',
      subtitle: 'Adjust data filters',
      icon: Filter,
      category: 'Actions',
      action: () => { alert('Filters opened'); onClose(); },
      keywords: ['filter', 'refine', 'search']
    },
    {
      id: 'shortcut-theme',
      title: darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode',
      subtitle: 'Toggle theme appearance',
      icon: darkMode ? Sun : Moon,
      category: 'Shortcuts',
      action: () => { onToggleDarkMode(); onClose(); },
      keywords: ['theme', 'dark', 'light', 'mode', 'appearance']
    }
  ];

  // Fuzzy search
  const filteredCommands = commands.filter(cmd => {
    const searchLower = search.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(searchLower) ||
      cmd.subtitle?.toLowerCase().includes(searchLower) ||
      cmd.keywords?.some(kw => kw.toLowerCase().includes(searchLower))
    );
  });

  // Group by category
  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {});

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev === 0 ? filteredCommands.length - 1 : prev - 1);
      } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
        e.preventDefault();
        filteredCommands[selectedIndex].action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Command Palette */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl mx-4 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200 dark:border-gray-800">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for pages, actions, or shortcuts..."
              className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
              style={{ fontFamily: 'var(--font-body)' }}
            />
            <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400">
              <Command className="w-3 h-3" />
              K
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {filteredCommands.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">No results found</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Try different keywords</p>
              </div>
            ) : (
              Object.entries(groupedCommands).map(([category, items]) => (
                <div key={category} className="py-2">
                  <div className="px-4 py-2">
                    <p 
                      className="text-xs uppercase text-gray-500 dark:text-gray-400"
                      style={{ letterSpacing: 'var(--tracking-wider)' }}
                    >
                      {category}
                    </p>
                  </div>
                  <div>
                    {items.map((cmd, idx) => {
                      const globalIndex = filteredCommands.indexOf(cmd);
                      const Icon = cmd.icon;
                      return (
                        <motion.button
                          key={cmd.id}
                          onClick={cmd.action}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                            selectedIndex === globalIndex
                              ? 'bg-[#635BFF]/10 dark:bg-[#635BFF]/20'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.15 }}
                        >
                          <div className={`p-2 rounded-lg ${
                            selectedIndex === globalIndex
                              ? 'bg-[#635BFF] text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 dark:text-white truncate">{cmd.title}</p>
                            {cmd.subtitle && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{cmd.subtitle}</p>
                            )}
                          </div>
                          {selectedIndex === globalIndex && (
                            <kbd className="hidden sm:block px-2 py-1 bg-white dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                              ↵
                            </kbd>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">↓</kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">↵</kbd>
                <span>Select</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">esc</kbd>
                <span>Close</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
