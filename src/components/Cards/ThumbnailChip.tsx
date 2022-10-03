import React from 'react';

import { StatusIklanEnum } from '@/lib/getStatusIklan';

const ThumbnailChip = ({ status_id }: { status_id: number }) => {
  return (
    <>
      {status_id === StatusIklanEnum.PROSES_REKBER ? (
        <div className='absolute top-0 left-0 w-24 rounded-br-xl bg-[#2858FF] py-2 text-center text-white'>
          <p className='m-0 p-0 text-xs'>Proses Rekber</p>
        </div>
      ) : status_id === StatusIklanEnum.MENUNGGU_PEMBAYARAN_PEMBELI ? (
        <div className='absolute top-0 left-0 w-24 rounded-br-xl bg-[#34C454] py-2 text-center text-white'>
          <p className='m-0 p-0 text-xs'>Waiting List</p>
        </div>
      ) : null}
    </>
  );
};

export default ThumbnailChip;
