import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './Dashboard';
import PageLoader from './components/PageLoader';
import Lenis from 'lenis';

function AppContent() {
  const location = useLocation();
  const [isDashboardLoading, setIsDashboardLoading] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith('/dashboard')) {
      setIsDashboardLoading(true);
      const timer = setTimeout(() => setIsDashboardLoading(false), 1500);
      return () => clearTimeout(timer);
    } else {
      setIsDashboardLoading(false);
    }
  }, [location.pathname]);

  if (isDashboardLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F8F7F7]">
        <PageLoader />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-brand-bg font-sans text-brand-text selection:bg-brand-primary selection:text-brand-text">
        <AppContent />
      </div>
    </Router>
  );
}

export default App;
