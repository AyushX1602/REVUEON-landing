import { motion } from 'motion/react';
import { Package, ShoppingBag, Star, CheckCircle } from 'lucide-react';

const integrations = [
  {
    name: 'Shopify',
    icon: ShoppingBag,
    connected: true,
    description: 'Sync your Shopify store reviews',
  },
  {
    name: 'Amazon',
    icon: Package,
    connected: true,
    description: 'Import Amazon product reviews',
  },
  {
    name: 'Google Reviews',
    icon: Star,
    connected: false,
    description: 'Connect Google Business reviews',
  },
];

export function IntegrationSettings() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl text-gray-900 dark:text-white">Integrations</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage connected platforms</p>
      </div>

      <div className="space-y-3">
        {integrations.map((integration, index) => {
          const Icon = integration.icon;
          return (
            <motion.div
              key={index}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-teal-200 dark:hover:border-teal-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                  <Icon className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">{integration.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{integration.description}</p>
                </div>
              </div>
              {integration.connected ? (
                <div className="flex items-center gap-2 text-sm text-teal-600 dark:text-teal-400">
                  <CheckCircle className="w-4 h-4" />
                  Connected
                </div>
              ) : (
                <button className="px-3 py-1.5 text-sm text-teal-600 dark:text-teal-400 border border-teal-600 dark:border-teal-400 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors">
                  Connect
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
