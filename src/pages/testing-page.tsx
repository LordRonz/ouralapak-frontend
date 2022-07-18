import type { NextPage } from 'next';

import AnimatePage from '@/components/AnimatePage';
import Spinner from '@/components/Common/Spinner';
import Footer from '@/components/Layout/Footer/FooterOne/Footer';
import Header from '@/components/Layout/Header/Header';
import Seo from '@/components/Seo';

const Home: NextPage = () => {
  return (
    <>
      <Seo />
      <AnimatePage>
        <Header />
        <Spinner stroke={6} />
        <Footer />
      </AnimatePage>
    </>
  );
};

export default Home;
