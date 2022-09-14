import type { NextPage } from 'next';
import React from 'react';

import AnimatePage from '@/components/AnimatePage';
import SellerMain from '@/components/Iklan/SellerMain';
import Footer from '@/components/Layout/Footer/FooterOne/Footer';
import Header from '@/components/Layout/Header/Header';
import Seo from '@/components/Seo';

const SellerPage: NextPage = () => {
  return (
    <>
      <Seo templateTitle='Seller' />
      <AnimatePage>
        <Header />
        <SellerMain />
        <Footer />
      </AnimatePage>
    </>
  );
};

export default SellerPage;
