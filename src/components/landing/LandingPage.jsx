import React, { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import FeaturesGrid from './FeaturesGrid';
import Workflow from './Workflow';
import Marquee from './Marquee';
import ProductSuite from './ProductSuite';
import InfiniteTestimonials from './InfiniteTestimonials';
import Footer from './Footer';
import KineticIntro from './KineticIntro';
import ParallaxSection from './ParallaxSection';

const LandingPage = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="min-h-screen bg-[#F8F7F7] overflow-x-hidden">
      {showIntro && <KineticIntro onComplete={() => setShowIntro(false)} />}
      
      <Navbar />
      <Hero />
      <Marquee />
      <FeaturesGrid />
      <Workflow />
      <ParallaxSection />
      <ProductSuite />
      <InfiniteTestimonials />
      <Footer />
    </div>
  );
};

export default LandingPage;
