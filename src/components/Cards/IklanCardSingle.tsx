import Link from 'next/link';
import React from 'react';

import { API_URL } from '@/constant/config';
import toIDRCurrency from '@/lib/toIDRCurrency';
import { IklanHome } from '@/types/iklan';

const IklanCardSingle = ({
  iklan,
  refund = '',
}: {
  iklan: IklanHome;
  refund?: string;
}) => {
  // distructure items
  const { title, user, harga_akun } = iklan;

  return (
    <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6'>
      <div className='art-item-single mb-30'>
        <div className='art-item-wraper'>
          <div className='art-item-inner'>
            <div className='art-item-img pos-rel flex h-60 items-center justify-center'>
              <Link href={`/iklan/${iklan.id}`}>
                <a>
                  <img
                    src={
                      iklan.image_profile
                        ? `${API_URL}/${iklan.image_profile}`
                        : ``
                    }
                    alt='art-img'
                    className='h-60 w-60 object-cover'
                  />
                </a>
              </Link>
            </div>
            <div className='art-item-content pos-rel'>
              <div className='artist'>
                <div className='profile-img pos-rel'>
                  <img
                    src={`https://robohash.org/${'AMOGUS'}?set=set4`}
                    alt='profile-img'
                  />
                </div>
                <div className='artist-id'>{user.name}</div>
              </div>
              <h4 className='art-name'>
                <Link href={`/iklan/${iklan.id}`}>
                  <a>{title}</a>
                </Link>
              </h4>
              <div className='art-meta-info'>
                <div className='art-meta-item'>
                  <div className='art-price'>{toIDRCurrency(harga_akun)}</div>
                </div>
                <div className='art-activity-btn'>
                  <p className='art-activity inline'>{refund}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IklanCardSingle;
