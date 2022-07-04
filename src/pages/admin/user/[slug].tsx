import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import AnimatePage from '@/components/AnimatePage';
import ProfileAdmin from '@/components/Profile/ProfileAdmin';
import Seo from '@/components/Seo';
import DashboardLayout from '@/dashboard/layout';

const AdminUserPage: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Seo templateTitle='Iklan' />
      <AnimatePage>
        <DashboardLayout>
          <ProfileAdmin id={+(slug as string)} />
        </DashboardLayout>
      </AnimatePage>
    </>
  );
};

export default AdminUserPage;
