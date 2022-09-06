import Image from 'next/image';
import Link from 'next/link';
import React, { ReactChild, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import { Carousel } from 'react-responsive-carousel';
import useSWR from 'swr';

import Spinner from '@/components/Common/Spinner';
import { API_URL } from '@/constant/config';
import toIDRCurrency from '@/lib/toIDRCurrency';
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
      <section className='art-details-area pb-0'>
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
                <div className='mb-6'>
                  <h1 className='mr-4 inline'>{iklan.data.title}</h1>
                  <span className='inline-block rounded-lg bg-neutral-300 py-1 px-2'>
                    {iklan.data.platform}
                  </span>
                </div>
                <div className='art-details-content wow fadeInUp'>
                  <div className='flex items-center space-x-8'>
                    <div className='flex w-full justify-between'>
                      <div>
                        <div className='created-by mb-2'>Created by</div>
                        <div className='creator mb-30'>
                          <div className='profile-img relative'>
                            <Link href='/creators'>
                              <a>
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
                              </a>
                            </Link>
                            <div className='profile-verification verified'>
                              <i className='fas fa-check'></i>
                            </div>
                          </div>
                          <div className='creator-name-id'>
                            <h4 className='artist-name'>
                              <Link href='/creators'>
                                <a>{iklan.data.user.name}</a>
                              </Link>
                            </h4>
                            <div className='artist-id'>
                              {iklan.data.user.username}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='art-details-meta-info my-8 grid grid-cols-3 divide-x-2'>
                    <div className='art-meta-item'>
                      <div className='art-meta-type'>Harga</div>
                      <div className='art-sale'>
                        {toIDRCurrency(iklan.data.harga_akun)}
                      </div>
                    </div>
                  </div>
                  <div className='art-details-meta-info my-8 grid grid-cols-2 divide-x-2'>
                    <div className='art-meta-item'>
                      <div className='art-meta-type'>Win Rate</div>
                      <div className='art-sale'>{iklan.data.win_rate} %</div>
                    </div>
                    <div className='art-meta-item pl-3'>
                      <div className='art-meta-type'>Jenis Refund</div>
                      <div className='art-sale'>{iklan.data.jenis_refund}</div>
                    </div>
                  </div>
                  <div className='art-details-information'>
                    <div className='art-information-tab-nav mb-20'>
                      <nav>
                        <div
                          className='nav nav-tabs flex justify-between'
                          id='nav-tab'
                          role='tablist'
                        >
                          <button
                            className='nav-link active'
                            id='nav-bid-tab'
                            data-bs-toggle='tab'
                            data-bs-target='#tab-nav1'
                            type='button'
                            role='tab'
                            aria-selected='true'
                          >
                            <span className='profile-nav-button'>Detail</span>
                          </button>
                          <button
                            className='nav-link'
                            id='nav-info-tab'
                            data-bs-toggle='tab'
                            data-bs-target='#tab-nav2'
                            type='button'
                            role='tab'
                            aria-selected='false'
                          >
                            <span className='profile-nav-button'>Hero</span>
                          </button>
                          <button
                            className='nav-link'
                            id='nav-details-tab'
                            data-bs-toggle='tab'
                            data-bs-target='#tab-nav3'
                            type='button'
                            role='tab'
                            aria-selected='false'
                          >
                            <span className='profile-nav-button'>Skin</span>
                          </button>
                          <button
                            className='nav-link'
                            id='nav-details-tab'
                            data-bs-toggle='tab'
                            data-bs-target='#tab-nav4'
                            type='button'
                            role='tab'
                            aria-selected='false'
                          >
                            <span className='profile-nav-button'>Recall</span>
                          </button>
                          <button
                            className='nav-link'
                            id='nav-details-tab'
                            data-bs-toggle='tab'
                            data-bs-target='#tab-nav5'
                            type='button'
                            role='tab'
                            aria-selected='false'
                          >
                            <span className='profile-nav-button'>Emblem</span>
                          </button>
                        </div>
                      </nav>
                    </div>
                    <div className='art-information-tab-contents mb-0'>
                      <div className='tab-content' id='nav-tabContent'>
                        <div
                          className='tab-pane fade active show'
                          id='tab-nav1'
                          role='tabpanel'
                          aria-labelledby='nav-bid-tab'
                        >
                          <div className='art-user-wrapper'>
                            <div className='flex flex-wrap gap-x-10 gap-y-4'>
                              <div>
                                <h5>Status Akun</h5>
                                <h4>
                                  {+iklan.data.first_hand_status === 0
                                    ? 'Pribadi'
                                    : 'Akun Beli'}
                                </h4>
                              </div>
                              <div>
                                <h5>Ganti Nama Akun</h5>
                                <h4>
                                  {+iklan.data.change_name_status === 0
                                    ? 'Nonaktif'
                                    : 'Aktif'}
                                </h4>
                              </div>
                              <div>
                                <h5>Total Hero</h5>
                                <h4>{iklan.data.total_hero}</h4>
                              </div>
                              <div>
                                <h5>Total Skin</h5>
                                <h4>{iklan.data.total_skin}</h4>
                              </div>
                              <div>
                                <h5>Binding Account</h5>
                                <div className='flex gap-x-2'>
                                  {iklan.data.account_bind.length > 0
                                    ? iklan.data.account_bind.map((a) => (
                                        <span
                                          className='rounded bg-neutral-300 px-3 py-1'
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
                            <div className='flex flex-wrap gap-x-10 gap-y-4'>
                              <div>
                                <h5>Favorite</h5>
                                <div className='flex gap-x-2'>
                                  {iklan.data.hero.length > 0
                                    ? iklan.data.hero.map((a) => (
                                        <span
                                          className='rounded bg-neutral-300 px-3 py-1'
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
                            <div className='flex flex-wrap gap-x-10 gap-y-4'>
                              <div>
                                <h5>Skin Rare</h5>
                                <div className='flex flex-wrap gap-x-3 gap-y-3'>
                                  {iklan.data.total_skin_rare.length > 0
                                    ? iklan.data.total_skin_rare.map((a, i) => (
                                        <div
                                          className='flex gap-x-1'
                                          key={`${a.jenis}-${i}`}
                                        >
                                          <span className='rounded bg-neutral-300 px-3 py-1'>
                                            {a.jenis}
                                          </span>
                                          <span className='rounded bg-neutral-300 px-1 py-1'>
                                            {a.total_skin}
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
                            <div className='flex flex-wrap gap-x-10 gap-y-4'>
                              <div>
                                <h5>Efek Recall</h5>
                                <div className='flex flex-wrap gap-x-3 gap-y-3'>
                                  {iklan.data.recall_effect.length > 0
                                    ? iklan.data.recall_effect.map((a, i) => (
                                        <span
                                          className='rounded bg-neutral-300 px-3 py-1'
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
                            <div className='flex flex-wrap gap-x-10 gap-y-4'>
                              <div>
                                <h5>Emblem</h5>
                                <div className='flex flex-wrap gap-x-3 gap-y-3'>
                                  {iklan.data.emblem.length > 0
                                    ? iklan.data.emblem.map((a, i) => (
                                        <div
                                          className='flex gap-x-1'
                                          key={`${a.id}-${i}`}
                                        >
                                          <span className='rounded bg-neutral-300 px-3 py-1'>
                                            {a.name}
                                          </span>
                                          <span className='rounded bg-neutral-300 px-1 py-1'>
                                            {a.level}
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
