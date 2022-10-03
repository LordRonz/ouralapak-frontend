import type { NextPage } from 'next';
import React from 'react';

import AnimatePage from '@/components/AnimatePage';
import Seo from '@/components/Seo';
import UpdateIklan from '@/components/Upload/UpdateIklan';
import DashboardLayout from '@/dashboard/layout';

const AdminIklanPage: NextPage = () => {
  return (
    <>
      <Seo templateTitle='Edit Iklan' />
      <AnimatePage>
        <DashboardLayout>
          <UpdateIklan />
        </DashboardLayout>
      </AnimatePage>
    </>
  );
};

export default AdminIklanPage;
