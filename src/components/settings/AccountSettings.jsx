import { motion } from 'framer-motion';
import { User, Mail, Building } from 'lucide-react';

export function AccountSettings() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl text-gray-900 dark:text-white">Account Information</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your account details</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 mb-2">
            <User className="w-4 h-4" />
            Full Name
          </label>
          <input
            type="text"
            defaultValue="John Doe"
            className="w-full px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent"
            aria-label="Full name"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 mb-2">
            <Mail className="w-4 h-4" />
            Email Address
          </label>
          <input
            type="email"
            defaultValue="john.doe@company.com"
            className="w-full px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent"
            aria-label="Email address"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 mb-2">
            <Building className="w-4 h-4" />
            Company Name
          </label>
          <input
            type="text"
            defaultValue="Acme Corporation"
            className="w-full px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent"
            aria-label="Company name"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full px-4 py-2 text-sm text-white rounded-lg transition-colors shadow-sm"
          style={{ background: 'linear-gradient(135deg, #635BFF 0%, #00D4FF 100%)' }}
          aria-label="Save account changes"
        >
          Save Changes
        </motion.button>
      </div>
    </div>
  );
}
