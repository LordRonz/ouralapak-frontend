/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import { useTheme } from 'next-themes';

import AnimatePage from '@/components/AnimatePage';
import LatestCard from '@/components/LatestCard';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import MainCard from '@/components/MainCard';
import Seo from '@/components/Seo';
import clsxm from '@/lib/clsxm';

const Home: NextPage = () => {
  const { theme } = useTheme();

  return (
    <Layout>
      <Seo />
      <AnimatePage>
        <main>
          <section className={clsxm('flex flex-col justify-center')}>
            <article className='layout flex min-h-[calc(100vh-76px)] items-center'>
              <div className='flex w-full flex-wrap'>
                <div className='mb-6 flex flex-col justify-center space-y-8 md:shrink-0 md:grow-0 md:basis-2/4 md:pr-8'>
                  <h1 className='text-4xl font-extrabold'>
                    Jelajahi, beli, dan jual akun Mobile Legends di sini
                  </h1>
                  <h2 className='text-2xl font-light'>
                    Ouralapak adalah sebuah marketplace yang menyediakan
                  </h2>
                  <div className='flex space-x-5 text-lg'>
                    <ButtonLink
                      href='/explore'
                      className='w-5/12 justify-center rounded-lg py-2'
                    >
                      Explore
                    </ButtonLink>
                    <ButtonLink
                      href='/jual'
                      variant='outline'
                      isDarkBg={theme === 'dark'}
                      className='w-5/12 justify-center rounded-lg py-2'
                    >
                      Jual
                    </ButtonLink>
                  </div>
                </div>
                <div className='space-y-8 md:shrink-0 md:grow-0 md:basis-2/4 md:pl-8'>
                  <MainCard
                    slug='amogus'
                    title='Estes solo lord'
                    image='/images/collection/estes.jpg'
                    content="Many people underestimate this hero, in fact Estes is one of the best support heroes in Mobile Legends. Let's find out the reasons here."
                    price='69.000,00'
                  />
                </div>
              </div>
            </article>
            <article className='layout flex flex-col gap-y-8 border-t border-primary-300 dark:border-gray-500'>
              <div className='flex flex-col items-center justify-center gap-y-4 py-16'>
                <h1 className='text-4xl font-extrabold'>Produk terbaru</h1>
                <p>Temukan akun terbaru yang dijual hanya di sini.</p>
              </div>
              <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <LatestCard
                    slug='amogus'
                    title='Estes solo lord'
                    image='/images/collection/estes.jpg'
                    content="Many people underestimate this hero, in fact Estes is one of the best support heroes in Mobile Legends. Let's find out the reasons here."
                    price='69.000,00'
                    key={i}
                  />
                ))}
              </div>
              <div className='flex items-center justify-center'>
                <ButtonLink
                  href='/explore'
                  className='w-32 justify-center rounded-lg py-3'
                >
                  Explore
                </ButtonLink>
              </div>
            </article>
          </section>
        </main>
      </AnimatePage>
    </Layout>
  );
};

export default Home;
