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
import Invoice, { StatusInvoice } from '@/types/invoice';
import { Roles } from '@/types/roles';
import User from '@/types/user';

const InvoiceMain = ({ no_invoice }: { no_invoice: string }) => {
  const router = useRouter();

  const { data: user } = useSWR<{
    data: User;
    message: string;
    success: boolean;
  }>(() => `${API_URL}/profile`);

  const { data: invoice, error } = useSWR<{
    data: Invoice;
    message: string;
    success: boolean;
  }>(
    `${API_URL}/${
      user?.data.role.includes(Roles.ADMIN) ||
      user?.data.role.includes(Roles.SUPERUSER)
        ? 'admin'
        : 'user'
    }/check-invoice/${no_invoice}`
  );

  const { data: iklan } = useSWR<{
    data: Iklan;
    message: string;
    success: boolean;
  }>(
    () =>
      `${API_URL}/${
        user?.data.role.includes(Roles.ADMIN) ||
        user?.data.role.includes(Roles.SUPERUSER)
          ? 'admin'
          : 'user'
      }/iklan/` + invoice!.data.iklan_id
  );

  const { data: config } = useSWR<{
    data: Config;
    message: string;
    success: boolean;
  }>(() => `${API_URL}/master/config/4`);

  const { data: qris_image } = useSWR<string>(
    invoice?.data.qris ? invoice?.data.qris : null
  );

  const [copyStatus, setCopyStatus] = useState<string>('Click to copy');

  const getWaLink = () =>
    queryString.stringifyUrl({
      url: `https://wa.me/${config?.data?.value}`,
      query: {
        text: `Halo admin ouralapak,\n\nSaya melakukan order PENJUALAN AKUN dengan nomor invoice ${
          invoice?.data.no_invoice
        } (${typeof window !== 'undefined' ? window.location.origin : ''}${
          router.asPath
        })\nMohon dicek berikut bukti pembayaran saya. Terimakasih.`,
      },
    });

  if (error) {
    return <ErrorPageMain />;
  }

  if (!invoice) {
    return <Spinner />;
  }

  console.log(invoice.data);

  return (
    <main>
      <section className='pb-12'>
        <div className='items-center justify-center'>
          <div className='mx-[0.75rem] !mt-24 overflow-auto rounded-xl border border-primary-400 bg-white pb-8 dark:!bg-neutral-800 md:!mx-16'>
            <div className='hidden flex-wrap justify-between gap-y-4 bg-[#B89C74] p-8 md:flex md:px-16'>
              <div className='mb-6 flex w-full items-center justify-between space-x-4'>
                <h1 className='m-0 text-white'>INVOICE</h1>
                <div>
                  <p className='m-0 inline rounded-3xl bg-[#D3EBF8] py-1 px-3 font-bold text-[#2EA0DE]'>
                    Penjualan Akun
                  </p>
                </div>
              </div>
              <div className='flex w-full items-center justify-between'>
                <div className='flex gap-x-4'>
                  <div>
                    <p className='mb-0 text-white'>Created</p>
                    <h3 className=' text-white'>
                      {invoice?.data.created_at &&
                        formatDateStrId(invoice?.data.created_at)}
                    </h3>
                  </div>
                  <div>
                    <p className='mb-0 text-white'>Expired</p>
                    <h3 className=' text-white'>
                      {invoice?.data.expired_at &&
                        formatDateStrId(invoice?.data.expired_at)}
                    </h3>
                  </div>
                </div>
                <div className='flex flex-col items-end justify-center'>
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
                      <>
                        <p className='mb-0 text-white'>Invoice Number</p>
                        <h1 className='cursor-pointer text-3xl text-white'>
                          {invoice?.data.no_invoice ?? ''}
                        </h1>
                      </>
                    </CopyToClipboard>
                  </TooltipTippy>
                </div>
              </div>
            </div>
            <div className='flex flex-col flex-wrap justify-center gap-y-4 bg-[#B89C74] p-3 md:hidden md:px-16'>
              <div className='mb-2 flex w-full items-center justify-center space-x-4'>
                <h1 className='m-0 text-xl text-white'>INVOICE</h1>
              </div>
              <div className='grid grid-cols-2'>
                <div>
                  <p className='mb-0 text-xs text-white'>Created</p>
                  <h3 className='text-sm text-white'>
                    {invoice?.data.created_at &&
                      formatDateStrId(invoice?.data.created_at)}
                  </h3>
                </div>
                <div>
                  <p className='mb-0 text-xs text-white'>Expired</p>
                  <h3 className='text-sm text-white'>
                    {invoice?.data.expired_at &&
                      formatDateStrId(invoice?.data.expired_at)}
                  </h3>
                </div>
              </div>
              <div className='grid grid-cols-2 items-center'>
                <div>
                  <p className='m-0 inline rounded-3xl bg-[#D3EBF8] py-1 px-3 text-sm font-bold text-[#2EA0DE]'>
                    Penjualan Akun
                  </p>
                </div>
                <div className='flex flex-col justify-center'>
                  <p className='mb-0 text-xs text-white'>Invoice Number</p>
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
                      <h1 className='m-0 cursor-pointer text-sm text-white'>
                        {invoice?.data.no_invoice ?? ''}
                      </h1>
                    </CopyToClipboard>
                  </TooltipTippy>
                </div>
              </div>
            </div>
            <hr className='mt-0 w-full border-2 border-neutral-900 dark:border-neutral-200' />
            <div className='mt-10 grid gap-x-12 gap-y-10 p-[0.75rem] md:grid-cols-2 md:px-[4rem]'>
              <div className='space-y-8'>
                <div>
                  <h2 className='text-lg md:text-3xl'>Detail Pesanan</h2>
                </div>
                <div className='grid grid-cols-2 gap-y-4 gap-x-1'>
                  <div>
                    <h3 className='text-sm font-medium text-[#85878E] dark:text-white md:text-lg'>
                      Judul Iklan
                    </h3>
                    <h3 className='whitespace-normal text-base font-normal text-dark dark:!text-light md:text-2xl'>
                      {invoice.data.title}
                    </h3>
                  </div>
                  <div>
                    <h3 className='text-sm font-medium text-[#85878E] dark:text-white md:text-lg'>
                      Jenis Refund
                    </h3>
                    <h3 className='whitespace-normal text-base font-normal text-dark dark:!text-light md:text-2xl'>
                      {invoice.data.jenis_refund}
                    </h3>
                  </div>
                  <div>
                    <h3 className='text-sm font-medium text-[#85878E] dark:text-white md:text-lg'>
                      Win Rate
                    </h3>
                    <h3 className='whitespace-normal text-base font-normal text-dark dark:!text-light md:text-2xl'>
                      {invoice.data.win_rate} %
                    </h3>
                  </div>
                  <div>
                    <h3 className='text-base font-medium text-[#85878E] dark:text-white md:text-lg'>
                      Paket Posting Iklan
                    </h3>
                    <h3 className='whitespace-normal text-base font-normal text-dark dark:!text-light md:text-2xl'>
                      {invoice.data.package}
                    </h3>
                  </div>
                </div>
              </div>
              <div className='space-y-8'>
                <div>
                  <h2 className='text-lg md:text-3xl'>Detail Penjual</h2>
                </div>
                <div className='grid grid-cols-2 gap-y-4'>
                  <div className='break-words'>
                    <h4 className='text-sm font-medium text-[#85878E] dark:text-white md:text-lg'>
                      Nama Penjual
                    </h4>
                    <h3 className='whitespace-normal text-base font-normal text-dark dark:!text-light md:text-2xl'>
                      {iklan?.data.user.name}
                    </h3>
                  </div>
                  <div className='break-words'>
                    <h4 className='text-sm font-medium text-[#85878E] dark:text-white md:text-lg'>
                      Email Penjual
                    </h4>
                    <h3 className='whitespace-normal text-base font-normal text-dark dark:!text-light md:text-2xl'>
                      {iklan?.data.user.email}
                    </h3>
                  </div>
                  <div className='break-words'>
                    <h4 className='text-sm font-medium text-[#85878E] dark:text-white md:text-lg'>
                      No. Kontak/Whatsapp
                    </h4>
                    <h3 className='whitespace-normal text-base font-normal text-dark dark:!text-light md:text-2xl'>
                      {iklan?.data.user.phone}
                    </h3>
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-1'>
                <div>
                  <h2 className='text-lg md:text-3xl'>Rincian Pembayaran</h2>
                </div>
                <div>
                  <div className='grid grid-cols-2 pt-3'>
                    <p className='text-sm font-medium text-[#85878E] dark:text-white md:text-lg'>
                      Biaya Paket
                    </p>
                    <p className='text-right text-sm font-medium text-[#85878E] dark:text-white md:text-lg'>
                      {toIDRCurrency(invoice?.data.biaya_penjualan)}
                    </p>
                  </div>
                  <div className='grid grid-cols-2 pt-3'>
                    <p className='text-sm font-medium text-[#85878E] dark:text-white md:text-lg'>
                      {invoice.data.va || invoice.data.qris
                        ? 'Biaya Admin'
                        : 'Kode Unik'}
                    </p>
                    <p className='text-right text-sm font-medium text-[#85878E] dark:text-white md:text-lg'>
                      {toIDRCurrency(
                        invoice.data.va || invoice.data.qris
                          ? invoice.data.biaya_admin
                          : invoice.data.kode_unik
                      )}
                    </p>
                  </div>
                  <div className='grid grid-cols-2 pt-3'>
                    <p className='text-lg font-bold text-dark dark:!text-light md:text-2xl'>
                      Total
                    </p>
                    <p className='text-right text-lg font-bold text-dark dark:!text-light md:text-2xl'>
                      {toIDRCurrency(
                        +invoice.data.biaya_penjualan +
                          +(invoice.data.va || invoice.data.qris
                            ? invoice.data.biaya_admin
                            : invoice.data.kode_unik)
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className='space-y-4'>
                <div className='flex items-center gap-x-3'>
                  <h2 className='m-0 text-lg md:text-3xl'>Metode Pembayaran</h2>
                  <div className=''>
                    <p className='m-0 rounded-3xl bg-[#EFEFEF] px-3'>
                      {invoice.data.va || invoice.data.qris
                        ? 'Virtual Account'
                        : 'Transfer'}
                    </p>
                  </div>
                </div>
                {invoice.data.status !== StatusInvoice.EXPIRED ? (
                  <>
                    {invoice.data.qris ? (
                      <div>
                        <h4 className='text-sm font-medium text-[#85878E] dark:text-white md:text-lg'>
                          Scan QR Code untuk pembayaran
                        </h4>
                        <div className='flex items-center gap-x-4'>
                          <img
                            src={
                              qris_image
                                ?.split('<img src="')[1]
                                .split('" style=')[0]
                            }
                            alt='qris'
                            height={169}
                            width={169}
                          />
                          <div>
                            <p className='m-0 text-2xl font-semibold'>QRIS</p>
                            <p className='m-0 text-base font-medium'>
                              NMID 169696969
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className='w-full rounded-xl bg-[#EDD9BC] px-4 py-3'>
                        {invoice.data.va ? (
                          <div className='!flex-now !wrap grid w-full grid-cols-12 whitespace-normal'>
                            <p className='col-span-4 m-0 text-sm font-medium text-black md:col-span-5 md:text-lg'>
                              Bank
                            </p>
                            <p className='col-span-1 m-0 text-sm font-medium text-black md:text-lg'>
                              :
                            </p>
                            <p className='col-span-7 m-0 text-sm font-bold text-black md:col-span-6 md:text-lg'>
                              {invoice.data.jenis_pembayaran.name}
                            </p>
                            <p className='col-span-4 m-0 text-sm font-medium text-black md:col-span-5 md:text-lg'>
                              No. Virtual Account
                            </p>
                            <p className='col-span-1 m-0 text-sm font-medium text-black md:text-lg'>
                              :
                            </p>
                            <p className='col-span-7 m-0 text-sm font-bold text-black md:col-span-6 md:text-lg'>
                              {invoice.data.va}
                            </p>
                          </div>
                        ) : (
                          <div className='!flex-now !wrap grid w-full grid-cols-12 whitespace-normal'>
                            <p className='col-span-4 m-0 text-sm font-medium text-black md:col-span-3 md:text-lg'>
                              Bank
                            </p>
                            <p className='col-span-1 m-0 text-sm font-medium text-black md:text-lg'>
                              :
                            </p>
                            <p className='col-span-7 m-0 text-sm font-bold text-black md:col-span-8 md:text-lg'>
                              {invoice.data.jenis_pembayaran.name}
                            </p>
                            <p className='col-span-4 m-0 text-sm font-medium text-black md:col-span-3 md:text-lg'>
                              No. Rekening
                            </p>
                            <p className='col-span-1 m-0 text-sm font-medium text-black md:text-lg'>
                              :
                            </p>
                            <p className='col-span-7 m-0 text-sm font-bold text-black md:col-span-8 md:text-lg'>
                              {invoice.data.jenis_pembayaran.rekening_number}
                            </p>
                            <p className='col-span-4 m-0 text-sm font-medium text-black md:col-span-3 md:text-lg'>
                              Atas Nama
                            </p>
                            <p className='col-span-1 m-0 text-sm font-medium text-black md:text-lg'>
                              :
                            </p>
                            <p className='col-span-7 m-0 text-sm font-bold text-black md:col-span-8 md:text-lg'>
                              {invoice.data.jenis_pembayaran.rekening_name}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <div className='w-full rounded-xl bg-[#8C8686] px-4 py-7 text-center'>
                    <h3 className='m-0 p-0 text-4xl'>EXPIRED</h3>
                  </div>
                )}
                <div className=''>
                  <h4 className='inline rounded-md text-sm text-red-500 md:text-lg'>
                    Harap dibayar sesuai dengan nominal yang tertera pada {'"'}
                    TOTAL
                    {'"'} sebelum invoice kadaluarsa.
                  </h4>
                </div>
              </div>
            </div>
            <div className='mt-6 text-center'>
              <p className='text-lg'>
                Harap konfirmasi pembayaran dengan klik tombol di bawah atau
                whatsapp langsung ke nomor{' '}
                {config?.data?.value.replace('62', '0')}
              </p>
              <ButtonLinkGradient href={getWaLink()} className=''>
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
