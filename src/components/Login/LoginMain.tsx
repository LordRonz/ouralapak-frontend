import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useLocalStorage } from 'react-use';

import ButtonGradient from '@/components/buttons/ButtonGradient';
import Breadcrumbs from '@/components/Common/PageTitle';
import { API_URL } from '@/constant/config';

type IFormInput = {
  emailOrUsername: string;
  password: string;
};

const LoginMain = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const router = useRouter();

  const [, setToken] = useLocalStorage<string>('token');

  const [loginBtnDisabled, setLoginBtnDisabled] = React.useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const res = await toast.promise(axios.post(`${API_URL}/auth/login`, data), {
      pending: {
        render: () => {
          setLoginBtnDisabled(true);
          return 'Loading';
        },
      },
      success: {
        render: () => {
          setLoginBtnDisabled(false);
          if (res.data.data.token) {
            setToken(res.data.data.token as string);
          }
          setTimeout(() => router.push('/'), 1000);
          return 'Berhasil login';
        },
      },
      error: {
        render: () => {
          setLoginBtnDisabled(false);
          return 'Gagal login!';
        },
      },
    });
  };

  return (
    <main>
      <Breadcrumbs breadcrumbTitle='Sign in' breadcrumbSubTitle='Sign in' />

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
                    <h4>Masuk Akun</h4>
                    <form
                      className='login-form'
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className='row'>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='email'>Email atau username</label>
                            <input
                              type='text'
                              placeholder='Email atau username anda'
                              {...register('emailOrUsername', {
                                required: 'Username/Email harus diisi',
                              })}
                            />
                          </div>
                          <p className='text-red-500'>
                            {errors.emailOrUsername?.message}
                          </p>
                        </div>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='password'>Password</label>
                            <input
                              type='password'
                              id='password'
                              placeholder='********'
                              {...register('password', {
                                required: 'Password harus diisi',
                              })}
                            />
                          </div>
                          <p className='text-red-500'>
                            {errors.password?.message}
                          </p>
                        </div>
                      </div>
                      <div className='note mb-2'>
                        <Link href='/forgot-password'>
                          <a className='text-btn'>Lupa password?</a>
                        </Link>
                      </div>
                      <div className='login-btn'>
                        <ButtonGradient
                          className='text-white'
                          type='submit'
                          disabled={loginBtnDisabled}
                        >
                          Masuk akun
                        </ButtonGradient>
                        <div className='note'>
                          Belum terdaftar?{' '}
                          <Link href='/register'>
                            <a className='text-btn'>Buat akun</a>
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

export default LoginMain;
