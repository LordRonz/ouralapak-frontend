import React from 'react';
import useSWR from 'swr';

import HeroSection from '@/components/HomeOne/HeroSection';
import WorkProcessSection from '@/components/HomeOne/WorkProcessSection';
import { API_URL } from '@/constant/config';
import { IklanHome } from '@/types/iklan';
import Pagination from '@/types/pagination';

import JelajahIklanSection from './JelajahIklanSection';

const HomeOneMain = () => {
  const { data: iklans } = useSWR<{
    data: { data: IklanHome[]; pagination: Pagination };
    message: string;
    success: boolean;
  }>(`${API_URL}/iklan`);

  if (!iklans) {
    return <></>;
  }

  return (
    <main>
      <HeroSection />
      <JelajahIklanSection iklans={iklans?.data.data} />
      <WorkProcessSection />
    </main>
  );
};

export default HomeOneMain;
