import type { NextPage } from 'next';
import React from 'react';

import AnimatePage from '@/components/AnimatePage';
import CekInvoice from '@/components/CekInvoice/CekInvoice';
import Footer from '@/components/Layout/Footer/FooterOne/Footer';
import HeaderIklan from '@/components/Layout/Header/HeaderIklan';
import Seo from '@/components/Seo';

const CekInvoicePage: NextPage = () => {
  return (
    <>
      <Seo templateTitle='Cek Invoice' />
      <AnimatePage>
        <HeaderIklan />
        <CekInvoice />
        <Footer />
      </AnimatePage>
    </>
  );
};

export default CekInvoicePage;
