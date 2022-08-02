import axios from 'axios';
import { useRouter } from 'next/router';
import { stringifyUrl } from 'query-string';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import PhoneInput, {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from 'react-phone-number-input';
import Select from 'react-select';
import { toast } from 'react-toastify';
import useSWR from 'swr';

import ButtonGradient from '@/components/buttons/ButtonGradient';
import Captcha from '@/components/Common/Captcha';
import Breadcrumbs from '@/components/Common/PageTitle';
import Spinner from '@/components/Common/Spinner';
import { API_URL } from '@/constant/config';
import clsxm from '@/lib/clsxm';
import Bank from '@/types/bank';
import { InvoicePembeli } from '@/types/invoice';
import Pagination from '@/types/pagination';

type IFormInput = {
  jenis_pembayaran: number;
  nama: string;
  email: string;
};

const BeliAkunMain = ({ id }: { id: number }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const router = useRouter();

  const [beliBtnDisabled, setBeliBtnDisabled] = React.useState(false);
  const [recaptchaResponse, setRecaptchaResponse] = useState<string | null>(
    null
  );

  const [phone, setPhone] = useState<string>();

  const { data: banks } = useSWR<{
    data: { data: Bank[]; pagination: Pagination };
    message: string;
    success: boolean;
  }>(`${API_URL}/master/bank`);

  const jenisPembayaranOpts = banks?.data.data.map((b) => ({
    value: b.id,
    label: b.name,
  }));

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!phone || (phone && !isPossiblePhoneNumber(phone))) {
      return;
    }

    if (!recaptchaResponse) {
      toast.warn('Captcha harus diselesaikan');
    }
    const res = await toast.promise(
      axios.post<{ data: InvoicePembeli; message: string; success: boolean }>(
        stringifyUrl({
          url: `${API_URL}/invoice/${id}`,
          query: {
            recaptcha_response: recaptchaResponse,
          },
        }),
        { ...data, phone: phone?.replace('+', '') }
      ),
      {
        pending: {
          render: () => {
            setBeliBtnDisabled(true);
            return 'Loading';
          },
        },
        success: {
          render: () => {
            setBeliBtnDisabled(false);
            router.push(`/invoice-beli/${res.data.data.no_invoice}`);
            return 'Berhasil beli, menuju laman invoice';
          },
        },
        error: {
          render: (e) => {
            setBeliBtnDisabled(false);
            return (
              (e?.data?.response?.data.message as string) || 'Gagal beli akun!'
            );
          },
        },
      }
    );
  };

  if (!jenisPembayaranOpts?.[0]) {
    return <Spinner />;
  }

  return (
    <main>
      <Breadcrumbs breadcrumbTitle='Beli Akun' breadcrumbSubTitle='Beli Akun' />

      <section
        className='login-area'
        style={{ background: 'url(assets/img/bg/sign-up-bg.jpg)' }}
      >
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-xxl-6 col-xl-7 col-lg-8'>
              <div className='login-wrapper pos-rel wow fadeInUp mb-40'>
                <div className=' login-inner'>
                  <div className='login-content'>
                    <h4>Beli Akun</h4>
                    <form
                      className='login-form'
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className='row gap-y-6'>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='email'>Nama</label>
                            <input
                              type='text'
                              placeholder='Masukkan Nama Anda'
                              autoFocus
                              {...register('nama', {
                                required: 'Nama harus diisi',
                              })}
                            />
                          </div>
                          <p className='text-red-500'>{errors.nama?.message}</p>
                        </div>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='email'>Email</label>
                            <input
                              type='email'
                              id='email'
                              placeholder='Masukkan email anda'
                              {...register('email', {
                                required: 'Email harus diisi',
                                pattern: {
                                  value:
                                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                  message: 'Email tidak valid!',
                                },
                              })}
                            />
                          </div>
                          <p className='text-red-500'>
                            {errors.email?.message}
                          </p>
                        </div>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='phone'>No. Handphone</label>
                            <PhoneInput
                              defaultCountry='ID'
                              placeholder='Masukkan No. Handphone'
                              value={phone}
                              onChange={setPhone}
                              error={
                                phone
                                  ? isValidPhoneNumber(phone)
                                    ? undefined
                                    : 'Invalid phone number'
                                  : 'Phone number required'
                              }
                            />
                          </div>
                          <p className='text-red-500'>
                            {phone &&
                              !isPossiblePhoneNumber(phone) &&
                              'Nomor telepon tidak valid'}
                          </p>
                        </div>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='jenis_pembayaran'>
                              Jenis Pembayaran
                            </label>
                            <Controller
                              control={control}
                              defaultValue={jenisPembayaranOpts[0].value}
                              name='jenis_pembayaran'
                              render={({ field: { onChange, value } }) => (
                                <Select
                                  className={clsxm('py-3 pt-0')}
                                  options={jenisPembayaranOpts}
                                  value={jenisPembayaranOpts.find(
                                    (c) => c.value === value
                                  )}
                                  onChange={(val) => onChange(val?.value)}
                                />
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      <Captcha
                        onChange={(token) => setRecaptchaResponse(token)}
                      />
                      <div className='login-btn mt-4'>
                        <ButtonGradient
                          className='text-white'
                          type='submit'
                          disabled={beliBtnDisabled}
                        >
                          Beli akun
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

export default BeliAkunMain;
