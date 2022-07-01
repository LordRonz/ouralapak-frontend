import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';

import ButtonLink from '@/components/links/ButtonLink';
import { API_URL } from '@/constant/config';
import toIDRCurrency from '@/lib/toIDRCurrency';
import { IklanDetail } from '@/types/iklan';

const IklanMain = ({ id }: { id: number }) => {
  const { data: iklan } = useSWR<{
    data: IklanDetail;
    message: string;
    success: boolean;
  }>(`${API_URL}/iklan/${id}`);

  console.log(iklan);

  if (!iklan) {
    return <></>;
  }

  return (
    <main>
      <section className='page-title-area'>
        <div className='container'>
          <div className='row wow fadeInUp'>
            <div className='col-lg-12'>
              <div className='page-title'>
                <h2 className='breadcrumb-title mb-10'>{iklan.data.title}</h2>
                <div className='breadcrumb-menu'>
                  <nav className='breadcrumb-trail breadcrumbs'>
                    <ul className='trail-items'>
                      <li className='trail-item trail-begin'>
                        <Link href='/'>
                          <a>Home</a>
                        </Link>
                      </li>
                      <li className='trail-item trail-end'>
                        <span>{iklan.data.title}</span>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='art-details-area'>
        <div className='container'>
          <div className='art-details-wrapper'>
            <div className='row'>
              <div className='col-xl-6 col-lg-3'>
                <div className='art-item-img pos-rel art-details-img wow fadeInUp !h-96'>
                  <span>
                    <img
                      src='/assets/img/art/sadhasdocasdc.jpg'
                      alt='art-img'
                    />
                  </span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-7'>
                <div className='art-details-content wow fadeInUp'>
                  <div className='created-by'>Created by</div>
                  <div className='creator mb-30'>
                    <div className='profile-img pos-rel'>
                      <Link href='/creators'>
                        <a>
                          <img
                            src='/assets/img/profile/profile1.jpg'
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
                  <div className='mt-50 mb-50 flex items-center justify-around'>
                    <ButtonLink
                      href={`https://wa.me/${iklan.data.user.phone
                        .replace(/\+/g, '')
                        .replace(/-/g, '')
                        .replace(/\(/g, '')
                        .replace(/\)/g, '')
                        .trim()}`}
                    >
                      Hubungi Penjual
                    </ButtonLink>
                    <ButtonLink href={`/beli/${id}`}>Beli</ButtonLink>
                  </div>
                </div>
              </div>
            </div>
            <div className='row my-8'>
              <div className='grid grid-cols-3 rounded-lg border-2 border-primary-200 bg-neutral-50 py-6 dark:bg-neutral-800'>
                <div className='flex flex-col items-start justify-center'>
                  <div className='h-24 w-24 overflow-hidden rounded-lg md:h-48 md:w-48'>
                    <Image
                      src='/assets/img/profile/profile1.jpg'
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

export default IklanMain;
