import { Component } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 text-center border border-gray-200 dark:border-gray-800">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                className="w-16 h-16 mx-auto mb-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center"
              >
                <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </motion.div>

              {/* Title */}
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Oops! Something went wrong
              </h1>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                We encountered an unexpected error. Don't worry, your data is safe. Try refreshing the page or go back home.
              </p>

              {/* Error details (in dev mode) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-left">
                  <p className="text-xs font-mono text-red-600 dark:text-red-400 break-all">
                    {this.state.error.message}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={this.handleReset}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try again
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={this.handleGoHome}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium transition-colors"
                >
                  <Home className="w-4 h-4" />
                  Go home
                </motion.button>
              </div>
            </div>

            {/* Help text */}
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
              If this keeps happening, please contact support
            </p>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Inline error state component for use in components
export function ErrorState({ 
  message = "Failed to load data", 
  onRetry 
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12 px-4"
    >
      <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
        <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Something went wrong
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center max-w-sm">
        {message}
      </p>
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors text-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </motion.button>
      )}
    </motion.div>
  );
}
