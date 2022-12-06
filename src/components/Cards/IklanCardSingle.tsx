import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

import ThumbnailChip from '@/components/Cards/ThumbnailChip';
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
                <div className='art-item-img h-30 w-30 relative flex items-center justify-center md:h-60 md:w-60'>
                  <Link href={`/iklan/${iklan.id}`}>
                    <a>
                      <Image
                        src={
                          iklan.image_profile
                            ? `${API_URL}/${iklan.image_profile}`
                            : ``
                        }
                        alt='art-img'
                        className='w-30 h-30 object-cover md:h-60 md:w-60'
                        quality={10}
                        placeholder='blur'
                        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMUqQcAAK0AlWMXHzkAAAAASUVORK5CYII='
                        width={240}
                        height={240}
                      />
                      <ThumbnailChip status_id={iklan.status_id} />
                    </a>
                  </Link>
                  <div
                    className={clsxm(
                      'absolute top-0 left-0 flex h-full w-full items-center justify-center bg-neutral-800/90 text-xl font-bold text-white',
                      iklan.status.toLowerCase() !== 'selesai' && 'hidden'
                    )}
                  >
                    Sold Out
                  </div>
                </div>
                <div className='relative py-3'>
                  <div className='mb-3 flex w-full items-center justify-between'>
                    <div className='artist overflow-hidden text-ellipsis whitespace-nowrap'>
                      <div className='profile-img relative !h-4 !w-4 rounded-full object-cover md:!h-8 md:!w-8'>
                        <Image
                          src={
                            iklan.user.profile_picture
                              ? `${API_URL}/${iklan.user.profile_picture}`
                              : `/images/pfp.jpg`
                          }
                          className='!h-4 !w-4 rounded-full object-cover md:!h-8 md:!w-8'
                          alt='profile-img'
                          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMUqQcAAK0AlWMXHzkAAAAASUVORK5CYII='
                          width={32}
                          height={32}
                          layout='responsive'
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
                  <div className='h-[3.5rem]'>
                    <h4 className='art-name overflow-hidden overflow-ellipsis !text-base md:!text-xl'>
                      <Link href={`/iklan/${iklan.id}`}>
                        <a>{title}</a>
                      </Link>
                    </h4>
                  </div>
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
                    <div className='flex items-center justify-center gap-x-1 whitespace-nowrap text-center'>
                      <div>
                        <Superhero />
                      </div>
                      <p className='m-0 p-0 text-[0.5rem] md:text-xs'>
                        Hero{' '}
                        {iklan.total_hero > 999 ? '999+' : iklan.total_hero}
                      </p>
                    </div>
                    <div className='flex items-center justify-center gap-x-1 whitespace-nowrap text-center'>
                      <div>
                        <Capote />
                      </div>
                      <p className='m-0 p-0 text-[0.5rem] md:text-xs'>
                        Skin{' '}
                        {iklan.total_skin > 999 ? '999+' : iklan.total_skin}
                      </p>
                    </div>
                    <div className='flex items-center justify-center gap-x-1 whitespace-nowrap text-center'>
                      <div>
                        <Trophy />
                      </div>
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
