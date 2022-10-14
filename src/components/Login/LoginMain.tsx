/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useEffectOnce, useLocalStorage } from 'react-use';

import ButtonGradient from '@/components/buttons/ButtonGradient';
import Breadcrumbs from '@/components/Common/PageTitle';
import ParticleComponent from '@/components/Common/ParticleComponent';
import { API_URL } from '@/constant/config';
import customAxios from '@/lib/customAxios';
import toastPromiseError from '@/lib/toastPromiseError';
import APIResponse from '@/types/response';
import Roles from '@/types/roles';
import { UserLogin } from '@/types/user';

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

  useEffectOnce(() => {
    const { state } = router.query;
    if (state === 'unauthorized') {
      toast.warning('Silahkan login terlebih dahulu', {
        toastId: 'unauthorized',
      });
    }
  });

  const [, setToken] = useLocalStorage<string>('token');

  const [loginBtnDisabled, setLoginBtnDisabled] = React.useState(false);
  const [passMode, setPassMode] = useState(true);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await toast.promise(
      customAxios.post<APIResponse<{ user: UserLogin; token: string }>>(
        `${API_URL}/auth/login`,
        data
      ),
      {
        pending: {
          render: () => {
            setLoginBtnDisabled(true);
            return 'Loading';
          },
        },
        success: {
          render: ({ data }) => {
            setLoginBtnDisabled(false);
            if (data?.data?.data?.user) {
              setToken(data?.data?.data?.token as string);
              axios.defaults.headers.common['Authorization'] =
                data?.data?.data?.token;
            }
            if (
              (data?.data?.data?.user.roles as string[]).includes(
                Roles.SUPERUSER
              )
            ) {
              router.push('/admin');
            } else if (
              (data?.data?.data?.user.roles as string[]).includes(Roles.ADMIN)
            ) {
              router.push('/admin');
            } else {
              router.push((router.query.returnTo as string) ?? '/seller');
            }
            return 'Berhasil login';
          },
        },
        error: {
          render: toastPromiseError(() => {
            setLoginBtnDisabled(false);
          }, 'Gagal login!'),
        },
      }
    );
  };

  return (
    <main>
      <Breadcrumbs breadcrumbTitle='Sign in' breadcrumbSubTitle='Sign in' />

      <section className='login-area relative pb-10 pt-20'>
        <ParticleComponent />
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-xxl-6 col-xl-7 col-lg-8'>
              <div className='login-wrapper wow fadeInUp relative mb-40 !bg-white dark:!bg-neutral-800'>
                <div className=' login-inner'>
                  <div className='login-content'>
                    <h4>Masuk Akun</h4>
                    <form
                      className='login-form'
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className='row gap-y-6'>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='email'>Email atau username</label>
                            <input
                              type='text'
                              placeholder='Email atau username anda'
                              autoFocus
                              {...register('emailOrUsername', {
                                required: 'Username/Email harus diisi',
                              })}
                              className='border'
                            />
                          </div>
                          <p className='text-red-500'>
                            {errors.emailOrUsername?.message}
                          </p>
                        </div>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='password'>Password</label>
                            <div className='flex items-stretch justify-center'>
                              <input
                                type={passMode ? 'password' : 'text'}
                                placeholder='Password anda'
                                {...register('password', {
                                  required: 'Password harus diisi',
                                })}
                                className='border'
                              />
                              <div
                                className='flex min-h-full cursor-pointer items-center justify-center rounded border-2 px-1 hover:border-primary-200 dark:border-transparent hover:dark:border-primary-600'
                                onClick={() => setPassMode(!passMode)}
                              >
                                {passMode ? <FiEye /> : <FiEyeOff />}
                              </div>
                            </div>
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
