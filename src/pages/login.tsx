import type { NextPage } from 'next';
import React from 'react';
import { Toaster } from 'react-hot-toast';

import AnimatePage from '@/components/AnimatePage';
import Footer from '@/components/Layout/Footer/FooterOne/Footer';
import Header from '@/components/Layout/Header/Header';
import LoginMain from '@/components/Login/LoginMain';
import Seo from '@/components/Seo';
import { toastStyle } from '@/constant/toast';

const Login: NextPage = () => {
  return (
    <>
      <Seo templateTitle='Login' />
      <AnimatePage>
        <Header />
        <LoginMain />
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

export default Login;
