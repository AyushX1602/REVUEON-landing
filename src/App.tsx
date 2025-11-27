import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Lenis from 'lenis';
import KineticIntro from './components/landing/KineticIntro';
function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.0, // Increased from 1.2 for more "weight"
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Keep easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Slightly reduced for smoother control
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
      {showIntro && <KineticIntro onComplete={() => setShowIntro(false)} />}

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#E3F221] to-[#5B5F97] z-[100] transition-all duration-100 ease-out" style={{ width: `${scrollProgress * 100}%` }}></div>

      <div className="min-h-screen bg-brand-bg font-sans text-brand-text selection:bg-brand-primary selection:text-brand-text">
        <AppContent />
      </div>
    </Router>
  );
}

export default App;
