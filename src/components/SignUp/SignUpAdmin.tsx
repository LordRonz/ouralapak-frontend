import axios from 'axios';
import Link from 'next/link';
import { stringifyUrl } from 'query-string';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import ButtonGradient from '@/components/buttons/ButtonGradient';
import Captcha from '@/components/Common/Captcha';
import Breadcrumbs from '@/components/Common/PageTitle';
import { API_URL } from '@/constant/config';

type IFormInput = {
  email: string;
  name: string;
  username: string;
  password: string;
  confirm_password: string;
};

const SignUpAdmin = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();

  const [signUpBtnDisabled, setSignUpBtnDisabled] = useState(false);
  const [recaptchaResponse, setRecaptchaResponse] = useState<string | null>(
    null
  );

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await toast.promise(
      axios.post(
        stringifyUrl({
          url: `${API_URL}/auth/admin/register`,
          query: {
            recaptcha_response: recaptchaResponse,
          },
        }),
        data
      ),
      {
        pending: {
          render: () => {
            setSignUpBtnDisabled(true);
            return 'Loading';
          },
        },
        success: {
          render: () => {
            setSignUpBtnDisabled(false);
            return 'Kamu sudah terdaftar, konfirmasi email untuk aktivasi akun';
          },
        },
        error: {
          render: () => {
            setSignUpBtnDisabled(false);
            return 'Gagal register!';
          },
        },
      }
    );
  };

  return (
    <main>
      <Breadcrumbs
        breadcrumbTitle='Sign up'
        breadcrumbSubTitle='Create Account'
      />

      <section
        className='sign-up-area pt-130 pb-90'
        style={{ background: 'url(/assets/img/bg/sign-up-bg.jpg)' }}
      >
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-xxl-6 col-xl-7 col-lg-8'>
              <div className='sign-up-wrapper pos-rel wow fadeInUp mb-40'>
                <div className='sign-up-inner'>
                  <div className='sign-up-content'>
                    <h4>Buat Akun Admin</h4>
                    <form
                      className='sign-up-form'
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='single-input-unit'>
                            <label htmlFor='email'>Email</label>
                            <input
                              type='email'
                              placeholder='Email anda'
                              autoFocus
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
                        <div className='col-md-6'>
                          <div className='single-input-unit'>
                            <label htmlFor='name'>Nama</label>
                            <input
                              type='text'
                              placeholder='Nama anda'
                              {...register('name', {
                                required: 'Nama harus diisi',
                              })}
                            />
                          </div>
                          <p className='text-red-500'>{errors.name?.message}</p>
                        </div>
                        <div className='col-md-6'>
                          <div className='single-input-unit'>
                            <label htmlFor='username'>Username</label>
                            <input
                              type='text'
                              placeholder='Username anda'
                              {...register('username', {
                                required: 'Username harus diisi',
                              })}
                            />
                          </div>
                          <p className='text-red-500'>
                            {errors.username?.message}
                          </p>
                        </div>
                        <div className='col-md-6'>
                          <div className='single-input-unit'>
                            <label htmlFor='password'>Password</label>
                            <input
                              type='password'
                              placeholder='Password anda'
                              {...register('password', {
                                required: 'Password harus diisi',
                                minLength: {
                                  value: 8,
                                  message:
                                    'Password harus berisi setidaknya 8 karakter',
                                },
                              })}
                            />
                          </div>
                          <p className='text-red-500'>
                            {errors.password?.message}
                          </p>
                        </div>
                        <div className='col-md-6'>
                          <div className='single-input-unit'>
                            <label htmlFor='confirm_password'>
                              Konfirmasi Password
                            </label>
                            <input
                              type='password'
                              placeholder='Konfirmasi password anda'
                              {...register('confirm_password', {
                                required: 'Konfirmasi password anda!',
                                validate: (val: string) => {
                                  if (watch('password') != val) {
                                    return 'Konfirmasi password tidak sesuai!';
                                  }
                                },
                              })}
                            />
                          </div>
                          <p className='text-red-500'>
                            {errors.confirm_password?.message}
                          </p>
                        </div>
                      </div>
                      <Captcha
                        onChange={(token) => setRecaptchaResponse(token)}
                      />
                      <div className='sign-up-btn mt-4'>
                        <ButtonGradient
                          className='text-white'
                          type='submit'
                          disabled={signUpBtnDisabled}
                        >
                          Buat Akun
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

export default SignUpAdmin;