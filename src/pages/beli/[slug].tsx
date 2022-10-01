import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import AnimatePage from '@/components/AnimatePage';
import BeliAkunMain from '@/components/BeliAkun/BeliAkunMain';
import Footer from '@/components/Layout/Footer/FooterOne/Footer';
import HeaderIklan from '@/components/Layout/Header/HeaderIklan';
import Seo from '@/components/Seo';

const BeliAkun: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Seo templateTitle='Iklan' />
      <AnimatePage>
        <HeaderIklan />
        <BeliAkunMain id={+(slug as string)} />
        <Footer />
      </AnimatePage>
    </>
  );
};

export default BeliAkun;
