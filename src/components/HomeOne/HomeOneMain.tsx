import React from 'react';

import HeroSection from '@/components/HomeOne/HeroSection';

import JelajahIklanSection from './JelajahIklanSection';

const HomeOneMain = ({ navHeight }: { navHeight: number }) => {
  return (
    <main>
      <HeroSection navHeight={navHeight} />
      <JelajahIklanSection />
    </main>
  );
};

export default HomeOneMain;
