import { Download, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <div className="flex gap-3">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleEmailReport}
        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Mail className="w-4 h-4" />
        Email Report
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleDownloadPDF}
        className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
      >
        <Download className="w-4 h-4" />
        Download PDF
      </motion.button>
    </div>
  );
}
