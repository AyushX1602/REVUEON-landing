import React, { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import FeaturesGrid from './FeaturesGrid';
import Workflow from './Workflow';
import Marquee from './Marquee';
import ProductSuite from './ProductSuite';
import InfiniteTestimonials from './InfiniteTestimonials';
import Footer from './Footer';
import ParallaxSection from './ParallaxSection';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#F8F7F7] overflow-x-hidden">
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
