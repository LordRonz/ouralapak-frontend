import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import queryString, { stringifyUrl } from 'query-string';
import React, { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useSWR from 'swr';

import IklanCard from '@/components/Cards/IklanCard';
import Pagination from '@/components/Common/Pagination';
import ButtonLink from '@/components/links/ButtonLink';
import ProfileCard from '@/components/Profile/ProfileCard';
import { API_URL } from '@/constant/config';
import { mySwalOpts } from '@/constant/swal';
import getAuthHeader from '@/lib/getAuthHeader';
import { StatusIklanEnum } from '@/lib/getStatusIklan';
import type Iklan from '@/types/iklan';
import PaginationType from '@/types/pagination';
import User from '@/types/user';

// const navs = [...new Array(100)].map((_, i) => (i + 1).toString());

const MySwal = withReactContent(Swal);

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

  const [curStatus, setCurStatus] = useState(-1);

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
            page: curPage + 1,
            status: curStatus === -1 ? undefined : curStatus,
          },
        })
      : null
  );

  const { data: user } = useSWR<{
    data: User;
    message: string;
    success: boolean;
  }>(mounted ? `${API_URL}/profile` : null);

  const { theme } = useTheme();
  const [, , removeToken] = useLocalStorage('token');

  const handleLogout = async () => {
    const { isConfirmed } = await MySwal.fire({
      title: 'Yakin ingin logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      ...mySwalOpts(theme),
    });
    if (isConfirmed) {
      removeToken();
      router.push('/login');
    }
  };
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
            <ProfileCard user={user?.data} handleLogout={handleLogout} />
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
                        onClick={() => setCurStatus(-1)}
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
                        onClick={() =>
                          setCurStatus(StatusIklanEnum.DIPUBLIKASI)
                        }
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
                        onClick={() => setCurStatus(StatusIklanEnum.DITOLAK)}
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
                        onClick={() => setCurStatus(StatusIklanEnum.DIBATALKAN)}
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
                        onClick={() =>
                          setCurStatus(StatusIklanEnum.MENUNGGU_PEMBAYARAN)
                        }
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
                        onClick={() =>
                          setCurStatus(StatusIklanEnum.MENUNGGU_KONFIRMASI)
                        }
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
                        onClick={() => setCurStatus(StatusIklanEnum.SELESAI)}
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
                        onClick={() =>
                          setCurStatus(
                            StatusIklanEnum.MENUNGGU_PEMBAYARAN_PEMBELI
                          )
                        }
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
                        <div className='row mt-3'>
                          <div className='col-12'>
                            <p>
                              Menampilkan {iklans?.data.data.length ?? 0} dari{' '}
                              {iklans?.data.pagination.total ?? 0} iklan
                            </p>
                            <Pagination
                              pageCount={iklans?.data.pagination.lastPage ?? 1}
                              onPageChange={({ selected }) =>
                                setCurPage(selected)
                              }
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
      </section>
    </main>
  );
};

export default SellerMain;
