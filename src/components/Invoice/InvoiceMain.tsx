import axios from 'axios';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Tooltip as TooltipTippy } from 'react-tippy';
import useSWR from 'swr';

import ButtonLinkGradient from '@/components/links/ButtonLinkGradient';
import { API_URL } from '@/constant/config';
import formatDateStrId from '@/lib/formatDateStrId';
import getAuthHeader from '@/lib/getAuthHeader';
import toIDRCurrency from '@/lib/toIDRCurrency';
import Iklan from '@/types/iklan';
import Invoice from '@/types/invoice';
import User from '@/types/user';

const InvoiceMain = ({ no_invoice }: { no_invoice: string }) => {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      axios
        .get(`${API_URL}/profile`, {
          headers: { Authorization: getAuthHeader() ?? '' },
        })
        .catch(() =>
          router.push(
            `/login?${queryString.stringify({
              state: 'unauthorized',
              returnTo: router.pathname,
            })}`
          )
        );
    })();
  }, [router]);

  const { data: invoice } = useSWR<{
    data: Invoice;
    message: string;
    success: boolean;
  }>(`${API_URL}/user/check-invoice/${no_invoice}`);

  const { data: iklan } = useSWR<{
    data: Iklan;
    message: string;
    success: boolean;
  }>(() => `${API_URL}/user/iklan/` + invoice!.data.iklan_id);
  console.log(iklan);
  const { data: user } = useSWR<{
    data: User;
    message: string;
    success: boolean;
  }>(() => `${API_URL}/profile`);

  const [copyStatus, setCopyStatus] = useState<string>('Click to copy');

  const getWaLink = () =>
    queryString.stringifyUrl({
      url: 'https://wa.me/6281696969696',
      query: {
        text: `Halo admin,\n\nSaya melakukan order dengan nomor invoice ${
          invoice?.data.no_invoice
        } (${typeof window !== 'undefined' ? window.location.origin : ''}/${
          router.pathname
        }))`,
      },
    });

  return (
    <main>
      <section className='login-area pt-8 pb-12'>
        <div className='container '>
          <div className='space-y-10'>
            <div className='flex justify-between'>
              <h1 className='text-lg md:text-5xl'>Invoice Penjualan Akun</h1>
              <div className='flex flex-col items-end'>
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
                    text={invoice?.data.no_invoice ?? ''}
                    onCopy={() => {
                      setCopyStatus('Copied to clipboard ✅');
                      setTimeout(() => setCopyStatus('Click to copy'), 1469);
                    }}
                  >
                    <p className='cursor-pointer rounded-lg border-2 border-gray-700 p-1 text-xs text-dark dark:!border-gray-200 dark:!text-light md:text-lg'>
                      <span className='font-extrabold'>No. Invoice: </span>
                      {invoice?.data.no_invoice ?? ''}
                    </p>
                  </CopyToClipboard>
                </TooltipTippy>
                <p className='text-xs text-dark dark:!text-light md:text-lg'>
                  <span className='font-extrabold'>Tanggal Dibuat: </span>
                  {invoice?.data.created_at &&
                    formatDateStrId(invoice?.data.created_at)}
                </p>
                <p className='text-xs text-dark dark:!text-light md:text-lg'>
                  <span className='font-extrabold'>Tanggal Kadaluarsa: </span>
                  {invoice?.data.expired_at &&
                    formatDateStrId(invoice?.data.expired_at)}
                </p>
              </div>
            </div>
            <div className='border-3 space-y-5 rounded-xl border-gray-400 bg-light p-4 dark:!bg-neutral-800'>
              <div>
                <h2 className='text-lg md:text-4xl'>Data Penjual</h2>
              </div>
              <div className='flex flex-col items-start'>
                <p className='text-xs text-dark dark:!text-light md:text-lg'>
                  <span className='font-extrabold'>Nama: </span>
                  {user?.data.name}
                </p>
                <p className='text-xs text-dark dark:!text-light md:text-lg'>
                  <span className='font-extrabold'>No. Handphone: </span>
                  {user?.data.phone}
                </p>
                <p className='text-xs text-dark dark:!text-light md:text-lg'>
                  <span className='font-extrabold'>Email: </span>
                  {user?.data.email}
                </p>
              </div>
            </div>
            <div className='space-y-8'>
              <div>
                <h2 className='text-lg md:text-4xl'>Rincian Pesanan</h2>
              </div>
              <div className='divide-0 grid grid-cols-2 divide-neutral-400 md:grid-cols-4 md:divide-x'>
                <div className='flex flex-col items-center justify-center px-4'>
                  <h3 className='text-base md:text-lg'>Judul Iklan</h3>
                  <p className='text-dark dark:!text-light'>
                    {iklan?.data.title}
                  </p>
                </div>
                <div className='flex flex-col items-center justify-center px-4'>
                  <h3 className='text-base md:text-lg'>Harga Akun</h3>
                  <p className='text-dark dark:!text-light'>
                    {toIDRCurrency(iklan?.data.harga_akun)}
                  </p>
                </div>
                <div className='flex flex-col items-center justify-center px-4'>
                  <h3 className='text-base md:text-lg'>Jenis Refund Iklan</h3>
                  <p className='text-dark dark:!text-light'>
                    {iklan?.data.jenis_refund}
                  </p>
                </div>
                <div className='flex flex-col items-center justify-center px-4'>
                  <h3 className='text-base md:text-lg'>Metode Pembayaran</h3>
                  <p className='text-dark dark:!text-light'>WA Admin</p>
                </div>
              </div>
            </div>
            <div>
              <div className='grid grid-cols-1 divide-y divide-neutral-400'>
                <div className='grid grid-cols-2 pt-3'>
                  <p className='text-lg font-extrabold text-dark dark:!text-light'>
                    Biaya Penjualan Akun
                  </p>
                  <p className='text-right text-dark dark:!text-light'>
                    {toIDRCurrency(invoice?.data.biaya_penjualan)}
                  </p>
                </div>
                <div className='grid grid-cols-2 pt-3'>
                  <p className='text-lg font-extrabold text-dark dark:!text-light'>
                    Biaya Admin
                  </p>
                  <p className='text-right text-dark dark:!text-light'>
                    {toIDRCurrency(invoice?.data.biaya_admin)}
                  </p>
                </div>
                <div className='grid grid-cols-2 pt-3'>
                  <p className='text-lg font-extrabold text-dark dark:!text-light'>
                    Fee Bank
                  </p>
                  <p className='text-right text-dark dark:!text-light'>
                    1% &times; {toIDRCurrency(invoice?.data.biaya_penjualan)} ={' '}
                    {toIDRCurrency(
                      invoice?.data.biaya_penjualan &&
                        Math.round(+invoice?.data.biaya_penjualan / 100)
                    )}
                  </p>
                </div>
                <div className='grid grid-cols-2 pt-3'>
                  <p className='text-lg font-black text-dark dark:!text-light'>
                    Total Yang Harus Dibayar
                  </p>
                  <p className='text-right text-dark dark:!text-light'>
                    {invoice?.data.biaya_penjualan !== undefined &&
                      invoice?.data.biaya_admin !== undefined &&
                      invoice?.data.biaya_penjualan !== undefined &&
                      toIDRCurrency(
                        +invoice.data.biaya_penjualan +
                          +invoice?.data.biaya_admin +
                          Math.round(+invoice?.data.biaya_penjualan / 100)
                      )}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h4 className='inline rounded-md  text-red-500'>
                HARAP DIBAYAR SESUAI DENGAN {'"'}Total Yang Harus Dibayar{'"'}{' '}
                SEBELUM INVOICE KADALUARSA
              </h4>
            </div>
            <div className='text-center'>
              <ButtonLinkGradient href={getWaLink()} className='text-black'>
                Bayar
              </ButtonLinkGradient>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default InvoiceMain;
