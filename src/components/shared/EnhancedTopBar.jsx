import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Bell, Download, User, ChevronDown, Settings, LogOut, Search, Command } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function EnhancedTopBar({ darkMode, onToggleDarkMode, onOpenCommandPalette }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const profileRef = useRef(null);
  const exportRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (exportRef.current && !exportRef.current.contains(event.target)) {
        setShowExportMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExport = (format) => {
    alert(`Exporting as ${format}... (Demo mode)`);
    setShowExportMenu(false);
  };

  return (
    <div className="flex items-center gap-3">
      {/* Notification Bell */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setNotificationCount(0)}
        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-[#6B7C93] dark:text-gray-400"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {notificationCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center text-[#47423D] rounded-full"
            style={{ background: '#E3F221' }}
          >
            {notificationCount}
          </motion.span>
        )}
      </motion.button>

      {/* Export Button */}
      <div ref={exportRef} className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowExportMenu(!showExportMenu)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#47423D] text-sm transition-all hover:shadow-lg"
          style={{ background: '#E3F221' }}
        >
          <Download className="w-4 h-4" />
          <span>Export</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showExportMenu ? 'rotate-180' : ''}`} />
        </motion.button>

        <AnimatePresence>
          {showExportMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl overflow-hidden z-50"
            >
              <button
                onClick={() => handleExport('CSV')}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export as CSV
              </button>
              <button
                onClick={() => handleExport('PDF')}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export as PDF
              </button>
              <button
                onClick={() => handleExport('Excel')}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export as Excel
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Theme Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggleDarkMode}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle dark mode"
      >
        <AnimatePresence mode="wait">
          {darkMode ? (
            <motion.div
              key="sun"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Sun className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Moon className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* User Profile Dropdown */}
      <div ref={profileRef} className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
            style={{ background: 'linear-gradient(135deg, #635BFF 0%, #00D4FF 100%)' }}
          >
            JD
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm text-[#32325D] dark:text-white">John Doe</p>
            <p className="text-xs text-[#6B7C93] dark:text-gray-400">Analyst</p>
          </div>
          <ChevronDown className={`w-4 h-4 text-[#6B7C93] dark:text-gray-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
        </motion.button>

        <AnimatePresence>
          {showProfileMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl overflow-hidden z-50"
            >
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">john.doe@company.com</p>
                <span className="inline-block mt-2 px-2 py-0.5 text-xs rounded-full bg-[#E6F3FF] text-[#3297FF] dark:bg-[#3297FF]/20">
                  Analyst
                </span>
              </div>
              <button
                onClick={() => setShowProfileMenu(false)}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                View Profile
              </button>
              <button
                onClick={() => setShowProfileMenu(false)}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <div className="border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full px-4 py-2.5 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Command Palette Button */}
      {onOpenCommandPalette && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenCommandPalette}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Open Command Palette"
        >
          <Command className="w-5 h-5" />
        </motion.button>
      )}

      {/* Search Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
