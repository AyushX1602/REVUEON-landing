import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { useState } from 'react';

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    reviewAlerts: true,
    weeklyReports: false,
    negativeReviews: true,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl text-gray-900 dark:text-white">Notifications</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Configure your notification preferences</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <div>
              <p className="text-sm text-gray-900 dark:text-white">Email Notifications</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Receive updates via email</p>
            </div>
          </div>
          <motion.button
            onClick={() => toggleSetting('emailNotifications')}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              settings.emailNotifications ? 'bg-[#635BFF]' : 'bg-gray-300 dark:bg-gray-600'
            }`}
            aria-label="Toggle email notifications"
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                settings.emailNotifications ? 'translate-x-5' : ''
              }`}
            />
          </motion.button>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <div>
              <p className="text-sm text-gray-900 dark:text-white">Review Alerts</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">New review notifications</p>
            </div>
          </div>
          <button
            onClick={() => toggleSetting('reviewAlerts')}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              settings.reviewAlerts ? 'bg-[#635BFF]' : 'bg-gray-300 dark:bg-gray-600'
            }`}
            aria-label="Toggle review alerts"
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                settings.reviewAlerts ? 'translate-x-5' : ''
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <div>
              <p className="text-sm text-gray-900 dark:text-white">Weekly Reports</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Summary every Monday</p>
            </div>
          </div>
          <button
            onClick={() => toggleSetting('weeklyReports')}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              settings.weeklyReports ? 'bg-[#635BFF]' : 'bg-gray-300 dark:bg-gray-600'
            }`}
            aria-label="Toggle weekly reports"
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                settings.weeklyReports ? 'translate-x-5' : ''
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <div>
              <p className="text-sm text-gray-900 dark:text-white">Negative Review Alerts</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Instant alerts for low ratings</p>
            </div>
          </div>
          <button
            onClick={() => toggleSetting('negativeReviews')}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              settings.negativeReviews ? 'bg-[#635BFF]' : 'bg-gray-300 dark:bg-gray-600'
            }`}
            aria-label="Toggle negative review alerts"
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                settings.negativeReviews ? 'translate-x-5' : ''
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
