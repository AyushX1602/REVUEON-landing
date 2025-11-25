import { motion } from 'motion/react';
import { Book, Video, FileText, ArrowRight } from 'lucide-react';

const resources = [
  {
    title: 'Getting Started Guide',
    description: 'Complete walkthrough for new users',
    icon: Book,
    link: '#',
  },
  {
    title: 'Video Tutorials',
    description: 'Learn through step-by-step videos',
    icon: Video,
    link: '#',
  },
  {
    title: 'API Documentation',
    description: 'Developer resources and API docs',
    icon: FileText,
    link: '#',
  },
  {
    title: 'Best Practices',
    description: 'Tips to maximize your results',
    icon: Book,
    link: '#',
  },
];

export function DocumentationLinks() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl text-gray-900 dark:text-white">Documentation</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Learn more about using Revueon</p>
      </div>

      <div className="space-y-3">
        {resources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <motion.a
              key={index}
              href={resource.link}
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-teal-200 dark:hover:border-teal-700 hover:bg-teal-50 dark:hover:bg-teal-900/10 transition-all group"
              aria-label={`View ${resource.title}`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                  <Icon className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">{resource.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{resource.description}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
