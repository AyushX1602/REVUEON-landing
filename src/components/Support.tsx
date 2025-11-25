import { motion } from 'motion/react';
import { FAQSection } from './support/FAQSection';
import { ContactSupport } from './support/ContactSupport';
import { DocumentationLinks } from './support/DocumentationLinks';
import { TicketStatus } from './support/TicketStatus';

export function Support() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 
          className="text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 'var(--tracking-tight)' }}
        >
          Support Center
        </h1>
        <p 
          className="text-sm text-gray-600 dark:text-gray-400 mt-1"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Get help and find answers
        </p>
      </motion.div>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <ContactSupport />
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <TicketStatus />
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <FAQSection />
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <DocumentationLinks />
        </motion.div>
      </div>
    </div>
  );
}