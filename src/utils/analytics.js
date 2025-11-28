// Analytics tracking utility
const ENABLE_ANALYTICS = import.meta.env.VITE_ENABLE_ANALYTICS === 'true';
const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;

class Analytics {
  constructor() {
    this.isInitialized = false;
  }

  init() {
    if (!ENABLE_ANALYTICS || !GA_TRACKING_ID || this.isInitialized) {
      return;
    }

    // Load Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID);

    this.isInitialized = true;
    console.log('📊 Analytics initialized');
  }

  // Track page views
  pageView(path, title) {
    if (!ENABLE_ANALYTICS || !window.gtag) return;
    
    window.gtag('config', GA_TRACKING_ID, {
      page_path: path,
      page_title: title,
    });
    
    console.log('📄 Page view:', { path, title });
  }

  // Track events
  event(action, category, label, value) {
    if (!ENABLE_ANALYTICS || !window.gtag) {
      console.log('📊 Event:', { action, category, label, value });
      return;
    }

    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  // Track button clicks
  trackClick(buttonName, location) {
    this.event('click', 'Button', `${buttonName} - ${location}`);
  }

  // Track form submissions
  trackFormSubmit(formName, success = true) {
    this.event('submit', 'Form', formName, success ? 1 : 0);
  }

  // Track errors
  trackError(errorMessage, errorLocation) {
    this.event('error', 'Error', `${errorLocation}: ${errorMessage}`);
  }

  // Track scroll depth
  trackScrollDepth(percentage) {
    this.event('scroll', 'Scroll Depth', `${percentage}%`, percentage);
  }

  // Track video interactions (for future demo videos)
  trackVideo(action, videoName, duration) {
    this.event(action, 'Video', videoName, duration);
  }
}

export const analytics = new Analytics();

// React hook for analytics
export const useAnalytics = () => {
  const trackPageView = (path, title) => analytics.pageView(path, title);
  const trackEvent = (action, category, label, value) => analytics.event(action, category, label, value);
  const trackClick = (buttonName, location) => analytics.trackClick(buttonName, location);
  const trackFormSubmit = (formName, success) => analytics.trackFormSubmit(formName, success);
  
  return {
    trackPageView,
    trackEvent,
    trackClick,
    trackFormSubmit,
  };
};

export default analytics;
