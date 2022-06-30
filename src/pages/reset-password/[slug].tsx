import type { NextPage } from 'next';
import React from 'react';

import AnimatePage from '@/components/AnimatePage';
import Footer from '@/components/Layout/Footer/FooterOne/Footer';
import Header from '@/components/Layout/Header/Header';
import ResetPasswordMain from '@/components/ResetPassword/ResetPasswordMain';
import Seo from '@/components/Seo';

const ResetPassword: NextPage = () => {
  return (
    <>
      <Seo templateTitle='Reset Password' />
      <AnimatePage>
        <Header />
        <ResetPasswordMain />
        <Footer />
      </AnimatePage>
    </>
  );
};

export default ResetPassword;
