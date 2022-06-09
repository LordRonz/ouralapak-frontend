import React from 'react';

import ThemeChanger from '@/components/Common/ThemeChanger';
import ArtWorksSection from '@/components/HomeOne/ArtWorksSection';
import BrowseCategorySection from '@/components/HomeOne/BrowseCategorySection';
import HeroSection from '@/components/HomeOne/HeroSection';
import LiveOctionSection from '@/components/HomeOne/LiveOctionSection';
import PopularSection from '@/components/HomeOne/PopularSection';
import TopSellerSection from '@/components/HomeOne/TopSellerSection';
import WalletSection from '@/components/HomeOne/WalletSection';
import WorkProcessSection from '@/components/HomeOne/WorkProcessSection';

const HomeOneMain = () => {
  return (
    <main>
      <ThemeChanger />
      <HeroSection />
      <WalletSection />
      <LiveOctionSection />
      <BrowseCategorySection />
      <TopSellerSection />
      <PopularSection />
      <ArtWorksSection />
      <WorkProcessSection />
    </main>
  );
};

export default HomeOneMain;
