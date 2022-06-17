import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Breadcrumbs from '@/components/Common/PageTitle';
import ThemeChanger from '@/components/Common/ThemeChanger';
import { API_URL } from '@/constant/config';

import ButtonGradient from '../buttons/ButtonGradient';

type IFormInput = {
  email: string;
};

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [submitBtnDisabled, setSubmitBtnDisabled] = React.useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await toast.promise(axios.post(`${API_URL}/auth/forgot-password`, data), {
      pending: {
        render: () => {
          setSubmitBtnDisabled(true);
          return 'Loading';
        },
      },
      success: {
        render: () => {
          setSubmitBtnDisabled(false);
          return 'Silahkan cek email anda';
        },
      },
      error: {
        render: () => {
          setSubmitBtnDisabled(false);
          return 'Gagal melakukan lupa password!';
        },
      },
    });
  };

  return (
    <main>
      <ThemeChanger />

      <Breadcrumbs
        breadcrumbTitle='Lupa Password'
        breadcrumbSubTitle='Lupa Password'
      />

      <section
        className='login-area pt-130 pb-90'
        style={{ background: 'url(assets/img/bg/sign-up-bg.jpg)' }}
      >
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-xxl-6 col-xl-7 col-lg-8'>
              <div className='login-wrapper pos-rel wow fadeInUp mb-40'>
                <div className=' login-inner'>
                  <div className='login-content'>
                    <h4>Lupa Password</h4>
                    <form
                      className='login-form'
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className='row'>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='email'>Email</label>
                            <input
                              type='email'
                              placeholder='Email anda'
                              {...register('email', {
                                required: 'Email harus diisi',
                              })}
                            />
                          </div>
                          <p className='text-red-500'>
                            {errors.email?.message}
                          </p>
                        </div>
                      </div>
                      <div className='login-btn'>
                        <ButtonGradient
                          className='text-white'
                          type='submit'
                          disabled={submitBtnDisabled}
                        >
                          Kirim
                        </ButtonGradient>
                        <div className='note'>
                          Sudah punya akun?{' '}
                          <Link href='/login'>
                            <a className='text-btn'>Sign In</a>
                          </Link>
                        </div>
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

export default ForgotPassword;
