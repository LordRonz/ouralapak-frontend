import Image from 'next/image';
import React from 'react';

import toIDRCurrency from '@/lib/toIDRCurrency';
import Iklan from '@/types/iklan';

const IklanCard = ({ iklan }: { iklan: Iklan }) => {
  return (
    <div className='grid grid-cols-3 rounded-lg border-2 border-primary-200 bg-neutral-50 py-6 dark:bg-neutral-800'>
      <div className='flex flex-col items-start justify-center'>
        <div className='h-24 w-24 overflow-hidden rounded-lg md:h-48 md:w-48'>
          <Image
            src='/assets/img/profile/profile1.jpg'
            alt='Picture of the author'
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className='flex flex-col justify-between'>
        <h1 className='text-xl  md:text-4xl'>{iklan.title}</h1>
        <p className='text-sm dark:!text-light md:text-base'>
          Jenis refund: {iklan.jenis_refund}
        </p>
        <p className='text-sm dark:!text-light md:text-base'>
          Win Rate: {iklan.win_rate}%
        </p>
        <p className='text-sm dark:!text-light md:text-base'>
          Change Name Status: {iklan.change_name_status ? 'Aktif' : 'Nonaktif'}
        </p>
      </div>
      <div className='flex flex-col items-end justify-between'>
        <h2 className='text-lg  dark:!text-light md:text-2xl'>
          Status: {iklan.status}
        </h2>
        <p className='dark:!text-light'>
          Harga: {toIDRCurrency(iklan.harga_akun)}
        </p>
      </div>
    </div>
  );
};

export default IklanCard;
