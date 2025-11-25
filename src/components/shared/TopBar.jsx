import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Bell, Download, ChevronDown, Settings, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { DateRangePicker } from './DateRangePicker';

export function TopBar({ darkMode, onToggleDarkMode, showDatePicker = false }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: 'New negative review for Product A', time: '5m ago', unread: true },
    { id: 2, text: 'Weekly report is ready', time: '1h ago', unread: true },
    { id: 3, text: 'Product B sentiment improved by 12%', time: '3h ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleExport = () => {
    alert('Exporting dashboard data...');
  };

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {/* Export Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleExport}
        className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm text-teal-600 dark:text-teal-400 border border-teal-600 dark:border-teal-400 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all duration-200"
        aria-label="Export dashboard data"
      >
        <Download className="w-4 h-4" />
        <span className="hidden md:inline">Export</span>
      </motion.button>

      {/* Notifications */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
          aria-label={`Notifications (${unreadCount} unread)`}
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
            >
              {unreadCount}
            </motion.span>
          )}
        </motion.button>

        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    whileHover={{ backgroundColor: 'rgba(20, 184, 166, 0.05)' }}
                    className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer ${
                      notification.unread ? 'bg-teal-50/50 dark:bg-teal-900/10' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {notification.unread && (
                        <div className="w-2 h-2 bg-teal-500 rounded-full mt-1.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white">{notification.text}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                <button className="w-full text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300">
                  View all notifications
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Theme Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggleDarkMode}
        className="p-2 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
        aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
      >
        <AnimatePresence mode="wait">
          {darkMode ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Profile Dropdown */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center gap-2 p-1.5 pr-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
          aria-label="User profile menu"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            JD
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
        </motion.button>

        <AnimatePresence>
          {showProfileMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">John Doe</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">john.doe@company.com</p>
              </div>
              <div className="p-2">
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(20, 184, 166, 0.1)' }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                >
                  <User className="w-4 h-4" />
                  Profile
                </motion.button>
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(20, 184, 166, 0.1)' }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </motion.button>
              </div>
              <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Date Range Picker */}
      {showDatePicker && <DateRangePicker />}
    </div>
  );
}
