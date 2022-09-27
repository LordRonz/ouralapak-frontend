import type { NextPage } from 'next';
import React from 'react';

import AnimatePage from '@/components/AnimatePage';
import CekInvoice from '@/components/CekInvoice/CekInvoice';
import Footer from '@/components/Layout/Footer/FooterOne/Footer';
import Header from '@/components/Layout/Header/Header';
import Seo from '@/components/Seo';

const CekInvoicePage: NextPage = () => {
  return (
    <>
      <Seo templateTitle='Cek Invoice' />
      <AnimatePage>
        <Header />
        <CekInvoice />
        <Footer />
      </AnimatePage>
    </>
  );
};

export default CekInvoicePage;
