import * as React from 'react';

import AnimatePage from '@/components/AnimatePage';
import Seo from '@/components/Seo';
import DashboardLayout from '@/dashboard/layout';

const IndexPage = () => {
  return (
    <>
      <Seo templateTitle='Admin | Iklan' />
      <AnimatePage>
        <DashboardLayout>SJJS</DashboardLayout>
      </AnimatePage>
    </>
  );
};

export default IndexPage;
