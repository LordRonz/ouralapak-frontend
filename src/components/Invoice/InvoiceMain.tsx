import React from 'react';

const InvoiceMain = () => {
  return (
    <main>
      <section className='login-area pt-[130px] pb-[90px]'>
        <div className='container '>
          <div className='space-y-10'>
            <div className='flex justify-between'>
              <h1 className='text-lg md:text-5xl'>Invoice Pembelian Akun</h1>
              <div className='flex flex-col items-end'>
                <p className='text-xs text-dark dark:!text-light md:text-lg'>
                  <span className='font-extrabold'>No. Invoice: </span>
                  696969
                </p>
                <p className='text-xs text-dark dark:!text-light md:text-lg'>
                  <span className='font-extrabold'>Tanggal Dibuat: </span>
                  696969
                </p>
                <p className='text-xs text-dark dark:!text-light md:text-lg'>
                  <span className='font-extrabold'>Tanggal Kadaluarsa: </span>
                  696969
                </p>
              </div>
            </div>
            <div className='border-3 space-y-5 rounded-xl border-gray-400 p-4'>
              <div>
                <h2 className='text-lg md:text-4xl'>Data Pembeli</h2>
              </div>
              <div className='flex flex-col items-start'>
                <p className='text-xs text-dark dark:!text-light md:text-lg'>
                  <span className='font-extrabold'>Nama: </span>
                  Gojo Satoru
                </p>
                <p className='text-xs text-dark dark:!text-light md:text-lg'>
                  <span className='font-extrabold'>No. Handphone: </span>
                  696969
                </p>
                <p className='text-xs text-dark dark:!text-light md:text-lg'>
                  <span className='font-extrabold'>Email: </span>
                  696969
                </p>
              </div>
            </div>
            <div className='space-y-8'>
              <div>
                <h2 className='text-lg md:text-4xl'>Rincian Pesanan</h2>
              </div>
              <div className='grid grid-cols-4 divide-x divide-neutral-400'>
                <div className='flex flex-col items-center justify-center px-4'>
                  <h3 className='text-lg'>Nama</h3>
                  <p className='text-dark dark:!text-light'>Kontol</p>
                </div>
                <div className='flex flex-col items-center justify-center px-4'>
                  <h3 className='text-lg'>Nama</h3>
                  <p className='text-dark dark:!text-light'>Kontol</p>
                </div>
                <div className='flex flex-col items-center justify-center px-4'>
                  <h3 className='text-lg'>Nama</h3>
                  <p className='text-dark dark:!text-light'>Kontol</p>
                </div>
                <div className='flex flex-col items-center justify-center px-4'>
                  <h3 className='text-lg'>Nama</h3>
                  <p className='text-dark dark:!text-light'>Kontol</p>
                </div>
              </div>
            </div>
            <div>
              <div className='grid grid-cols-1 divide-y divide-neutral-400'>
                <div className='grid grid-cols-2 pt-3'>
                  <p className='text-lg font-extrabold text-dark dark:!text-light'>
                    Biaya Penjualan Waktu
                  </p>
                  <p className='text-right text-dark dark:!text-light'>
                    25.000
                  </p>
                </div>
                <div className='grid grid-cols-2 pt-3'>
                  <p className='text-lg font-extrabold text-dark dark:!text-light'>
                    Biaya Admin
                  </p>
                  <p className='text-right text-dark dark:!text-light'>
                    25.000
                  </p>
                </div>
                <div className='grid grid-cols-2 pt-3'>
                  <p className='text-lg font-extrabold text-dark dark:!text-light'>
                    Fee Bank
                  </p>
                  <p className='text-right text-dark dark:!text-light'>
                    25.000
                  </p>
                </div>
                <div className='grid grid-cols-2 pt-3'>
                  <p className='text-lg font-black text-dark dark:!text-light'>
                    Total Yang Harus Dibayar
                  </p>
                  <p className='text-right text-dark dark:!text-light'>
                    25.000
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
          </div>
        </div>
      </section>
    </main>
  );
};

export default InvoiceMain;
