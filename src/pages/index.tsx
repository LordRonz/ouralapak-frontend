import type { NextPage } from 'next';
import { useState } from 'react';

import AnimatePage from '@/components/AnimatePage';
import HomeOneMain from '@/components/HomeOne/HomeOneMain';
import Footer from '@/components/Layout/Footer/FooterOne/Footer';
import Header from '@/components/Layout/Header/Header';
import Seo from '@/components/Seo';

const Home: NextPage = () => {
  const [navHeight, setNavHeight] = useState<number>();

  return (
    <>
      <Seo />
      <AnimatePage>
        {/* <Header HeaderStatic='oc-transparent-header' /> */}
        <Header setHeight={setNavHeight} />
        <HomeOneMain navHeight={navHeight ?? 0} />
        <Footer />
      </AnimatePage>
    </>
  );
};

export default Home;
