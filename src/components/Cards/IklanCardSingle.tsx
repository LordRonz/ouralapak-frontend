import Link from 'next/link';
import React from 'react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

import RefundChip from '@/components/HomeOne/RefundChip';
import { API_URL } from '@/constant/config';
import clsxm from '@/lib/clsxm';
import toIDRCurrency from '@/lib/toIDRCurrency';
import Capote from '@/svgs/capote.svg';
import Superhero from '@/svgs/superhero.svg';
import Trophy from '@/svgs/trophy.svg';
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
    <div className='col-span-6 drop-shadow-md transition-[filter] hover:drop-shadow-xl md:col-span-3'>
      <Link href={`/iklan/${iklan.id}`}>
        <a>
          <div className='art-item-single'>
            <div className='rounded-xl bg-white p-[0.7rem] dark:!bg-gray-800'>
              <div className='art-item-inner'>
                <div className='art-item-img h-30 relative flex items-center justify-center md:h-60'>
                  <Link href={`/iklan/${iklan.id}`}>
                    <a>
                      <img
                        src={
                          iklan.image_profile
                            ? `${API_URL}/${iklan.image_profile}`
                            : ``
                        }
                        alt='art-img'
                        className='w-30 h-30 object-cover md:h-60 md:w-60'
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
                <div className='relative py-3'>
                  <div className='mb-3 flex w-full items-center justify-between'>
                    <div className='artist overflow-hidden text-ellipsis whitespace-nowrap'>
                      <div className='profile-img relative'>
                        <img
                          src={
                            iklan.user.profile_picture
                              ? `${API_URL}/${iklan.user.profile_picture}`
                              : `/images/pfp.jpg`
                          }
                          className='!h-4 !w-4 rounded-full object-cover md:!h-8 md:!w-8'
                          alt='profile-img'
                        />
                      </div>
                      <div className='artist-id !text-[0.6rem] md:!text-sm'>
                        {user.name}
                      </div>
                    </div>
                    <div className='flex h-full items-center justify-center gap-x-1'>
                      <p className='m-0 overflow-hidden text-ellipsis whitespace-nowrap p-0 text-[0.5rem] md:text-[0.6rem]'>
                        Change Name
                      </p>
                      {iklan.change_name_status ? (
                        <FiCheckCircle className='text-xs text-green-500 md:text-base' />
                      ) : (
                        <FiXCircle className='text-xs text-red-500 md:text-base' />
                      )}
                    </div>
                  </div>
                  <h4 className='art-name overflow-hidden overflow-ellipsis whitespace-nowrap !text-base md:!text-2xl'>
                    <Link href={`/iklan/${iklan.id}`}>
                      <a>{title}</a>
                    </Link>
                  </h4>
                  <div className='art-meta-info mb-3 !items-center'>
                    <div className='art-meta-item w-1/2'>
                      <h4 className='art-price m-0 overflow-hidden overflow-ellipsis whitespace-nowrap !text-sm md:!text-lg'>
                        {toIDRCurrency(harga_akun)}
                      </h4>
                    </div>
                    <div className='art-activity-btn whitespace-nowrap'>
                      <RefundChip type={refund} />
                    </div>
                  </div>
                  <div className='grid w-full grid-cols-3'>
                    <div className='flex items-center justify-center gap-x-1 text-center'>
                      <Superhero />
                      <p className='m-0 p-0 text-[0.5rem] md:text-xs'>
                        Hero {iklan.total_hero > 99 ? '99+' : iklan.total_hero}
                      </p>
                    </div>
                    <div className='flex items-center justify-center gap-x-1 text-center'>
                      <Capote />
                      <p className='m-0 p-0 text-[0.5rem] md:text-xs'>
                        Skin {iklan.total_skin > 99 ? '99+' : iklan.total_skin}
                      </p>
                    </div>
                    <div className='flex items-center justify-center gap-x-1 text-center'>
                      <Trophy />
                      <p className='m-0 p-0 text-[0.5rem] md:text-xs'>
                        WR {iklan.win_rate}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default IklanCardSingle;
