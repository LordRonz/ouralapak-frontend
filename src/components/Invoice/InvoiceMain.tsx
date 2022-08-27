import { useRouter } from 'next/router';
import queryString from 'query-string';
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Tooltip as TooltipTippy } from 'react-tippy';
import useSWR from 'swr';

import Spinner from '@/components/Common/Spinner';
import ErrorPageMain from '@/components/ErrorPage/ErrorPageMain';
import ButtonLinkGradient from '@/components/links/ButtonLinkGradient';
import { API_URL } from '@/constant/config';
import formatDateStrId from '@/lib/formatDateStrId';
import toIDRCurrency from '@/lib/toIDRCurrency';
import { Config } from '@/types/config';
import Iklan from '@/types/iklan';
import Invoice from '@/types/invoice';

const InvoiceMain = ({ no_invoice }: { no_invoice: string }) => {
  const router = useRouter();

  const { data: invoice, error } = useSWR<{
    data: Invoice;
    message: string;
    success: boolean;
  }>(`${API_URL}/user/check-invoice/${no_invoice}`);

  const { data: iklan } = useSWR<{
    data: Iklan;
    message: string;
    success: boolean;
  }>(() => `${API_URL}/user/iklan/` + invoice!.data.iklan_id);

  const { data: config } = useSWR<{
    data: Config;
    message: string;
    success: boolean;
  }>(() => `${API_URL}/master/config/4`);

  const [copyStatus, setCopyStatus] = useState<string>('Click to copy');

  const getWaLink = () =>
    queryString.stringifyUrl({
      url: `https://wa.me/${config?.data?.value}`,
      query: {
        text: `Halo admin,\n\nSaya melakukan order dengan nomor invoice ${
          invoice?.data.no_invoice
        } (${typeof window !== 'undefined' ? window.location.origin : ''}${
          router.asPath
        }))`,
      },
    });

  if (error) {
    return <ErrorPageMain />;
  }

  if (!invoice) {
    return <Spinner />;
  }

  return (
    <main>
      <section className='pb-12'>
        <div className='items-center justify-center'>
          <div className='space-y-10 overflow-auto rounded-xl border border-primary-400 bg-neutral-100 pb-8 dark:bg-neutral-800'>
            <div className='flex flex-wrap justify-between gap-y-4 p-8 md:px-16'>
              <div>
                <div className='mb-6 space-x-4'>
                  <h1 className='inline'>INVOICE</h1>
                  <p className='inline rounded-lg bg-neutral-300 py-0 px-2'>
                    Penjualan Akun
                  </p>
                </div>
                <div className='flex gap-x-4'>
                  <div>
                    <p className='mb-0'>Created</p>
                    <h3>
                      {invoice?.data.created_at &&
                        formatDateStrId(invoice?.data.created_at)}
                    </h3>
                  </div>
                  <div>
                    <p className='mb-0'>Expired</p>
                    <h3>
                      {invoice?.data.expired_at &&
                        formatDateStrId(invoice?.data.expired_at)}
                    </h3>
                  </div>
                </div>
              </div>
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
                    <h1 className='cursor-pointer rounded-lg border-gray-700 p-1 text-dark outline dark:!text-light'>
                      {invoice?.data.no_invoice ?? ''}
                    </h1>
                  </CopyToClipboard>
                </TooltipTippy>
              </div>
            </div>
            <hr className='w-full border-2 border-neutral-900 dark:border-neutral-200' />
            <div className='grid gap-x-12 gap-y-10 p-8 md:grid-cols-2 md:px-16'>
              <div className='space-y-8'>
                <div>
                  <h2 className='text-lg md:text-3xl'>Detail Pesanan</h2>
                </div>
                <div className='divide-0 grid grid-cols-1 gap-y-2 divide-y divide-neutral-400 md:grid-cols-3 md:divide-x md:divide-y-0'>
                  <div className='flex flex-col justify-center px-4'>
                    <h4 className='text-base md:text-lg'>Judul</h4>
                    <h3 className='text-dark dark:!text-light'>
                      {invoice?.data.title}
                    </h3>
                  </div>
                  <div className='flex flex-col justify-center px-4 pt-2'>
                    <h4 className='text-base md:text-lg'>Win Rate</h4>
                    <h3 className='text-dark dark:!text-light'>
                      {invoice?.data.win_rate} %
                    </h3>
                  </div>
                  <div className='flex flex-col justify-center px-4 pt-2'>
                    <h4 className='text-base md:text-lg'>Jenis Refund</h4>
                    <h3 className='text-dark dark:!text-light'>
                      {invoice?.data.jenis_refund}
                    </h3>
                  </div>
                </div>
              </div>
              <div className='space-y-8'>
                <div>
                  <h2 className='text-lg md:text-3xl'>Detail Penjual</h2>
                </div>
                <div className='flex flex-wrap justify-between gap-y-4'>
                  <div className='flex flex-col justify-center px-4'>
                    <h4 className='text-base md:text-lg'>Nama</h4>
                    <h3 className='text-dark dark:!text-light'>
                      {iklan?.data.user.name}
                    </h3>
                  </div>
                  <div className='flex flex-col justify-center px-4'>
                    <h4 className='text-base md:text-lg'>Email</h4>
                    <h3 className='text-dark dark:!text-light'>
                      {iklan?.data.user.email}
                    </h3>
                  </div>
                  <div className='flex flex-col justify-center px-4'>
                    <h4 className='text-base md:text-lg'>Telp.</h4>
                    <h3 className='text-dark dark:!text-light'>
                      {iklan?.data.user.phone}
                    </h3>
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-1 divide-y divide-neutral-400'>
                <div>
                  <h2 className='text-lg md:text-3xl'>Rincian Pembayaran</h2>
                </div>
                <div className='grid grid-cols-2 pt-3'>
                  <p className='text-lg font-extrabold text-dark dark:!text-light'>
                    Biaya Paket
                  </p>
                  <p className='text-right text-dark dark:!text-light'>
                    {toIDRCurrency(invoice?.data.biaya_penjualan)}
                  </p>
                </div>
                <div className='grid grid-cols-2 pt-3'>
                  <p className='text-lg font-extrabold text-dark dark:!text-light'>
                    {invoice.data.va || invoice.data.qris
                      ? 'Biaya Admin'
                      : 'Kode Unik'}
                  </p>
                  <p className='text-right text-dark dark:!text-light'>
                    {toIDRCurrency(
                      invoice.data.va || invoice.data.qris
                        ? invoice.data.biaya_admin
                        : invoice.data.kode_unik
                    )}
                  </p>
                </div>
                <div className='grid grid-cols-2 pt-3'>
                  <p className='text-2xl font-extrabold text-dark dark:!text-light'>
                    TOTAL
                  </p>
                  <p className='text-right text-2xl font-extrabold text-dark dark:!text-light'>
                    {toIDRCurrency(
                      +invoice.data.biaya_penjualan +
                        +(invoice.data.va || invoice.data.qris
                          ? invoice.data.biaya_admin
                          : invoice.data.kode_unik)
                    )}
                  </p>
                </div>
              </div>
              <div className='space-y-4'>
                <div>
                  <h2 className='text-lg md:text-3xl'>Metode Pembayaran</h2>
                </div>
                <div>
                  <h3 className='font-medium md:text-4xl'>
                    {invoice.data.jenis_pembayaran.name}
                  </h3>
                </div>
                <div className='rounded-xl bg-neutral-300 px-4 py-3'>
                  <div className='grid grid-cols-2'>
                    {invoice.data.va ? (
                      <div>
                        <h4 className='font-medium'>No. Virtual Account</h4>
                        <p>{invoice.data.va}</p>
                      </div>
                    ) : (
                      <>
                        <div>
                          <h5 className='font-medium'>Nama</h5>
                          <p className='m-0 text-2xl font-bold text-black'>
                            {invoice.data.jenis_pembayaran.rekening_name}
                          </p>
                        </div>
                        <div>
                          <h5 className='font-medium'>No. Rekening</h5>
                          <p className='m-0 text-2xl font-bold text-black'>
                            {invoice.data.jenis_pembayaran.rekening_number}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='text-center'>
              <h4 className='inline rounded-md  text-red-500'>
                Harap dibayar sesuai dengan nominal yang tertera pada {'"'}TOTAL
                {'"'} sebelum invoice kadaluarsa.
              </h4>
            </div>
            <div className='text-center'>
              <ButtonLinkGradient href={getWaLink()} className='text-black'>
                Konfirmasi Pembayaran
              </ButtonLinkGradient>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default InvoiceMain;
