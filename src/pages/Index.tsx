import React from 'react';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import HowItWorks from '@/components/HowItWorks';
import FeaturedProducts from '@/components/FeaturedProducts';
import Testimonials from '@/components/Testimonials';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PointsRewards from '@/components/PointsRewards';
import EmpowerMothers from '@/components/EmpowerMothers';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Services />
      <HowItWorks />
      <PointsRewards />
      <EmpowerMothers />
      <FeaturedProducts />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
