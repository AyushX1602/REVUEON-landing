import { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Only run in development
    if (import.meta.env.DEV) {
      // Log Web Vitals
      if ('web-vital' in window) {
        return;
      }

      // Performance observer for long tasks
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.duration > 50) {
                console.warn('⚠️ Long task detected:', {
                  duration: entry.duration,
                  name: entry.name,
                  startTime: entry.startTime,
                });
              }
            }
          });
          
          observer.observe({ entryTypes: ['longtask', 'measure'] });
          
          return () => observer.disconnect();
        } catch (e) {
          console.log('Performance monitoring not supported');
        }
      }
    }
  }, []);

  useEffect(() => {
    // Log navigation timing on mount
    if (window.performance && window.performance.timing) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const timing = performance.timing;
          const loadTime = timing.loadEventEnd - timing.navigationStart;
          const domReadyTime = timing.domContentLoadedEventEnd - timing.navigationStart;
          
          if (import.meta.env.DEV) {
            console.log('📊 Performance Metrics:', {
              'Page Load Time': `${loadTime}ms`,
              'DOM Ready': `${domReadyTime}ms`,
              'DNS Lookup': `${timing.domainLookupEnd - timing.domainLookupStart}ms`,
              'TCP Connection': `${timing.connectEnd - timing.connectStart}ms`,
            });
          }
        }, 0);
      });
    }
  }, []);

  return null;
};

export default PerformanceMonitor;
