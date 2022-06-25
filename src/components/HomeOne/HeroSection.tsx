import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import Modal from 'react-responsive-modal';

import ButtonLinkGradient from '@/components/links/ButtonLinkGradient';

const HeroSection = () => {
  const [open, setOpen] = useState(false);
  const onCloseModal = () => setOpen(false);

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={onCloseModal}
        styles={{
          modal: {
            maxWidth: 'unset',
            width: '70%',
            padding: 'unset',
          },
          overlay: {
            background: 'rgba(0, 0, 0, 0.5)',
          },
          closeButton: {
            background: 'yellow',
          },
        }}
        center
      >
        <ReactPlayer
          url='https://youtu.be/YRIHdCJqQOg'
          width='100%'
          height='calc(100vh - 200px)'
        />
      </Modal>
      <div className='banner-area banner-area1 pos-rel fix'>
        <div className='swiper-container'>
          <div className='swiper-wrapper'>
            <div className='swiper-slide'>
              <div className='single-banner single-banner-1 banner-900 d-flex align-items-center pos-rel mb-30'>
                <div className='banner-bg'></div>
                <div className='banner-bg-light'></div>
                <div className='pos-rel container'>
                  <div className='row align-items-center justify-content-between'>
                    <div className='col-xl-6 col-lg-6'>
                      <div className='banner-content banner-content1 banner-content1-1 pt-0'>
                        <h1
                          data-animation='fadeInUp'
                          data-delay='.3s'
                          className='mb-25 font-prata'
                        >
                          Lorem ipsum dolor sit amet <span>cumque</span>
                        </h1>
                        <p
                          data-animation='fadeInUp'
                          data-delay='.5s'
                          className='mb-40'
                        >
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Minima inventore dignissimos cumque earum.
                        </p>
                        <div
                          className='banner-btn mb-105'
                          data-animation='fadeInUp'
                          data-delay='.7s'
                        >
                          <ButtonLinkGradient
                            href='/beli-akun'
                            className='text-white'
                          >
                            Beli Akun
                          </ButtonLinkGradient>
                          <ButtonLinkGradient
                            href='/seller'
                            className='text-white'
                            variant='secondary'
                          >
                            Jual Akun
                          </ButtonLinkGradient>
                          <ButtonLinkGradient
                            href='/jasa-rekber'
                            variant='outline'
                          >
                            Jasa Rekber
                          </ButtonLinkGradient>
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-5 col-lg-6'>
                      <div className='oc-banner-img pos-rel'>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HeroSection;
