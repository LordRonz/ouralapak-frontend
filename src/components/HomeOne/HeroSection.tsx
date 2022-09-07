import React from 'react';

import ButtonLinkGradient from '@/components/links/ButtonLinkGradient';

const HeroSection = ({ navHeight }: { navHeight: number }) => {
  // const { data: config } = useSWR<{
  //   data: Config;
  //   message: string;
  //   success: boolean;
  // }>(() => `${API_URL}/master/config/4`);

  // const getWaLink = () =>
  //   queryString.stringifyUrl({
  //     url: `https://wa.me/${config?.data?.value}`,
  //     query: {
  //       text: `Halo admin Oura Lapak,\n\nSaya ingin menggunakan jasa rekber Oura Lapak untuk pembelian akun di luar Oura Lapak. Boleh tanya-tanya dulu?`,
  //     },
  //   });

  return (
    <>
      <div
        className='d-flex align-items-center relative top-4 h-screen overflow-hidden bg-hero-pattern md:pt-0'
        style={{ top: navHeight }}
      >
        <div className='container relative h-full'>
          <div
            className='row align-items-center justify-content-between'
            style={{ height: `calc(100vh - ${navHeight}px` }}
          >
            <div className='col-xl-7 col-lg-7'>
              <div className='banner-content banner-content1 banner-content1-1 hero-info flex flex-col items-center justify-center gap-y-4 pt-0 pb-0 md:items-start'>
                <img
                  src='/images/ouralapak_logo_long.png'
                  alt='logo-img'
                  width={250}
                />
                <h1
                  data-animation='fadeInUp'
                  data-delay='.3s'
                  className='font-prata !text-xl md:!text-4xl'
                >
                  Pusat Jual, Beli, dan Rekber Akun Mobile Legend Aman dan
                  Terpercaya
                </h1>
                <div
                  className='banner-btn'
                  data-animation='fadeInUp'
                  data-delay='.7s'
                >
                  <ButtonLinkGradient
                    href='/beli-akun'
                    className='text-white'
                    variant='tertiary'
                  >
                    Beli Akun
                  </ButtonLinkGradient>
                  <ButtonLinkGradient href='/seller' className='text-white'>
                    Jual Akun
                  </ButtonLinkGradient>
                </div>
              </div>
            </div>
            {/* <div className='col-xl-5 col-lg-5'>
              <div className='oc-banner-img relative'>
                <div className='oc-banner-img-1 stuff'>
                  <img
                    data-depth='.5'
                    src='assets/img/banner/oc-banner-1.jpg'
                    alt='img not found'
                  />
                </div>
                <div className='oc-banner-img-2 stuff2'>
                  <img
                    data-depth='.6'
                    src='assets/img/banner/oc-banner-2.jpg'
                    alt='img not found'
                  />
                </div>
                <div className='oc-banner-img-3 stuff3'>
                  <img
                    data-depth='.3'
                    src='assets/img/banner/oc-banner-3.jpg'
                    alt='img not found'
                  />
                </div>
                <div className='oc-banner-img-4 stuff4'>
                  <img
                    data-depth='.5'
                    src='assets/img/banner/oc-banner-4.jpg'
                    alt='img not found'
                  />
                </div>
              </div>
            </div> */}
            <div className='col-xl-5 col-lg-5 p-0'>
              <img
                loading='lazy'
                src='/images/heroes.png'
                alt='heroes'
                className='block h-auto w-full bg-cover bg-center bg-no-repeat md:hidden'
              />
            </div>
          </div>
        </div>
        <img
          loading='lazy'
          src='/images/heroes.png'
          alt='heroes'
          className='absolute right-0 hidden h-full w-auto bg-cover bg-center bg-no-repeat md:block'
        />
      </div>
      <style jsx>{`
        .hero-info {
          text-align: center;
        }
        @media (min-width: 768px) {
          .hero-info {
            text-align: left;
          }
        }
      `}</style>
    </>
  );
};

export default HeroSection;
