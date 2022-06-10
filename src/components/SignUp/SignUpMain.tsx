import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Breadcrumbs from '@/components/Common/PageTitle';
import ThemeChanger from '@/components/Common/ThemeChanger';
import { API_URL } from '@/constant/config';

type IFormInput = {
  email: string;
  name: string;
  phone: string;
  ig_username: string;
  password: string;
  confirm_password: string;
};

const SignUpMain = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const res = await axios.post(`${API_URL}/auth/user/register`, data);
    console.log(res.data);
  };

  return (
    <main>
      <ThemeChanger />

      <Breadcrumbs
        breadcrumbTitle='Sign up'
        breadcrumbSubTitle='Create Account'
      />

      <section
        className='sign-up-area pt-130 pb-90'
        style={{ background: 'url(assets/img/bg/sign-up-bg.jpg)' }}
      >
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='sign-up-wrapper pos-rel wow fadeInUp mb-40'>
                <div className='sign-up-inner'>
                  <div className='sign-up-content'>
                    <h4>Create Account</h4>
                    <p className='mb-35'>
                      It{"'"}s easy to create an account for Non-fungible tokens
                      and sale your any items independently online securely in
                      the world.
                    </p>
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
                              placeholder='Your email'
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
                              placeholder='Your name'
                              {...register('name', {
                                required: 'Nama harus diisi',
                              })}
                            />
                          </div>
                          <p className='text-red-500'>{errors.name?.message}</p>
                        </div>
                        <div className='col-md-6'>
                          <div className='single-input-unit'>
                            <label htmlFor='name'>Nomor Telepon</label>
                            <input
                              type='text'
                              placeholder='Your number'
                              {...register('phone', {
                                required: 'Nomor telepon harus diisi',
                                pattern: {
                                  value:
                                    /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/,
                                  message: 'Nomor telepon tidak valid!',
                                },
                              })}
                            />
                          </div>
                          <p className='text-red-500'>
                            {errors.phone?.message}
                          </p>
                        </div>
                        <div className='col-md-6'>
                          <div className='single-input-unit'>
                            <label htmlFor='ig_username'>IG Username</label>
                            <input
                              type='text'
                              placeholder='Your IG username'
                              {...register('ig_username', {
                                required: 'Username instagram harus diisi',
                              })}
                            />
                          </div>
                          <p className='text-red-500'>
                            {errors.ig_username?.message}
                          </p>
                        </div>
                        <div className='col-md-6'>
                          <div className='single-input-unit'>
                            <label htmlFor='password'>Password</label>
                            <input
                              type='password'
                              placeholder='Your password'
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
                              placeholder='Your password confirmation'
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
                      <div className='sign-up-btn'>
                        <button className='fill-btn' type='submit'>
                          Create Account
                        </button>
                        <div className='note'>
                          Already have an account?{' '}
                          <Link href='/login'>
                            <a className='text-btn'>Sign In</a>
                          </Link>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className='sign-up-with-social'>
                  <div
                    className='sign-up-with-social-bg'
                    style={{
                      background: 'url(assets/img/bg/sign-up-social-bg.jpg)',
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignUpMain;
