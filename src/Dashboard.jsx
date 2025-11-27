import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Overview } from './components/Overview';
import { Analytics } from './components/Analytics';
import { Products } from './components/Products';
import { Settings } from './components/Settings';
import { Support } from './components/Support';
import { EnhancedTopBar } from './components/shared/EnhancedTopBar';
import { ToastContainer } from './components/shared/Toast';
import { ToastProvider } from './contexts/ToastContext';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { CommandPalette } from './components/shared/CommandPalette';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('dark-mode');
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [toasts, setToasts] = useState([]);

  // Command Palette keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape' && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen]);

  const addToast = (message, type) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('dark-mode', JSON.stringify(newMode));
    
    // Add transition class before toggling
    document.documentElement.classList.add('theme-transition');
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Show toast notification
    addToast(`Switched to ${newMode ? 'dark' : 'light'} mode`, 'success');
    
    // Remove transition class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);
  };

  // Set initial dark mode on mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <ErrorBoundary>
      <ToastProvider addToast={addToast}>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-200"
          >
            {sidebarOpen ? (
              <X className="w-6 h-6 text-gray-900 dark:text-white" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
            )}
          </button>

          {/* Mobile Overlay */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden fixed inset-0 bg-black/50 z-30"
              />
            )}
          </AnimatePresence>

          {/* Sidebar */}
          <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-40 lg:z-10 transition-transform duration-300 ease-in-out`}>
            <Sidebar activeTab={activeTab} onTabChange={(tab) => { setActiveTab(tab); setSidebarOpen(false); }} />
          </div>

          {/* Main Content Area with TopBar */}
          <div className="flex-1 flex flex-col overflow-hidden relative z-0 bg-[#F8F7F7] dark:bg-gray-900 transition-colors duration-300">
            {/* Top Utility Bar */}
            <div className="flex-shrink-0 bg-[#F8F7F7]/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800 px-6 py-4 relative z-20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-heading font-semibold text-[#47423D] dark:text-white capitalize hidden sm:block tracking-tight">
                    {activeTab === 'overview' ? 'Dashboard Overview' : activeTab}
                  </h2>
                </div>
                <EnhancedTopBar 
                  darkMode={darkMode} 
                  onToggleDarkMode={toggleDarkMode}
                  onOpenCommandPalette={() => setCommandPaletteOpen(true)}
                />
              </div>
            </div>

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 scroll-smooth">
              <div className="max-w-7xl mx-auto space-y-6">
                {activeTab === 'overview' && <Overview />}
                {activeTab === 'analytics' && <Analytics />}
                {activeTab === 'products' && <Products />}
                {activeTab === 'settings' && <Settings />}
                {activeTab === 'support' && <Support />}
              </div>
            </main>
          </div>

          {/* Toast Container */}
          <ToastContainer toasts={toasts} onRemove={removeToast} />

          {/* Command Palette */}
          <CommandPalette 
            isOpen={commandPaletteOpen} 
            onClose={() => setCommandPaletteOpen(false)}
            onNavigate={setActiveTab}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        </div>
      </ToastProvider>
    </ErrorBoundary>
  );
}
