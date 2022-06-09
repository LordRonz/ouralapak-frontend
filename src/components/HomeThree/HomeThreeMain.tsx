import React from 'react';

import CategoryFilter from '@/components/HomeThree/CategoryFilter';
import ExploreArtsThree from '@/components/HomeThree/ExploreArtsThree';
import HeroSectionThree from '@/components/HomeThree/HeroSectionThree';
import SidebarMenuSection from '@/components/HomeThree/SidebarMenuSection';
import HeaderTwo from '@/components/Layout/Header/HeaderTwo';

const HomeThreeMain = () => {
  return (
    <main>
      <HeaderTwo />
      <SidebarMenuSection />
      <CategoryFilter />
      <HeroSectionThree />
      <ExploreArtsThree />
    </main>
  );
};

export default HomeThreeMain;
