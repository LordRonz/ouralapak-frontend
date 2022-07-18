import { stringifyUrl } from 'query-string';
import React, { useState } from 'react';
import useSWR from 'swr';

import IklanCardSingle from '@/components/Cards/IklanCardSingle';
import Spinner from '@/components/Common/Spinner';
import { API_URL } from '@/constant/config';
import { IklanHome } from '@/types/iklan';
import Pagination from '@/types/pagination';
import Refund from '@/types/refund';

const JelajahIklanSection = () => {
  const [sortBy, setSortBy] = useState('0');
  const [sortDir, setSortDir] = useState('0');

  const { data: iklans } = useSWR<{
    data: { data: IklanHome[]; pagination: Pagination };
    message: string;
    success: boolean;
  }>(
    stringifyUrl({
      url: `${API_URL}/iklan`,
      query: {
        orderBy: sortBy === '0' ? undefined : sortBy,
        orderDir: sortDir === '0' ? undefined : sortDir,
      },
    })
  );

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

  const getRefundById = (id: string | number) => {
    if (!refund) return '';
    const res = refund.data.data.find((x) => +x.id === +id);
    return res?.name ?? '';
  };

  if (!iklans) {
    return <Spinner />;
  }

  return (
    <section className='artworks-area artworks-area-bg pt-110 pb-100 z-index-1'>
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
                  onChange={(e) => setSortBy(e.target.value)}
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
                  onChange={(e) => setSortDir(e.target.value)}
                >
                  <option value='0'>Urutan</option>
                  <option value='ASC'>Rendah ke tinggi</option>
                  <option value='DESC'>Tinggi ke rendah</option>
                </select>
              </div>
            </form>
          </div>
        </div>
        <div className='row wow fadeInUp'>
          {iklans.data.data.map((iklan, index) => (
            <IklanCardSingle
              iklan={iklan}
              key={`${iklan.id}${index}`}
              refund={getRefundById(iklan.jenis_refund)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JelajahIklanSection;
