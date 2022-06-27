import type { NextPage } from 'next';
import React from 'react';

import AnimatePage from '@/components/AnimatePage';
import ForgotPasswordComponent from '@/components/ForgotPassword/ForgotPassword';
import Footer from '@/components/Layout/Footer/FooterOne/Footer';
import Header from '@/components/Layout/Header/Header';
import Seo from '@/components/Seo';

const ForgotPassword: NextPage = () => {
  return (
    <>
      <Seo templateTitle='Lupa Password' />
      <AnimatePage>
        <Header />
        <ForgotPasswordComponent />
        <Footer />
      </AnimatePage>
    </>
  );
};

export default ForgotPassword;
