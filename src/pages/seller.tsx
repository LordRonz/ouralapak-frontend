import type { NextPage } from 'next';
import React from 'react';

import AnimatePage from '@/components/AnimatePage';
import SellerMain from '@/components/Iklan/SellerMain';
import Footer from '@/components/Layout/Footer/FooterOne/Footer';
import HeaderIklan from '@/components/Layout/Header/HeaderIklan';
import Seo from '@/components/Seo';

const SellerPage: NextPage = () => {
  return (
    <>
      <Seo templateTitle='Seller' />
      <AnimatePage>
        <HeaderIklan />
        <SellerMain />
        <Footer />
      </AnimatePage>
    </>
  );
};

export default SellerPage;
