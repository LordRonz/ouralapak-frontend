import React from 'react';

import HeroSection from '@/components/HomeOne/HeroSection';
import WorkProcessSection from '@/components/HomeOne/WorkProcessSection';

import JelajahIklanSection from './JelajahIklanSection';

const HomeOneMain = () => {
  return (
    <main>
      <HeroSection />
      <JelajahIklanSection />
      <WorkProcessSection />
    </main>
  );
};

export default HomeOneMain;
