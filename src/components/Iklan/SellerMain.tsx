import axios from 'axios';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import queryString, { stringifyUrl } from 'query-string';
import React, { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useSWR from 'swr';

import IklanCard from '@/components/Cards/IklanCard';
import Breadcrumbs from '@/components/Common/PageTitle';
import Pagination from '@/components/Common/Pagination';
import Spinner from '@/components/Common/Spinner';
import ButtonLink from '@/components/links/ButtonLink';
import ProfileCard from '@/components/Profile/ProfileCard';
import ProfileCardMobile from '@/components/Profile/ProfileCardMobile';
import { API_URL } from '@/constant/config';
import { mySwalOpts } from '@/constant/swal';
import getAuthHeader from '@/lib/getAuthHeader';
import { StatusIklanEnum } from '@/lib/getStatusIklan';
import type Iklan from '@/types/iklan';
import PaginationType from '@/types/pagination';
import Refund from '@/types/refund';
import User from '@/types/user';

const MySwal = withReactContent(Swal);

const SellerMain = () => {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  const [curPage, setCurPage] = useState(0);

  const [curStatus, setCurStatus] = useState(-1);

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    (async () => {
      axios
        .get(`${API_URL}/profile`, {
          headers: { Authorization: getAuthHeader() ?? '' },
        })
        .then(() => setAuthorized(true))
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

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: refund } = useSWR<{
    data: { data: Refund[]; pagination: PaginationType };
    message: string;
    success: boolean;
  }>(`${API_URL}/master/refund?perPage=200`);

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

  useEffect(() => {
    setCurPage(0);
  }, [curStatus]);

  console.log(iklans);

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

  if (!authorized || !user) {
    return <Spinner />;
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbTitle='Informasi Profil'
        breadcrumbSubTitle='Informasi Profil'
      />
      <div className='creator-cover-img pos-rel'>
        <img src='images/banner_cover.png' alt='cover-img' />
      </div>
      <section className='creator-info-area pt-40'>
        <div className='px-4 md:px-16'>
          <div className='row'>
            <div className='col-lg-4 flex justify-center'>
              <ProfileCard
                user={user?.data}
                handleLogout={handleLogout}
                withEdit={false}
              />
            </div>
            <div className='col-lg-8 relative'>
              <ProfileCardMobile
                user={user?.data}
                handleLogout={handleLogout}
                withEdit={false}
              />
              <div className='absolute top-[-120px] hidden flex-col md:flex'>
                <div className='flex'>
                  <h4 className='artist-name relative text-2xl text-white'>
                    {user?.data.name}
                    {!!user?.data.is_verified && (
                      <span className='profile-verification verified !right-[-30px]'>
                        <i className='fas fa-check' />
                      </span>
                    )}
                  </h4>
                </div>
                <div className='artist-id text-white'>
                  @{user?.data.username}
                </div>
              </div>
              <div className='creator-info-personal wow fadeInUp relative top-[-150px] mb-40 rounded-xl bg-white px-6 py-8 dark:!bg-[#1c2434] md:static'>
                <div className='creator-info-bar wow fadeInUp mb-4 flex-nowrap'>
                  <div className='artist-meta-info creator-details-meta-info'>
                    <h1 className='mb-4 text-3xl text-[#B89C74]'>Iklan</h1>
                  </div>
                  <div className='creator-details-action'>
                    <div className='artist-follow-btn'>
                      <ButtonLink
                        href='/post-iklan'
                        className='whitespace-nowrap rounded-lg px-2'
                      >
                        Tambah Iklan
                      </ButtonLink>
                    </div>
                  </div>
                </div>
                <div className='creator-info-tab wow fadeInUp'>
                  <div className='creator-info-tab-nav mb-30'>
                    <nav>
                      <div
                        className='nav nav-tabs flex flex-nowrap overflow-auto whitespace-nowrap bg-[#F8F8F8] py-2 px-2 dark:bg-gray-700'
                        id='nav-tab'
                        role='tablist'
                      >
                        <button
                          className='nav-link active !rounded-lg px-8'
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
                          className='nav-link !rounded-lg'
                          id='nav-collection-tab'
                          data-bs-toggle='tab'
                          data-bs-target='#tab-nav1'
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
                          className='nav-link !rounded-lg'
                          id='nav-featured-tab'
                          data-bs-toggle='tab'
                          data-bs-target='#tab-nav1'
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
                          className='nav-link !rounded-lg'
                          id='nav-sold-tab'
                          data-bs-toggle='tab'
                          data-bs-target='#tab-nav1'
                          type='button'
                          role='tab'
                          aria-selected='false'
                          onClick={() =>
                            setCurStatus(StatusIklanEnum.DIBATALKAN)
                          }
                        >
                          <span className='profile-nav-button'>
                            <span className='artist-meta-item'>
                              <span className='artist-meta-type'>
                                Dibatalkan
                              </span>
                              <span className='artist-art-sold'></span>
                            </span>
                          </span>
                        </button>
                        <button
                          className='nav-link !rounded-lg'
                          id='nav-bid-tab'
                          data-bs-toggle='tab'
                          data-bs-target='#tab-nav1'
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
                          className='nav-link !rounded-lg'
                          id='nav-sold-tab'
                          data-bs-toggle='tab'
                          data-bs-target='#tab-nav1'
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
                          className='nav-link !rounded-lg'
                          id='nav-sold-tab'
                          data-bs-toggle='tab'
                          data-bs-target='#tab-nav1'
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
                          className='nav-link !rounded-lg'
                          id='nav-sold-tab'
                          data-bs-toggle='tab'
                          data-bs-target='#tab-nav1'
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
                  <div className='creator-info-tab-contents'>
                    <div className='tab-content'>
                      <div
                        className='tab-pane fade active show'
                        id='tab-nav1'
                        role='tabpanel'
                        aria-labelledby='nav-created-tab'
                      >
                        <div className='created-items-wrapper'>
                          <div className='grid grid-cols-2 gap-y-4 md:grid-cols-1'>
                            {iklans?.data.data.map((iklan) => (
                              <IklanCard
                                iklan={{
                                  ...iklan,
                                  refund_title: refund?.data.data.find(
                                    (v) => v.id === iklan.jenis_refund
                                  )?.name,
                                }}
                                key={`${iklan.id}-${iklan.user_id}`}
                              />
                            ))}
                          </div>
                          <div className='row mt-3'>
                            <div className='col-12 flex flex-col items-center justify-center'>
                              <p>
                                Menampilkan {iklans?.data.data.length ?? 0} dari{' '}
                                {iklans?.data.pagination.total ?? 0} iklan
                              </p>
                              <Pagination
                                containerClassName='mb-0 mt-0'
                                pageCount={
                                  iklans?.data.pagination.lastPage ?? 1
                                }
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
        </div>
      </section>
    </main>
  );
};

export default SellerMain;
