import React, { useState } from 'react';
import Hero from './Hero';
import FeaturesGrid from './FeaturesGrid';
import Workflow from './Workflow';
import Marquee from './Marquee';
import ProductSuite from './ProductSuite';
import InfiniteTestimonials from './InfiniteTestimonials';
import PricingSection from './PricingSection';
import Footer from './Footer';
import ParallaxSection from './ParallaxSection';
import SmoothScroll from './SmoothScroll';
import Preloader from './Preloader';
import ScrollProgress from './ScrollProgress';

const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {/* Preloader */}
      <Preloader onComplete={() => setIsLoaded(true)} />
      
      {/* Scroll Progress Bar */}
      <ScrollProgress position="top" showPercentage={false} />

      {/* Main Content with Smooth Scroll */}
      <SmoothScroll>
        <div className={`min-h-screen bg-[#F8F7F7] overflow-x-hidden transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <Hero />
          <Marquee />
          <FeaturesGrid />
          <Workflow />
          <ParallaxSection />
          <ProductSuite />
          <PricingSection />
          <InfiniteTestimonials />
          <Footer />
        </div>
      </SmoothScroll>
    </>
  );
};

export default LandingPage;
