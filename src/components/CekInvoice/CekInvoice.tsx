import { useRouter } from 'next/router';
import { stringifyUrl } from 'query-string';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import ButtonGradient from '@/components/buttons/ButtonGradient';
import ParticleComponent from '@/components/Common/ParticleComponent';
import { API_URL } from '@/constant/config';
import customAxios from '@/lib/customAxios';
import toastPromiseError from '@/lib/toastPromiseError';
import { JenisInvoice } from '@/types/invoice';

type IFormInput = {
  no_invoice: string;
};

const CekInvoice = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);

  const router = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await toast.promise(
        customAxios.get(
          stringifyUrl({
            url: `${API_URL}/check-invoice/${data.no_invoice}`,
          })
        ),
        {
          pending: {
            render: () => {
              setSubmitBtnDisabled(true);
              return 'Loading';
            },
          },
          success: {
            render: (res) => {
              setSubmitBtnDisabled(false);
              router.push(
                `/invoice${
                  res.data?.data.data.jenis_invoice === JenisInvoice.PEMBELI
                    ? '-beli'
                    : ''
                }/${res.data?.data.data.no_invoice}`
              );
              return 'Invoice ditemukan';
            },
          },
          error: {
            render: toastPromiseError(() => {
              setSubmitBtnDisabled(false);
            }, 'Invoice Tidak Ditemukan!'),
          },
        }
      );
    } finally {
      setSubmitBtnDisabled(false);
    }
  };

  return (
    <main>
      <section className='login-area relative pb-10 pt-80'>
        <ParticleComponent />
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-xxl-6 col-xl-7 col-lg-8'>
              <div className='login-wrapper wow fadeInUp relative mb-40 !bg-white dark:!bg-neutral-800'>
                <div className=' login-inner'>
                  <div className='login-content'>
                    <h4>Cek Invoice</h4>
                    <form
                      className='login-form'
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className='row gap-y-6'>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='no_invoice'>Nomor Invoice</label>
                            <input
                              type='text'
                              placeholder='Masukkan nomor invoice Anda'
                              {...register('no_invoice', {
                                required: 'Nomor Invoice harus diisi',
                              })}
                              className='border'
                            />
                          </div>
                          <p className='text-red-500'>
                            {errors.no_invoice?.message}
                          </p>
                        </div>
                      </div>
                      <div className='login-btn mt-4'>
                        <ButtonGradient
                          className='text-white'
                          type='submit'
                          disabled={submitBtnDisabled}
                        >
                          Cek Invoice
                        </ButtonGradient>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CekInvoice;
