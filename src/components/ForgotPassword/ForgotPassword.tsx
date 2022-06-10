import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Breadcrumbs from '@/components/Common/PageTitle';
import ThemeChanger from '@/components/Common/ThemeChanger';
import { API_URL } from '@/constant/config';

type IFormInput = {
  email: string;
};

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const res = await axios.post(`${API_URL}/auth/forgot-password`, data);
    console.log(res.data);
  };

  return (
    <main>
      <ThemeChanger />

      <Breadcrumbs
        breadcrumbTitle='Forgot Password'
        breadcrumbSubTitle='Forgot Password'
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
                    <h4>Forgot Password</h4>
                    <form
                      className='login-form'
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className='row'>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='email'>Email</label>
                            <input
                              type='text'
                              placeholder='Your email or username'
                              {...register('email', {
                                required: 'Username/Email harus diisi',
                              })}
                            />
                          </div>
                          <p className='text-red-500'>
                            {errors.email?.message}
                          </p>
                        </div>
                      </div>
                      <div className='login-btn'>
                        <button className='fill-btn' type='submit'>
                          Reset Password
                        </button>
                        <div className='note'>
                          Not yet registered?{' '}
                          <Link href='/register'>
                            <a className='text-btn'>Sign up</a>
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
