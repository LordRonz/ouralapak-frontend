import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select';
import { toast } from 'react-toastify';
import useSWR from 'swr';

import ButtonGradient from '@/components/buttons/ButtonGradient';
import Breadcrumbs from '@/components/Common/PageTitle';
import { API_URL } from '@/constant/config';
import clsxm from '@/lib/clsxm';
import Bank from '@/types/bank';
import Pagination from '@/types/pagination';
import Roles from '@/types/roles';

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

  console.log(id);

  const router = useRouter();

  const [beliBtnDisabled, setBeliBtnDisabled] = React.useState(false);

  const { data: banks } = useSWR<{
    data: { data: Bank[]; pagination: Pagination };
    message: string;
    success: boolean;
  }>(`${API_URL}/master/bank`);

  const jenisPembayaranOpts = banks?.data.data.map((b) => ({
    value: b.id,
    label: b.rekening_name,
  }));

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const res = await toast.promise(axios.post(`${API_URL}/auth/login`, data), {
      pending: {
        render: () => {
          setBeliBtnDisabled(true);
          return 'Loading';
        },
      },
      success: {
        render: () => {
          setBeliBtnDisabled(false);
          if ((res.data.data.user.roles as string[]).includes(Roles.ADMIN)) {
            router.push((router.query.returnTo as string) ?? '/admin');
          } else {
            router.push((router.query.returnTo as string) ?? '/');
          }
          return 'Berhasil login';
        },
      },
      error: {
        render: () => {
          setBeliBtnDisabled(false);
          return 'Gagal beli akun!';
        },
      },
    });
  };

  if (!jenisPembayaranOpts?.[0]) {
    return <></>;
  }

  return (
    <main>
      <Breadcrumbs breadcrumbTitle='Beli Akun' breadcrumbSubTitle='Beli Akun' />

      <section
        className='login-area pb-90'
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
                      <div className='row'>
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
                      <div className='login-btn'>
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
