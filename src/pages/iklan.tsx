import type { NextPage } from 'next';

import AnimatePage from '@/components/AnimatePage';
import Footer from '@/components/Layout/Footer/FooterOne/Footer';
import Header from '@/components/Layout/Header/Header';
import Seo from '@/components/Seo';
import UploadMain from '@/components/Upload/UploadMain';

const Home: NextPage = () => {
  return (
    <>
      <Seo />
      <AnimatePage>
        <Header />
        <UploadMain />
        <Footer />
      </AnimatePage>
    </>
  );
};

export default Home;
