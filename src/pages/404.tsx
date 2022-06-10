import type { NextPage } from 'next';

import AnimatePage from '@/components/AnimatePage';
import ErrorPageMain from '@/components/ErrorPage/ErrorPageMain';
import Footer from '@/components/Layout/Footer/FooterOne/Footer';
import Header from '@/components/Layout/Header/Header';
import Seo from '@/components/Seo';

const NotFound: NextPage = () => (
  <>
    <Seo templateTitle='Not Found' />
    <AnimatePage>
      <Header />
      <ErrorPageMain />
      <Footer />
    </AnimatePage>
  </>
);

export default NotFound;
