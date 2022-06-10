import type { NextPage } from 'next';
import React from 'react';
import { Toaster } from 'react-hot-toast';

import AnimatePage from '@/components/AnimatePage';
import ForgotPasswordComponent from '@/components/ForgotPassword/ForgotPassword';
import Footer from '@/components/Layout/Footer/FooterOne/Footer';
import Header from '@/components/Layout/Header/Header';
import Seo from '@/components/Seo';
import { toastStyle } from '@/constant/toast';

const ForgotPassword: NextPage = () => {
  return (
    <>
      <Seo templateTitle='Lupa Password' />
      <AnimatePage>
        <Header />
        <ForgotPasswordComponent />
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

export default ForgotPassword;
