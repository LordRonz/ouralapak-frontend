import type { NextPage } from 'next';
import { useState } from 'react';

import AnimatePage from '@/components/AnimatePage';
import Footer from '@/components/Layout/Footer/FooterOne/Footer';
import Header from '@/components/Layout/Header/Header';
import ProfileMain from '@/components/Profile/ProfileMain';
import Seo from '@/components/Seo';

const ProfilePage: NextPage = () => {
  const [, setNavHeight] = useState<number>();

  return (
    <>
      <Seo templateTitle='Profil' />
      <AnimatePage>
        <Header setHeight={setNavHeight} />
        <ProfileMain />
        <Footer />
      </AnimatePage>
    </>
  );
};

export default ProfilePage;
