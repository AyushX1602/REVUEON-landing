import { motion, AnimatePresence } from 'motion/react';
import { Command, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function KeyboardShortcuts({ shortcuts, onClose, isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-[100] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                  <Command className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Keyboard Shortcuts</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Shortcuts List */}
            <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
              {shortcuts.map((shortcut, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="text-sm text-gray-700 dark:text-gray-300">{shortcut.description}</span>
                  <div className="flex items-center gap-1">
                    {shortcut.keys.map((key, keyIndex) => (
                      <span key={keyIndex} className="flex items-center gap-1">
                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-sm">
                          {key}
                        </kbd>
                        {keyIndex < shortcut.keys.length - 1 && (
                          <span className="text-gray-400 dark:text-gray-600">+</span>
                        )}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                Press <kbd className="px-1.5 py-0.5 text-xs font-semibold bg-gray-200 dark:bg-gray-700 rounded">?</kbd> to toggle this menu
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Hook to use keyboard shortcuts
export function useKeyboardShortcuts(shortcuts) {
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Toggle help with ?
      if (event.key === '?' && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        setShowHelp(prev => !prev);
        return;
      }

      // Check for other shortcuts
      shortcuts.forEach(shortcut => {
        const keys = shortcut.keys.map(k => k.toLowerCase());
        const isMeta = keys.includes('⌘') || keys.includes('ctrl');
        const isShift = keys.includes('shift');
        const mainKey = keys.find(k => k !== '⌘' && k !== 'ctrl' && k !== 'shift');

        if (!mainKey) return;

        const metaPressed = event.metaKey || event.ctrlKey;
        const shiftPressed = event.shiftKey;

        if (
          (!isMeta || metaPressed) &&
          (!isShift || shiftPressed) &&
          event.key.toLowerCase() === mainKey
        ) {
          event.preventDefault();
          shortcut.action();
        }
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);

  return { showHelp, setShowHelp };
}
