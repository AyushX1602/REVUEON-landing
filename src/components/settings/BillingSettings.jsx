import { motion } from 'motion/react';
import { CreditCard, Download } from 'lucide-react';

const invoices = [
  { date: 'Nov 2025', amount: '$49.00', status: 'Paid' },
  { date: 'Oct 2025', amount: '$49.00', status: 'Paid' },
  { date: 'Sep 2025', amount: '$49.00', status: 'Paid' },
];

export function BillingSettings() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl text-gray-900 dark:text-white">Billing & Subscription</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your subscription and billing</p>
      </div>

      <div className="space-y-4">
        {/* Current Plan */}
        <div className="p-4 rounded-lg bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-900/10 border border-teal-200 dark:border-teal-800">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm text-gray-900 dark:text-white">Current Plan</p>
              <p className="text-lg text-teal-700 dark:text-teal-400">Pro Plan</p>
            </div>
            <p className="text-2xl text-gray-900 dark:text-white">$49<span className="text-sm text-gray-600 dark:text-gray-400">/mo</span></p>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Next billing date: Dec 12, 2025</p>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full px-4 py-2 text-sm text-teal-600 dark:text-teal-400 border border-teal-600 dark:border-teal-400 rounded-lg hover:bg-white dark:hover:bg-teal-900/30 transition-colors"
          >
            Upgrade Plan
          </motion.button>
        </div>

        {/* Payment Method */}
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <CreditCard className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <div>
              <p className="text-sm text-gray-900 dark:text-white">Payment Method</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">•••• •••• •••• 4242</p>
            </div>
          </div>
          <button className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300">
            Update payment method
          </button>
        </div>

        {/* Recent Invoices */}
        <div>
          <p className="text-sm text-gray-900 dark:text-white mb-3">Recent Invoices</p>
          <div className="space-y-2">
            {invoices.map((invoice, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
              >
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">{invoice.date}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{invoice.amount}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-900/30 px-2 py-1 rounded-full">
                    {invoice.status}
                  </span>
                  <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-label="Download invoice">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
