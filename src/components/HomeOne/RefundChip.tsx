import React from 'react';

import clsxm from '@/lib/clsxm';

const RefundChip = ({ type }: { type: string }) => {
  return (
    <div
      className={clsxm(
        'flex items-center justify-center rounded-md px-2 py-0',
        type.toLowerCase().trim().replace(' ', '') === 'norefund' &&
          'bg-[#F7E0E3]',
        type.toLowerCase().trim().replace(' ', '') === 'refundfull' &&
          'bg-[#D3EBF8]',
        type.toLowerCase().trim().replace(' ', '') === 'refundplayer' &&
          'bg-[#F9EBE0]'
      )}
    >
      <p
        className={clsxm(
          'm-0 p-0 text-xs font-bold md:text-sm',
          type.toLowerCase().trim().replace(' ', '') === 'norefund' &&
            'text-[#E8001C]',
          type.toLowerCase().trim().replace(' ', '') === 'refundfull' &&
            'text-[#2EA0DE]',
          type.toLowerCase().trim().replace(' ', '') === 'refundplayer' &&
            'text-[#F97300]'
        )}
      >
        {type.toLowerCase().trim().replace(' ', '') === 'refundfull'
          ? 'Refund Full'
          : type.toLowerCase().trim().replace(' ', '') === 'refundplayer'
          ? 'Refund Player'
          : 'No Refund'}
      </p>
    </div>
  );
};

export default RefundChip;
