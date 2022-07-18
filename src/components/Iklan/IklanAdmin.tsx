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
              <div className='col-xl-6 col-lg-7'>
                <div className='art-details-content wow fadeInUp'>
                  <div className='created-by'>Created by</div>
                  <div className='creator mb-30'>
                    <div className='profile-img pos-rel'>
                      <Link href='/creators'>
                        <a>
                          <img
                            src={
                              iklan.data.user?.profile_picture
                                ? `${API_URL}/${iklan.data.user?.profile_picture}`
                                : `https://robohash.org/${
                                    iklan.data.user?.username || 'AMOGUS'
                                  }?set=set4`
                            }
                            alt='profile-img'
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
                  <div className='art-name-details'>
                    <h4 className='art-name mb-25'>{iklan.data.title}</h4>
                    <div className='space-x-4'>
                      <h5 className='inline'>First Hand Status:</h5>
                      <p className='inline'>
                        {+iklan.data.first_hand_status === 0
                          ? 'First hand'
                          : 'Second hand'}
                      </p>
                    </div>
                    <div className='space-x-4'>
                      <h5 className='inline'>Account Bind:</h5>
                      <p className='inline'>
                        {iklan.data.account_bind
                          .map((a) => a.name)
                          .join(', ') || '-'}
                      </p>
                    </div>
                    <div className='space-x-4'>
                      <h5 className='inline'>Change Name Status:</h5>
                      <p className='inline'>
                        {+iklan.data.change_name_status === 0
                          ? 'Change name non-aktif'
                          : 'Change name aktif'}
                      </p>
                    </div>
                    <div className='space-x-4'>
                      <h5 className='inline'>Status:</h5>
                      <p className='inline'>{iklan.data.status}</p>
                    </div>
                  </div>
                  <div className='artist-meta-info art-details-meta-info'>
                    <div className='art-meta-item artist-meta-item-border'>
                      <div className='art-meta-type'>Harga</div>
                      <div className='art-price'>
                        {toIDRCurrency(iklan.data.harga_akun)}
                      </div>
                    </div>
                    <div className='art-meta-item artist-meta-item-border'>
                      <div className='art-meta-type'>Win Rate</div>
                      <div className='art-sale'>
                        <span className='art-sold'>
                          {iklan.data.win_rate} %
                        </span>
                      </div>
                    </div>
                    <div className='art-meta-item'>
                      <div className='art-meta-type'>Jenis Refund</div>
                      <div className='art-sale'>
                        <span className='art-sold'>
                          {iklan.data.jenis_refund}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='row my-8'>
              <div className='grid grid-cols-3 rounded-lg border-2 border-primary-200 bg-neutral-50 py-6 dark:bg-neutral-800'>
                <div className='flex flex-col items-start justify-center'>
                  <div className='h-24 w-24 overflow-hidden rounded-lg md:h-48 md:w-48'>
                    <Image
                      src={
                        iklan.data.user?.profile_picture
                          ? `${API_URL}/${iklan.data.user?.profile_picture}`
                          : `https://robohash.org/${
                              iklan.data.user?.username || 'AMOGUS'
                            }?set=set4`
                      }
                      alt='Picture of the author'
                      width={500}
                      height={500}
                    />
                  </div>
                </div>
                <div className='flex flex-col justify-between'>
                  <h1 className='text-xl  md:text-4xl'>Penjual</h1>
                  <p className='text-sm dark:!text-light md:text-base'>
                    Nama: {iklan.data.user.name}
                  </p>
                  <p className='text-sm dark:!text-light md:text-base'>
                    No. HP: {iklan.data.user.phone}
                  </p>
                  <p className='text-sm dark:!text-light md:text-base'>
                    Email: {iklan.data.user.email}
                  </p>
                  <p className='text-sm dark:!text-light md:text-base'>
                    Instagram: @{iklan.data.user.ig_username}
                  </p>
                </div>
              </div>
            </div>
            <div className='row my-8'>
              <div className='grid grid-cols-3 rounded-lg border-2 border-primary-200 bg-neutral-50 py-6 dark:bg-neutral-800'>
                <div className='flex flex-col justify-between'>
                  <h1 className='text-xl  md:text-4xl'>Info Akun</h1>
                  <p className='text-sm dark:!text-light md:text-base'>
                    Platform: {iklan.data.platform}
                  </p>
                  <p className='text-sm dark:!text-light md:text-base'>
                    Favorite Heroes:{' '}
                    {iklan.data.hero.map((hero) => hero.name).join(', ') || '-'}
                  </p>
                  <p className='text-sm dark:!text-light md:text-base'>
                    Total hero: {iklan.data.total_hero}
                  </p>
                  <p className='text-sm dark:!text-light md:text-base'>
                    Total skin: {iklan.data.total_skin}
                  </p>
                  <p className='text-sm dark:!text-light md:text-base'>
                    Recall effect: {iklan.data.recall_effect.join(', ') || '-'}
                  </p>
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
