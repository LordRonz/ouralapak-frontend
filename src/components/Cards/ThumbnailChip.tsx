import React from 'react';

import { StatusIklanEnum } from '@/lib/getStatusIklan';

const ThumbnailChip = ({ status_id }: { status_id: number }) => {
  return (
    <>
      {status_id === StatusIklanEnum.PROSES_REKBER ? (
        <div className='absolute top-0 left-0 rounded-br-xl bg-[#2858FF] px-[0.5rem] py-1 text-center text-white md:px-[0.75rem]'>
          <p className='m-0 p-0 text-[0.5rem] leading-[0.75rem] md:text-xs'>
            Proses Rekber
          </p>
        </div>
      ) : status_id === StatusIklanEnum.MENUNGGU_PEMBAYARAN_PEMBELI ? (
        <div className='absolute top-0 left-0 rounded-br-xl bg-[#34C454] px-[0.5rem] py-1 text-center text-white md:px-[0.75rem]'>
          <p className='m-0 p-0 text-[0.5rem] leading-[0.75rem] md:text-xs'>
            Menunggu Pembayaran Pembeli
          </p>
        </div>
      ) : null}
    </>
  );
};

export default ThumbnailChip;
