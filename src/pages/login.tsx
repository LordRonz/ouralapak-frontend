import type { NextPage } from 'next';
import React from 'react';

import AnimatePage from '@/components/AnimatePage';
import Footer from '@/components/Layout/Footer/FooterOne/Footer';
import Header from '@/components/Layout/Header/Header';
import LoginMain from '@/components/Login/LoginMain';
import Seo from '@/components/Seo';

const Login: NextPage = () => {
  return (
    <>
      <Seo templateTitle='Login' />
      <AnimatePage>
        <Header />
        <LoginMain />
        <Footer />
      </AnimatePage>
    </>
  );
};

export default Login;
