import { Download, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export function ReportActions() {
  const handleDownloadPDF = () => {
    // Mock PDF download
    alert('PDF Report would be downloaded in production');
  };

  const handleEmailReport = () => {
    // Mock email functionality
    alert('Email report dialog would open in production');
  };

  return (
    <div className="flex gap-2 sm:gap-3">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleEmailReport}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
        aria-label="Email report"
      >
        <Mail className="w-4 h-4" />
        <span className="hidden sm:inline">Email Report</span>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleDownloadPDF}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-white rounded-lg transition-all shadow-lg"
        style={{ background: 'linear-gradient(135deg, #635BFF 0%, #00D4FF 100%)' }}
        aria-label="Download PDF report"
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">Download PDF</span>
        <span className="sm:hidden">PDF</span>
      </motion.button>
    </div>
  );
}
