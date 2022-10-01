import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import AnimatePage from '@/components/AnimatePage';
import IklanMain from '@/components/Iklan/IklanMain';
import Footer from '@/components/Layout/Footer/FooterOne/Footer';
import HeaderIklan from '@/components/Layout/Header/HeaderIklan';
import Seo from '@/components/Seo';

const SellerPage: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Seo templateTitle='Iklan' />
      <AnimatePage>
        <HeaderIklan />
        <IklanMain id={+(slug as string)} />
        {/* <ArtDetailsMain /> */}
        <Footer />
      </AnimatePage>
    </>
  );
};

export default SellerPage;
