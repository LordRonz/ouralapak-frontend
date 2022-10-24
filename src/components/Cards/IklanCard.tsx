import Image from 'next/image';
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IoCopyOutline } from 'react-icons/io5';
import { Tooltip as TooltipTippy } from 'react-tippy';

import UnstyledLink from '@/components/links/UnstyledLink';
import { API_URL } from '@/constant/config';
import clsxm from '@/lib/clsxm';
import { StatusIklanEnum } from '@/lib/getStatusIklan';
import toIDRCurrency from '@/lib/toIDRCurrency';
import Iklan from '@/types/iklan';

const IklanCard = ({ iklan }: { iklan: Iklan & { refund_title?: string } }) => {
  const [copyStatus, setCopyStatus] = useState<string>('Click to copy');

  return (
    <>
      <div className='card-container flex flex-col gap-x-4 rounded-lg bg-[#f8f8f8] dark:bg-gray-800 md:flex-row'>
        <UnstyledLink href={`/iklan/${iklan.id}?authUser=true`}>
          <div className='flex flex-col items-start justify-center'>
            <div className='h-full w-full overflow-hidden rounded-lg md:!h-48 md:!w-48'>
              <Image
                src={
                  iklan.image_profile
                    ? `${API_URL}/${iklan.image_profile}`
                    : `/images/pfp.jpg`
                }
                alt='Picture of the author'
                width={500}
                height={500}
                quality={40}
              />
            </div>
          </div>
        </UnstyledLink>
        <div className='flex flex-col justify-between'>
          <h1 className='h-14 text-lg leading-7 md:text-3xl'>{iklan.title}</h1>
          <div className='flex flex-wrap items-center gap-x-4'>
            <p className='text-xs font-[700] text-[#1E53A3] md:text-[21px]'>
              {toIDRCurrency(iklan.harga_akun)}
            </p>
            <p
              className={clsxm(
                'whitespace-nowrap rounded-xl px-2 py-0 text-[5px] leading-[15px] md:text-base',
                iklan.status_id === StatusIklanEnum.DIHAPUS &&
                  'bg-[#2B2B2B] !bg-opacity-[0.18] text-[#2B2B2B]',
                iklan.status_id === StatusIklanEnum.MENUNGGU_PEMBAYARAN &&
                  'bg-[#A927F9] !bg-opacity-[0.18] text-[#A927F9]',
                iklan.status_id === StatusIklanEnum.MENUNGGU_KONFIRMASI &&
                  'bg-[#C8A700] !bg-opacity-[0.18] text-[#C8A700]',
                iklan.status_id === StatusIklanEnum.DIPUBLIKASI &&
                  'bg-[#7366FF] !bg-opacity-[0.18] text-[#7366FF]',
                iklan.status_id === StatusIklanEnum.DITOLAK &&
                  'bg-[#F73164] !bg-opacity-[0.18] text-[#F73164]',
                iklan.status_id === StatusIklanEnum.DIBATALKAN &&
                  'bg-[#DC3545] !bg-opacity-[0.18] text-[#DC3545]',
                iklan.status_id === StatusIklanEnum.PROSES_REKBER &&
                  'bg-[#189D55] !bg-opacity-[0.18] text-[#189D55]',
                iklan.status_id === StatusIklanEnum.SELESAI &&
                  'bg-[#51BB25] !bg-opacity-[0.18] text-[#51BB25]',
                iklan.status_id ===
                  StatusIklanEnum.MENUNGGU_PEMBAYARAN_PEMBELI &&
                  'bg-[#A927F9] !bg-opacity-[0.18] text-[#A927F9]'
              )}
            >
              Status {iklan.status}
            </p>
          </div>
          <p className='m-0 text-[10px] leading-4 dark:!text-light md:text-base'>
            Jenis refund: {iklan.refund_title ?? 'Unknown refund type'}
          </p>
          <p className='m-0 text-[10px] leading-4 dark:!text-light md:text-base'>
            Win Rate: {iklan.win_rate}%
          </p>
          <p className='m-0 text-[10px] leading-4 dark:!text-light md:text-base'>
            Change Name Status:{' '}
            {iklan.change_name_status ? 'Aktif' : 'Nonaktif'}
          </p>
          <p className='m-0 text-[10px] leading-4 dark:!text-light md:text-base'>
            <span className='flex items-center gap-x-2'>
              <span>Token: </span>
              <span className='text-[#316BC2] dark:!text-blue-300'>
                {iklan.token}
              </span>
              <TooltipTippy
                trigger='mouseenter'
                hideOnClick={false}
                interactive
                html={
                  <div className='inline-block rounded-md border bg-white p-2 text-gray-600 shadow-md dark:!border-primary-500 dark:!bg-dark dark:!text-gray-200'>
                    {copyStatus}
                  </div>
                }
              >
                <CopyToClipboard
                  text={iklan.token ?? ''}
                  onCopy={() => {
                    setCopyStatus('Copied to clipboard ✅');
                    setTimeout(() => setCopyStatus('Click to copy'), 1469);
                  }}
                >
                  <span className='cursor-pointer'>
                    <IoCopyOutline />
                  </span>
                </CopyToClipboard>
              </TooltipTippy>
            </span>
          </p>
        </div>
      </div>

      <style jsx>{`
        .card-container {
          padding: 0.25rem;
        }

        @media (min-width: 768px) {
          .card-container {
            padding: 0.75rem;
          }
        }
      `}</style>
    </>
  );
};

export default IklanCard;
