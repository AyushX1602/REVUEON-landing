import { motion } from 'motion/react';
import { AccountSettings } from './settings/AccountSettings';
import { NotificationSettings } from './settings/NotificationSettings';
import { IntegrationSettings } from './settings/IntegrationSettings';
import { BillingSettings } from './settings/BillingSettings';

export function Settings() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 
          className="text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight font-heading font-bold"
        >
          Settings
        </h1>
        <p 
          className="text-sm text-gray-600 dark:text-gray-400 mt-1"
        >
          Manage your account and preferences
        </p>
      </motion.div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <AccountSettings />
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <NotificationSettings />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <IntegrationSettings />
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <BillingSettings />
        </motion.div>
      </div>
    </div>
  );
}
