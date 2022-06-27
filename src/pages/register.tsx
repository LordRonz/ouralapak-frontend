import type { NextPage } from 'next';
import React from 'react';

import AnimatePage from '@/components/AnimatePage';
import Footer from '@/components/Layout/Footer/FooterOne/Footer';
import Header from '@/components/Layout/Header/Header';
import Seo from '@/components/Seo';
import SignUpMain from '@/components/SignUp/SignUpMain';

const Register: NextPage = () => {
  return (
    <>
      <Seo templateTitle='Register' />
      <AnimatePage>
        <Header />
        <SignUpMain />
        <Footer />
      </AnimatePage>
    </>
  );
};

export default Register;
