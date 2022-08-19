import axios from 'axios';
import { useTheme } from 'next-themes';
import { stringifyUrl } from 'query-string';
import React, { useCallback, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import useSWR from 'swr';

import Button from '@/components/buttons/Button';
import IklanCardSingle from '@/components/Cards/IklanCardSingle';
import Spinner from '@/components/Common/Spinner';
import { API_URL } from '@/constant/config';
import { IklanHome } from '@/types/iklan';
import Pagination from '@/types/pagination';
import Refund from '@/types/refund';

import IklanCardLoader from '../Cards/IklanCardLoader';

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
      setIklans([...iklans, ...notSold, ...sold]);
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
    <section className='artworks-area artworks-area-bg pt-110 z-index-1 pb-40'>
      <div className='container'>
        <div className='row wow fadeInUp'>
          <div className='col-lg-4'>
            <div className='section-title1'>
              <h2 className='section-main-title1 mb-40'>Jelajahi Akun</h2>
            </div>
          </div>
          <div className='col-lg-8'>
            <form action='#' className='artwork-filter-row mb-40'>
              <div className='common-select-arrow common-select-arrow-40 white-bg'>
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
              <div className='common-select-arrow common-select-arrow-40 white-bg'>
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
            </form>
          </div>
        </div>

        <InfiniteScroll loadMore={fetchIklans} hasMore={hasMoreItems}>
          <div className='row wow fadeInUp'>
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
