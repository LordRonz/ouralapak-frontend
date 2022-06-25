import type { NextPage } from 'next';

import AnimatePage from '@/components/AnimatePage';
import Footer from '@/components/Layout/Footer/FooterOne/Footer';
import HeaderIklan from '@/components/Layout/Header/HeaderIklan';
import Seo from '@/components/Seo';
import UploadMain from '@/components/Upload/UploadMain';

const PostIklan: NextPage = () => {
  return (
    <>
      <Seo />
      <AnimatePage>
        <HeaderIklan />
        <UploadMain />
        <Footer />
      </AnimatePage>
    </>
  );
};

export default PostIklan;
