import type { NextPage } from 'next';

import AnimatePage from '@/components/AnimatePage';
import Footer from '@/components/Layout/Footer/FooterOne/Footer';
import HeaderIklan from '@/components/Layout/Header/HeaderIklan';
import ProfileMain from '@/components/Profile/ProfileMain';
import Seo from '@/components/Seo';

const ProfilePage: NextPage = () => {
  return (
    <>
      <Seo templateTitle='Profil' />
      <AnimatePage>
        <HeaderIklan />
        <ProfileMain />
        <Footer />
      </AnimatePage>
    </>
  );
};

export default ProfilePage;
