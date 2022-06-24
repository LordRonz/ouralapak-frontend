import type { NextPage } from 'next';
import React from 'react';
import { Toaster } from 'react-hot-toast';

import AnimatePage from '@/components/AnimatePage';
import SellerMain from '@/components/Iklan/SellerMain';
import Footer from '@/components/Layout/Footer/FooterOne/Footer';
import HeaderIklan from '@/components/Layout/Header/HeaderIklan';
import Seo from '@/components/Seo';
import { toastStyle } from '@/constant/toast';

const SellerPage: NextPage = () => {
  return (
    <>
      <Seo templateTitle='Iklan' />
      <AnimatePage>
        <HeaderIklan />
        <SellerMain />
        <Footer />
      </AnimatePage>
      <Toaster
        toastOptions={{
          style: toastStyle,
          loading: {
            iconTheme: {
              primary: '#eb2754',
              secondary: 'black',
            },
          },
        }}
      />
    </>
  );
};

export default SellerPage;
