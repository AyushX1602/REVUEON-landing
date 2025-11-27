import { motion } from 'framer-motion';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

const tickets = [
  {
    id: '#12345',
    subject: 'Integration issue',
    status: 'Open',
    date: '2 hours ago',
  },
  {
    id: '#12344',
    subject: 'Billing question',
    status: 'Resolved',
    date: '1 day ago',
  },
  {
    id: '#12343',
    subject: 'Feature request',
    status: 'In Progress',
    date: '3 days ago',
  },
];

export function TicketStatus() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl text-gray-900 dark:text-white">Your Tickets</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track support requests</p>
      </div>

      <div className="space-y-3">
        {tickets.map((ticket, index) => (
          <motion.div
            key={ticket.id}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-teal-200 dark:hover:border-teal-700 hover:bg-teal-50/30 dark:hover:bg-teal-900/10 transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm text-gray-900 dark:text-white">{ticket.subject}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{ticket.id}</p>
              </div>
              <span
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                  ticket.status === 'Resolved'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : ticket.status === 'In Progress'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                }`}
              >
                {ticket.status === 'Resolved' && <CheckCircle className="w-3 h-3" />}
                {ticket.status === 'In Progress' && <Clock className="w-3 h-3" />}
                {ticket.status === 'Open' && <AlertCircle className="w-3 h-3" />}
                {ticket.status}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{ticket.date}</p>
          </motion.div>
        ))}
      </div>

      <button className="w-full mt-4 text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300" aria-label="View all support tickets">
        View all tickets
      </button>
    </div>
  );
}
