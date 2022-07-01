import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import AnimatePage from '@/components/AnimatePage';
import IklanAdminEdit from '@/components/Iklan/IklanAdminEdit';
import Seo from '@/components/Seo';
import DashboardLayout from '@/dashboard/layout';

const AdminIklanPage: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Seo templateTitle='Edit Iklan' />
      <AnimatePage>
        <DashboardLayout>
          <IklanAdminEdit id={+(slug as string)} />
        </DashboardLayout>
      </AnimatePage>
    </>
  );
};

export default AdminIklanPage;
