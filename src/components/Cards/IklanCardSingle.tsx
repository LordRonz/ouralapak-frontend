import Link from 'next/link';
import React from 'react';

import { API_URL } from '@/constant/config';
import clsxm from '@/lib/clsxm';
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
            <div className='art-item-img relative flex h-60 items-center justify-center'>
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
              <div
                className={clsxm(
                  'absolute top-0 left-0 flex h-full w-full items-center justify-center bg-neutral-800/40',
                  iklan.status.toLowerCase() !== 'selesai' && 'hidden'
                )}
              >
                <img src='/images/sold_out.png' alt='' />
              </div>
            </div>
            <div className='art-item-content relative'>
              <div className='artist'>
                <div className='profile-img relative'>
                  <img
                    src={
                      iklan.user.profile_picture
                        ? `${API_URL}/${iklan.user.profile_picture}`
                        : `/images/pfp.jpg`
                    }
                    className='!h-8 !w-8 rounded-full object-cover'
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
