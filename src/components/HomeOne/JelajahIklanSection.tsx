import { Popover, Transition } from '@headlessui/react';
import axios from 'axios';
import { useTheme } from 'next-themes';
import { stringifyUrl } from 'query-string';
import React, { Fragment, useCallback, useState } from 'react';
import { GiSettingsKnobs } from 'react-icons/gi';
import InfiniteScroll from 'react-infinite-scroller';
import useSWR from 'swr';

import Button from '@/components/buttons/Button';
import IklanCardLoader from '@/components/Cards/IklanCardLoader';
import IklanCardSingle from '@/components/Cards/IklanCardSingle';
import Spinner from '@/components/Common/Spinner';
import { API_URL } from '@/constant/config';
import { IklanHome } from '@/types/iklan';
import Pagination from '@/types/pagination';
import Refund from '@/types/refund';

const JelajahIklanSection = () => {
  const [sortBy, setSortBy] = useState('0');
  const [sortDir, setSortDir] = useState('0');

  // const { data: iklans } = useSWR<{
  //   data: { data: IklanHome[]; pagination: Pagination };
  //   message: string;
  //   success: boolean;
  // }>(
  //   stringifyUrl({
  //     url: `${API_URL}/iklan`,
  //     query: {
  //       ...(sortBy !== '0' && { orderBy: sortBy }),
  //       ...(sortDir !== '0' && { orderDir: sortDir }),
  //     },
  //   })
  // );

  const [pagination, setPagination] = useState<Pagination>();
  const [fetching, setFetching] = useState(false);
  const [paginationLock, setPaginationLock] = useState(true);

  const [iklans, setIklans] = useState<IklanHome[]>([]);

  const { theme } = useTheme();

  const fetchIklans = useCallback(async () => {
    if (fetching) {
      return;
    }

    if (pagination && +pagination.currentPage % 3 === 0 && paginationLock) {
      return;
    }

    setFetching(true);

    try {
      const {
        data: { data },
      } = await axios.get<{
        data: { data: IklanHome[]; pagination: Pagination };
        message: string;
        success: boolean;
      }>(
        stringifyUrl({
          url: `${API_URL}/iklan`,
          query: {
            perPage: 8,
            orderBy: 'created_at',
            orderDir: 'desc',
            ...(sortBy !== '0' && { orderBy: sortBy }),
            ...(sortDir !== '0' && { orderDir: sortDir }),
            ...(pagination && { page: +pagination.currentPage + 1 }),
          },
        })
      );
      const [notSold, sold] = // Use "deconstruction" style assignment
        data.data.reduce(
          (result: [IklanHome[], IklanHome[]], element) => {
            result[element.status.toLowerCase() !== 'selesai' ? 0 : 1].push(
              element
            ); // Determine and push to small/large arr
            return result;
          },
          [[], []]
        );

      const [notSoldPrev, soldPrev] = // Use "deconstruction" style assignment
        iklans.reduce(
          (result: [IklanHome[], IklanHome[]], element) => {
            result[element.status.toLowerCase() !== 'selesai' ? 0 : 1].push(
              element
            ); // Determine and push to small/large arr
            return result;
          },
          [[], []]
        );
      setIklans([...notSoldPrev, ...notSold, ...soldPrev, ...sold]);
      setPagination(data.pagination);
    } finally {
      setFetching(false);
      if (!paginationLock) setPaginationLock(true);
    }
  }, [fetching, iklans, pagination, paginationLock, sortBy, sortDir]);

  const { data: refund } = useSWR<{
    data: { data: Refund[]; pagination: Pagination };
    message: string;
    success: boolean;
  }>(
    stringifyUrl({
      url: `${API_URL}/master/refund`,
      query: {
        perPage: 200,
      },
    })
  );

  const hasMoreItems =
    !pagination || (pagination && pagination.currentPage < pagination.lastPage);

  const getRefundById = (id: string | number) => {
    if (!refund) return '';
    const res = refund.data.data.find((x) => +x.id === +id);
    return res?.name ?? '';
  };

  if (!iklans) {
    return <Spinner />;
  }

  return (
    <section
      className='artworks-area artworks-area-bg pt-110 z-index-1 pb-40'
      id='jelajah_akun'
    >
      <div className='container'>
        <div className='row wow fadeInUp items-center justify-center'>
          <div className='col-lg-4'>
            <div className='section-title1'>
              <h2 className='section-main-title1 mb-40'>Jelajahi Akun</h2>
            </div>
          </div>
          <div className='col-lg-8'>
            <div className='artwork-filter-row mb-40 !flex !w-full !flex-wrap !items-center !justify-end'>
              <Popover className='relative md:hidden'>
                {() => (
                  <>
                    <Popover.Button>
                      <div>
                        <GiSettingsKnobs />
                      </div>
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-200'
                      enterFrom='opacity-0 translate-y-1'
                      enterTo='opacity-100 translate-y-0'
                      leave='transition ease-in duration-150'
                      leaveFrom='opacity-100 translate-y-0'
                      leaveTo='opacity-0 translate-y-1'
                    >
                      <Popover.Panel className='absolute right-full z-50'>
                        <div>
                          <div className='common-select-arrow common-select-arrow-40 white-bg !w-36 rounded-xl'>
                            <select
                              name='s-t-select'
                              id='s-t-select'
                              className='sale-type-select !text-xs'
                              value={sortBy}
                              onChange={(e) => {
                                setIklans([]);
                                setPagination(undefined);
                                setSortBy(e.target.value);
                              }}
                            >
                              <option value='0'>Urutkan Dengan</option>
                              <option value='harga_akun'>Harga Akun</option>
                              <option value='win_rate'>Win Rate</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <div className='common-select-arrow common-select-arrow-40 white-bg rounded-xl'>
                            <select
                              name='cat-select'
                              id='cat-select'
                              className='category-select !text-xs'
                              value={sortDir}
                              onChange={(e) => {
                                setIklans([]);
                                setPagination(undefined);
                                setSortDir(e.target.value);
                              }}
                            >
                              <option value='0'>Urutan</option>
                              <option value='asc'>Rendah ke tinggi</option>
                              <option value='desc'>Tinggi ke rendah</option>
                            </select>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
              <div className='common-select-arrow common-select-arrow-40 white-bg !hidden !w-40 rounded-xl md:!block'>
                <select
                  name='s-t-select'
                  id='s-t-select'
                  className='sale-type-select'
                  value={sortBy}
                  onChange={(e) => {
                    setIklans([]);
                    setPagination(undefined);
                    setSortBy(e.target.value);
                  }}
                >
                  <option value='0'>Urutkan Dengan</option>
                  <option value='harga_akun'>Harga Akun</option>
                  <option value='win_rate'>Win Rate</option>
                </select>
              </div>
              <div className='common-select-arrow common-select-arrow-40 white-bg !hidden rounded-xl md:!block'>
                <select
                  name='cat-select'
                  id='cat-select'
                  className='category-select'
                  value={sortDir}
                  onChange={(e) => {
                    setIklans([]);
                    setPagination(undefined);
                    setSortDir(e.target.value);
                  }}
                >
                  <option value='0'>Urutan</option>
                  <option value='asc'>Rendah ke tinggi</option>
                  <option value='desc'>Tinggi ke rendah</option>
                </select>
              </div>
              <div className='filter-search-input header-search inline-block max-w-[50%]'>
                <input
                  className='max-h-10 placeholder:text-xs md:max-h-full md:placeholder:text-base'
                  type='text'
                  placeholder='Search keyword'
                />
                <button>
                  <i className='fal fa-search' />
                </button>
              </div>
            </div>
          </div>
        </div>

        <InfiniteScroll loadMore={fetchIklans} hasMore={hasMoreItems}>
          <div className='grid grid-cols-12 gap-y-3 gap-x-2 md:gap-y-5 md:gap-x-4'>
            {iklans.map((iklan, index) => (
              <IklanCardSingle
                iklan={iklan}
                key={`${iklan.id}${index}`}
                refund={getRefundById(iklan.jenis_refund)}
              />
            ))}
            {fetching &&
              [...Array(4)].map((i) => (
                <IklanCardLoader
                  key={i}
                  backgroundColor={theme === 'light' ? '#ddd' : '#333'}
                  foregroundColor={theme === 'light' ? '#eee' : '#444'}
                />
              ))}
          </div>
        </InfiniteScroll>
        {pagination &&
          +pagination.currentPage % 3 === 0 &&
          paginationLock &&
          pagination.currentPage < pagination.lastPage && (
            <div className='flex items-center justify-center'>
              <Button onClick={() => setPaginationLock(false)}>
                Muat lebih banyak
              </Button>
            </div>
          )}
      </div>
    </section>
  );
};

export default JelajahIklanSection;
