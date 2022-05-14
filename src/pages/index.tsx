/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';

import Content from '@/components/content';
import Seo from '@/components/Seo';
import DashboardLayout from '@/dashboard/layout';

const Home: NextPage = () => {
  return (
    <>
      <Seo />
      <DashboardLayout>
        <Content title='Users' />
      </DashboardLayout>
    </>
  );
};

export default Home;
