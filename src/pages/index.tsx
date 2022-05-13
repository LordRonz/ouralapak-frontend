/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';

import Content from '@/components/content';
import Seo from '@/components/Seo';

const Home: NextPage = () => {
  return (
    <>
      <Seo />
      <Content title='Users' />
    </>
  );
};

export default Home;
