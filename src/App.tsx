import { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import Navbar from './components/landing/Navbar';
import Hero from './components/landing/Hero';
import ProductSuite from './components/landing/ProductSuite';
import ParallaxSection from './components/landing/ParallaxSection';
import KineticIntro from './components/landing/KineticIntro';
import SEOHead from './components/shared/SEOHead';
import PageLoader from './components/PageLoader';
import ErrorBoundary from './components/shared/ErrorBoundary';
import PerformanceMonitor from './components/shared/PerformanceMonitor';

// Lazy load heavy components
const Login = lazy(() => import('./components/Login'));
const Signup = lazy(() => import('./components/Signup'));
const LandingPage = lazy(() => import('./components/landing/LandingPage'));

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Configure NProgress
NProgress.configure({ 
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.08,
  easing: 'ease',
  speed: 500,
});

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const [showIntro, setShowIntro] = useState(true);

  // Progress bar on route change
  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => NProgress.done(), 300);
    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [location.pathname]);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling (only on non-dashboard pages)
    if (isDashboard) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // RAF loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isDashboard]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <SEOHead />
        {showIntro && <KineticIntro onComplete={() => setShowIntro(false)} />}
        {!isDashboard && <Navbar />}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <PerformanceMonitor />
        <AppContent />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
