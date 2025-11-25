import { motion } from 'motion/react';
import { Mail, MessageSquare, Send } from 'lucide-react';

export function ContactSupport() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl text-gray-900 dark:text-white">Contact Support</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Send us a message and we'll get back to you</p>
      </div>

      <form className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 mb-2">
            <Mail className="w-4 h-4" />
            Subject
          </label>
          <input
            type="text"
            placeholder="Brief description of your issue"
            className="w-full px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent"
            aria-label="Support ticket subject"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 mb-2">
            <MessageSquare className="w-4 h-4" />
            Message
          </label>
          <textarea
            rows={6}
            placeholder="Describe your issue in detail..."
            className="w-full px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent resize-none"
            aria-label="Support ticket message"
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Priority</label>
          <div className="flex gap-2">
            <button
              type="button"
              className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Set low priority"
            >
              Low
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm text-white rounded-lg transition-colors shadow-sm"
              style={{ background: 'linear-gradient(135deg, #635BFF 0%, #00D4FF 100%)' }}
              aria-label="Set medium priority"
            >
              Medium
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Set high priority"
            >
              High
            </button>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-white rounded-lg transition-colors shadow-sm"
          style={{ background: 'linear-gradient(135deg, #635BFF 0%, #00D4FF 100%)' }}
          aria-label="Send support message"
        >
          <Send className="w-4 h-4" />
          Send Message
        </motion.button>
      </form>
    </div>
  );
}
