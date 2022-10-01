import Image from 'next/image';
import React, { ReactChild, useState } from 'react';
import { FiInstagram } from 'react-icons/fi';
import Lightbox from 'react-image-lightbox';
import { Carousel } from 'react-responsive-carousel';
import useSWR from 'swr';

import Spinner from '@/components/Common/Spinner';
import UnstyledLink from '@/components/links/UnstyledLink';
import { API_URL } from '@/constant/config';
import toIDRCurrency from '@/lib/toIDRCurrency';
import TrophyGreen from '@/svgs/trophy_green.svg';
import { IklanDetail } from '@/types/iklan';

type CarouselNode = {
  key: null;
  type: string;
  props: {
    children?: CarouselNode[];
    alt?: string;
    src?: string;
  };
};

const IklanAdmin = ({ id }: { id: number }) => {
  const [previewCarousel, setPreviewCarousel] = useState<boolean>(false);
  const [carouselImg, setCarouselImg] = useState<string>();

  const { data: iklan } = useSWR<{
    data: IklanDetail;
    message: string;
    success: boolean;
  }>(`${API_URL}/admin/iklan/${id}`);

  if (!iklan) {
    return <Spinner />;
  }

  return (
    <main>
      <section className='art-details-area bg-white pt-8 dark:!bg-dark'>
        <div className='container'>
          <div className='art-details-wrapper'>
            <div className='row'>
              <div className='col-xl-6 col-lg-3'>
                <Carousel
                  infiniteLoop
                  dynamicHeight={true}
                  onClickItem={(i, item) => {
                    const it = item as CarouselNode;
                    setCarouselImg(it.props.children?.[0].props.src);
                    setPreviewCarousel(true);
                  }}
                  className='hover:cursor-zoom-in'
                >
                  <div>
                    <img
                      src={
                        iklan.data.image_profile
                          ? `${API_URL}/${iklan.data.image_profile}`
                          : ``
                      }
                      alt='profile-img'
                    />
                    <p className='legend'>Profile Image</p>
                  </div>
                  <div>
                    <img
                      src={
                        iklan.data.image_win_rate
                          ? `${API_URL}/${iklan.data.image_win_rate}`
                          : ``
                      }
                      alt='profile-img'
                    />
                    <p className='legend'>Win Rate</p>
                  </div>
                  <div>
                    <img
                      src={
                        iklan.data.image_win_rate_hero
                          ? `${API_URL}/${iklan.data.image_win_rate_hero}`
                          : ``
                      }
                      alt='profile-img'
                    />
                    <p className='legend'>Win Rate Hero</p>
                  </div>
                  <div>
                    <img
                      src={
                        iklan.data.image_emblem
                          ? `${API_URL}/${iklan.data.image_emblem}`
                          : ``
                      }
                      alt='profile-img'
                    />
                    <p className='legend'>Emblem</p>
                  </div>
                  {
                    iklan.data.image_skin.map((skinImg, i) => (
                      <div key={`skinImg_${i}`}>
                        <img
                          src={skinImg ? `${API_URL}/${skinImg}` : ``}
                          alt='profile-img'
                        />
                        <p className='legend'>Skin {i}</p>
                      </div>
                    )) as unknown as ReactChild
                  }
                </Carousel>
                {previewCarousel && carouselImg && (
                  <Lightbox
                    mainSrc={carouselImg}
                    onCloseRequest={() => setPreviewCarousel(false)}
                  />
                )}
              </div>
              <div className='col-xl-6 col-lg-7 pb-6'>
                <div className='art-details-content wow fadeInUp px-1 md:px-6'>
                  <div className='flex items-center space-x-8'>
                    <div className='flex w-full justify-between'>
                      <div>
                        <div className='created-by mb-2'>Created by</div>
                        <div className='creator mb-30'>
                          <div className='profile-img relative'>
                            <UnstyledLink
                              href={`https://instagram.com/${iklan.data.user.ig_username}`}
                            >
                              <Image
                                src={
                                  iklan.data.user?.profile_picture
                                    ? `${API_URL}/${iklan.data.user?.profile_picture}`
                                    : `/images/pfp.jpg`
                                }
                                className='h-16 w-16 rounded-full object-cover'
                                alt='profile-img'
                                height={64}
                                width={64}
                              />
                            </UnstyledLink>
                            <div className='profile-verification verified'>
                              <i className='fas fa-check'></i>
                            </div>
                          </div>
                          <div className='creator-name-id'>
                            <h4 className='artist-name'>
                              <UnstyledLink
                                href={`https://instagram.com/${iklan.data.user.ig_username}`}
                              >
                                <a>{iklan.data.user.name}</a>
                              </UnstyledLink>
                            </h4>
                            <div className='flex items-center justify-center gap-x-1'>
                              <span>
                                <FiInstagram />
                              </span>
                              <span>
                                {iklan.data.user.username.startsWith('@')
                                  ? ''
                                  : '@' + iklan.data.user.username}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='mb-6'>
                    <div className='grid grid-cols-5 items-center justify-center md:grid-cols-1'>
                      <h1 className='col-span-3 text-3xl'>
                        {iklan.data.title}
                      </h1>
                      <div className='col-span-2 text-right text-xl font-bold text-[#1E53A3] md:hidden'>
                        {toIDRCurrency(iklan.data.harga_akun)}
                      </div>
                    </div>
                  </div>
                  <div className='#2EA0DE flex gap-x-2'>
                    <div className='rounded-3xl bg-[#EFEFEF] px-3 py-1'>
                      <p className='m-0 p-0 text-xs font-bold text-[#525358]'>
                        {iklan.data.platform}
                      </p>
                    </div>
                    <div className='rounded-3xl bg-[#D3EBF8] px-3 py-1'>
                      <p className='m-0 p-0 text-xs font-bold text-[#2EA0DE]'>
                        {iklan.data.jenis_refund}
                      </p>
                    </div>
                    <div className='flex items-center justify-center rounded-3xl bg-[rgba(52,_196,_84,_0.2)] px-2 py-1 md:gap-x-1'>
                      <span>
                        <TrophyGreen />
                      </span>
                      <p className='m-0 flex items-center justify-center gap-x-1 p-0 text-xs font-bold text-[#228F01]'>
                        Win Rate {iklan.data.win_rate}%
                      </p>
                    </div>
                  </div>
                  <div className='art-details-meta-info my-8 grid-cols-3 divide-x-2 md:grid'>
                    <div className='art-meta-item hidden md:block'>
                      <div className='text-4xl font-bold text-[#1E53A3]'>
                        {toIDRCurrency(iklan.data.harga_akun)}
                      </div>
                    </div>
                  </div>
                  <div className='art-details-information'>
                    <div className='art-information-tab-nav'>
                      <nav>
                        <div
                          className='nav-tabs grid w-full grid-cols-5'
                          id='nav-tab'
                          role='tablist'
                        >
                          <button
                            className='nav-link active !border-t-1 w-full !rounded-none !border-x-0 !border-neutral-400'
                            id='nav-bid-tab'
                            data-bs-toggle='tab'
                            data-bs-target='#tab-nav1'
                            type='button'
                            role='tab'
                            aria-selected='true'
                          >
                            <span className=''>Detail</span>
                          </button>
                          <button
                            className='nav-link !border-b-1 !border-t-1 w-full !rounded-none !border-x-0 !border-neutral-400'
                            id='nav-info-tab'
                            data-bs-toggle='tab'
                            data-bs-target='#tab-nav2'
                            type='button'
                            role='tab'
                            aria-selected='false'
                          >
                            <span className=''>Hero</span>
                          </button>
                          <button
                            className='nav-link !border-b-1 !border-t-1 w-full !rounded-none !border-x-0 !border-neutral-400'
                            id='nav-details-tab'
                            data-bs-toggle='tab'
                            data-bs-target='#tab-nav3'
                            type='button'
                            role='tab'
                            aria-selected='false'
                          >
                            <span className=''>Skin</span>
                          </button>
                          <button
                            className='nav-link !border-b-1 !border-t-1 w-full !rounded-none !border-x-0 !border-neutral-400'
                            id='nav-details-tab'
                            data-bs-toggle='tab'
                            data-bs-target='#tab-nav4'
                            type='button'
                            role='tab'
                            aria-selected='false'
                          >
                            <span className=''>Recall</span>
                          </button>
                          <button
                            className='nav-link !border-b-1 !border-t-1 w-full !rounded-none !border-x-0 !border-neutral-400'
                            id='nav-details-tab'
                            data-bs-toggle='tab'
                            data-bs-target='#tab-nav5'
                            type='button'
                            role='tab'
                            aria-selected='false'
                          >
                            <span className=''>Emblem</span>
                          </button>
                        </div>
                      </nav>
                    </div>
                    <div className='art-information-tab-contents mb-0'>
                      <div className='tab-content ' id='nav-tabContent'>
                        <div
                          className='tab-pane fade active show'
                          id='tab-nav1'
                          role='tabpanel'
                          aria-labelledby='nav-bid-tab'
                        >
                          <div className='art-user-wrapper'>
                            <div className='flex flex-wrap gap-x-10 gap-y-4 border-b border-neutral-400 pb-3'>
                              <div>
                                <h5 className='text-xs font-normal md:text-lg'>
                                  Status Akun
                                </h5>
                                <h4 className='text-sm md:text-xl'>
                                  {+iklan.data.first_hand_status === 0
                                    ? 'Pribadi'
                                    : 'Akun Beli'}
                                </h4>
                              </div>
                              <div>
                                <h5 className='text-xs font-normal md:text-lg'>
                                  Ganti Nama Akun
                                </h5>
                                <h4 className='text-sm md:text-xl'>
                                  {+iklan.data.change_name_status === 0
                                    ? 'Nonaktif'
                                    : 'Aktif'}
                                </h4>
                              </div>
                              <div>
                                <h5 className='text-xs font-normal md:text-lg'>
                                  Total Hero
                                </h5>
                                <h4 className='text-sm md:text-xl'>
                                  {iklan.data.total_hero}
                                </h4>
                              </div>
                              <div>
                                <h5 className='text-xs font-normal md:text-lg'>
                                  Total Skin
                                </h5>
                                <h4 className='text-sm md:text-xl'>
                                  {iklan.data.total_skin}
                                </h4>
                              </div>
                              <div>
                                <h5 className='text-xs font-normal md:text-lg'>
                                  Bukti Top Up Pertama
                                </h5>
                                <h4 className='text-sm md:text-xl'>
                                  {iklan.data.first_top_up_exist
                                    ? 'Ada'
                                    : 'Tidak Ada'}
                                </h4>
                              </div>
                              <div>
                                <h5 className='text-xs font-normal md:text-lg'>
                                  Binding Account
                                </h5>
                                <div className='flex gap-x-2'>
                                  {iklan.data.account_bind.length > 0
                                    ? iklan.data.account_bind.map((a) => (
                                        <span
                                          className='rounded-2xl bg-neutral-300 px-3 py-1 text-sm md:text-xl'
                                          key={a.id}
                                        >
                                          {a.name}
                                        </span>
                                      ))
                                    : '-'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className='tab-pane fade'
                          id='tab-nav2'
                          role='tabpanel'
                          aria-labelledby='nav-info-tab'
                        >
                          <div className='art-user-wrapper'>
                            <div className='flex flex-wrap gap-x-10 gap-y-4 border-b border-neutral-400 pb-3'>
                              <div>
                                <h5 className='text-xs font-normal md:text-lg'>
                                  Favorite
                                </h5>
                                <div className='flex gap-x-2'>
                                  {iklan.data.hero.length > 0
                                    ? iklan.data.hero.map((a) => (
                                        <span
                                          className='rounded-2xl bg-neutral-300 px-3 py-1'
                                          key={a.id}
                                        >
                                          {a.name}
                                        </span>
                                      ))
                                    : '-'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className='tab-pane fade'
                          id='tab-nav3'
                          role='tabpanel'
                          aria-labelledby='nav-details-tab'
                        >
                          <div className='art-user-wrapper overflow-auto'>
                            <div className='flex flex-wrap gap-x-10 gap-y-4 border-b border-neutral-400 pb-3'>
                              <div>
                                <h5 className='text-xs font-normal md:text-lg'>
                                  Skin Rare
                                </h5>
                                <div className='flex flex-wrap gap-x-3 gap-y-3'>
                                  {iklan.data.total_skin_rare.length > 0
                                    ? iklan.data.total_skin_rare.map((a, i) => (
                                        <div
                                          className='flex gap-x-1'
                                          key={`${a.jenis}-${i}`}
                                        >
                                          <span className='flex items-center justify-center gap-x-2 overflow-hidden rounded-2xl bg-neutral-300 px-3 py-1'>
                                            <span className=''>{a.jenis}</span>
                                          </span>
                                        </div>
                                      ))
                                    : '-'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className='tab-pane fade'
                          id='tab-nav4'
                          role='tabpanel'
                          aria-labelledby='nav-details-tab'
                        >
                          <div className='art-user-wrapper overflow-auto'>
                            <div className='flex flex-wrap gap-x-10 gap-y-4 border-b border-neutral-400 pb-3'>
                              <div>
                                <h5 className='text-xs font-normal md:text-lg'>
                                  Efek Recall
                                </h5>
                                <div className='flex flex-wrap gap-x-3 gap-y-3'>
                                  {iklan.data.recall_effect.length > 0
                                    ? iklan.data.recall_effect.map((a, i) => (
                                        <span
                                          className='rounded-2xl bg-neutral-300 px-3 py-1'
                                          key={`${a}-${i}`}
                                        >
                                          {a}
                                        </span>
                                      ))
                                    : '-'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className='tab-pane fade'
                          id='tab-nav5'
                          role='tabpanel'
                          aria-labelledby='nav-details-tab'
                        >
                          <div className='art-user-wrapper overflow-auto'>
                            <div className='flex flex-wrap gap-x-10 gap-y-4 border-b border-neutral-400 pb-3'>
                              <div>
                                <h5 className='text-xs font-normal md:text-lg'>
                                  Emblem
                                </h5>
                                <div className='flex flex-wrap gap-x-3 gap-y-3'>
                                  {iklan.data.emblem.length > 0
                                    ? iklan.data.emblem.map((a, i) => (
                                        <div
                                          className='flex gap-x-1'
                                          key={`${a.id}-${i}`}
                                        >
                                          <span className='flex items-center justify-center gap-x-2 overflow-hidden rounded-2xl bg-neutral-300 px-3 py-1'>
                                            <span className=''>{a.name}</span>
                                            <span className='flex h-8 w-8 items-center justify-center rounded-full bg-[#D3EBF8] text-[#2EA0DE]'>
                                              {a.level}
                                            </span>
                                          </span>
                                        </div>
                                      ))
                                    : '-'}
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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default IklanAdmin;
