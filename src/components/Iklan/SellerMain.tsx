import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import queryString, { stringifyUrl } from 'query-string';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';

import IklanCard from '@/components/Cards/IklanCard';
import Pagination from '@/components/Common/Pagination';
import ButtonLink from '@/components/links/ButtonLink';
import { API_URL } from '@/constant/config';
import formatDateStrId from '@/lib/formatDateStrId';
import getAuthHeader from '@/lib/getAuthHeader';
import { RootState } from '@/redux/store';
import type Iklan from '@/types/iklan';
import PaginationType from '@/types/pagination';
import User from '@/types/user';

// const navs = [...new Array(100)].map((_, i) => (i + 1).toString());

const SellerMain = () => {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      axios
        .get(`${API_URL}/profile`, {
          headers: { Authorization: getAuthHeader() ?? '' },
        })
        .catch(() =>
          router.push(
            `/login?${queryString.stringify({
              state: 'unauthorized',
              returnTo: router.pathname,
            })}`
          )
        );
    })();
  }, [router]);

  const [mounted, setMounted] = useState(false);

  const [curPage, setCurPage] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: iklans } = useSWR<{
    data: { data: Iklan[]; pagination: PaginationType };
    message: string;
    success: boolean;
  }>(
    mounted
      ? stringifyUrl({
          url: `${API_URL}/user/iklan`,
          query: {
            page: curPage,
          },
        })
      : null
  );

  console.log(iklans);

  const { data: user } = useSWR<{
    data: User;
    message: string;
    success: boolean;
  }>(mounted ? `${API_URL}/profile` : null);

  const creatorItem = useSelector(
    (state: RootState) => state.creators.specificItem
  );
  return (
    <main>
      <section className='page-title-area'>
        <div className='container'>
          <div className='row wow fadeInUp'>
            <div className='col-lg-12'>
              <div className='page-title'>
                <h2 className='breadcrumb-title mb-10'>{user?.data.name}</h2>
                <div className='breadcrumb-menu'>
                  <nav className='breadcrumb-trail breadcrumbs'>
                    <ul className='trail-items'>
                      <li className='trail-item trail-begin'>
                        <Link href='/'>
                          <a>Home</a>
                        </Link>
                      </li>
                      <li className='trail-item trail-end'>
                        <span>{user?.data.name}</span>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='creator-details-area pb-90 pt-0'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-3 col-lg-6 col-md-8'>
              <div className='creator-about wow fadeInUp mb-40 overflow-hidden'>
                <div className='profile-img pos-rel'>
                  <img src={creatorItem.profileImage} alt='img' />
                </div>
                <h4 className='artist-name pos-rel'>
                  {user?.data.name}
                  {!!user?.data.is_verified && (
                    <span className='profile-verification verified'>
                      <i className='fas fa-check'></i>
                    </span>
                  )}
                </h4>
                <div className='artist-id'>@{user?.data.username}</div>
                <ul>
                  <li>
                    <i className='flaticon-calendar'></i>Bergabung{' '}
                    {user &&
                      `${formatDateStrId(user?.data.created_at, 'MMMM yyyy')}`}
                  </li>
                </ul>
              </div>
            </div>
            <div className='col-xl-9'>
              <div className='creator-info-bar mb-30 wow fadeInUp'>
                <div className='artist-meta-info creator-details-meta-info'>
                  <h1 className='text-3xl'>Iklan</h1>
                </div>
                <div className='creator-details-action'>
                  <div className='artist-follow-btn'>
                    <ButtonLink href='/post-iklan'>Tambah Iklan</ButtonLink>
                  </div>
                </div>
              </div>
              <div className='creator-info-tab wow fadeInUp'>
                <div className='creator-info-tab-nav mb-30'>
                  <nav>
                    <div
                      className='nav nav-tabs flex flex-nowrap gap-x-8 overflow-auto whitespace-nowrap'
                      id='nav-tab'
                      role='tablist'
                    >
                      <button
                        className='nav-link active mb-2'
                        id='nav-created-tab'
                        data-bs-toggle='tab'
                        data-bs-target='#tab-nav1'
                        type='button'
                        role='tab'
                        aria-selected='true'
                      >
                        <span className='profile-nav-button'>
                          <span className='artist-meta-item'>
                            <span className='artist-meta-type'>Semua</span>
                          </span>
                        </span>
                      </button>
                      <button
                        className='nav-link'
                        id='nav-collection-tab'
                        data-bs-toggle='tab'
                        data-bs-target='#tab-nav2'
                        type='button'
                        role='tab'
                        aria-selected='false'
                      >
                        <span className='profile-nav-button'>
                          <span className='artist-meta-item'>
                            <span className='artist-meta-type'>
                              Dipublikasi
                            </span>
                            <span className='artist-art-collection'></span>
                          </span>
                        </span>
                      </button>
                      <button
                        className='nav-link'
                        id='nav-featured-tab'
                        data-bs-toggle='tab'
                        data-bs-target='#tab-nav3'
                        type='button'
                        role='tab'
                        aria-selected='false'
                      >
                        <span className='profile-nav-button'>
                          <span className='artist-meta-item'>
                            <span className='artist-meta-type'>Ditolak</span>
                            <span className='artist-art-featured'></span>
                          </span>
                        </span>
                      </button>
                      <button
                        className='nav-link'
                        id='nav-sold-tab'
                        data-bs-toggle='tab'
                        data-bs-target='#tab-nav4'
                        type='button'
                        role='tab'
                        aria-selected='false'
                      >
                        <span className='profile-nav-button'>
                          <span className='artist-meta-item'>
                            <span className='artist-meta-type'>Dibatalkan</span>
                            <span className='artist-art-sold'></span>
                          </span>
                        </span>
                      </button>
                      <button
                        className='nav-link'
                        id='nav-bid-tab'
                        data-bs-toggle='tab'
                        data-bs-target='#tab-nav5'
                        type='button'
                        role='tab'
                        aria-selected='false'
                      >
                        <span className='profile-nav-button'>
                          <span className='artist-meta-item'>
                            <span className='artist-meta-type'>
                              Menunggu Pembayaran Penjual
                            </span>
                            <span className='artist-art-bids'></span>
                          </span>
                        </span>
                      </button>
                      <button
                        className='nav-link'
                        id='nav-sold-tab'
                        data-bs-toggle='tab'
                        data-bs-target='#tab-nav6'
                        type='button'
                        role='tab'
                        aria-selected='false'
                      >
                        <span className='profile-nav-button'>
                          <span className='artist-meta-item'>
                            <span className='artist-meta-type'>
                              Menunggu Konfirmasi
                            </span>
                            <span className='artist-art-sold'></span>
                          </span>
                        </span>
                      </button>
                      <button
                        className='nav-link'
                        id='nav-sold-tab'
                        data-bs-toggle='tab'
                        data-bs-target='#tab-nav7'
                        type='button'
                        role='tab'
                        aria-selected='false'
                      >
                        <span className='profile-nav-button'>
                          <span className='artist-meta-item'>
                            <span className='artist-meta-type'>Selesai</span>
                            <span className='artist-art-sold'></span>
                          </span>
                        </span>
                      </button>
                      <button
                        className='nav-link'
                        id='nav-sold-tab'
                        data-bs-toggle='tab'
                        data-bs-target='#tab-nav8'
                        type='button'
                        role='tab'
                        aria-selected='false'
                      >
                        <span className='profile-nav-button'>
                          <span className='artist-meta-item'>
                            <span className='artist-meta-type'>
                              Menunggu Pembayaran Pembeli
                            </span>
                            <span className='artist-art-sold'></span>
                          </span>
                        </span>
                      </button>
                    </div>
                  </nav>
                </div>
                <div className='creator-info-tab-contents mb-30'>
                  <div className='tab-content' id='nav-tabContent'>
                    <div
                      className='tab-pane fade active show'
                      id='tab-nav1'
                      role='tabpanel'
                      aria-labelledby='nav-created-tab'
                    >
                      <div className='created-items-wrapper'>
                        <div className='row space-y-4'>
                          {iklans?.data.data.map((iklan) => (
                            <IklanCard
                              iklan={iklan}
                              key={`${iklan.id}-${iklan.user_id}`}
                            />
                          ))}
                        </div>
                        {iklans !== undefined && (
                          <div className='row mt-3'>
                            <div className='col-12'>
                              <p>
                                Menampilkan {iklans.data.pagination.perPage}{' '}
                                dari {iklans.data.pagination.total} iklan
                              </p>
                              <Pagination
                                pageCount={iklans?.data.pagination.lastPage}
                                onPageChange={({ selected }) =>
                                  setCurPage(selected)
                                }
                              />
                            </div>
                          </div>
                        )}
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

export default SellerMain;
