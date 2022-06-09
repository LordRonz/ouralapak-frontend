import type { NextPage } from 'next';

import AnimatePage from '@/components/AnimatePage';
import HomeOneMain from '@/components/HomeOne/HomeOneMain';
import Footer from '@/components/Layout/Footer/FooterOne/Footer';
import Header from '@/components/Layout/Header/Header';
import Seo from '@/components/Seo';

const Home: NextPage = () => {
  return (
    <>
      <Seo />
      <AnimatePage>
        <Header HeaderStatic='oc-transparent-header' />
        <HomeOneMain />
        <Footer />
      </AnimatePage>
    </>
  );
};

export default Home;
