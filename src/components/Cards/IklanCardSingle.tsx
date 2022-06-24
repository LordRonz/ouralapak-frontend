import Link from 'next/link';
import React from 'react';

import toIDRCurrency from '@/lib/toIDRCurrency';
import { IklanHome } from '@/types/iklan';

const IklanCardSingle = ({ iklan }: { iklan: IklanHome }) => {
  // distructure items
  const { title, user, harga_akun, jenis_refund } = iklan;

  return (
    <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6'>
      <div className='art-item-single mb-30'>
        <div className='art-item-wraper'>
          <div className='art-item-inner'>
            <div className='art-item-img pos-rel'>
              <Link href={`/iklan/${iklan.id}`}>
                <a>
                  <img src='assets/img/art/sadhasdocasdc.jpg' alt='art-img' />
                </a>
              </Link>
            </div>
            <div className='art-item-content pos-rel'>
              <div className='artist'>
                <div className='profile-img pos-rel'>
                  <Link href='/creator-profile'>
                    <a>
                      <img
                        src='assets/img/profile/profile1.jpg'
                        alt='profile-img'
                      />
                    </a>
                  </Link>
                  <div className='profile-verification verified'>
                    <i className='fas fa-check'></i>
                  </div>
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
                  <Link href='/activity'>
                    <a className='art-activity'>{jenis_refund}</a>
                  </Link>
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
