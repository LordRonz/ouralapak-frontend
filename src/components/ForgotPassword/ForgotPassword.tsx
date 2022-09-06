import axios from 'axios';
import Link from 'next/link';
import { stringifyUrl } from 'query-string';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import ButtonGradient from '@/components/buttons/ButtonGradient';
import Captcha from '@/components/Common/Captcha';
import Breadcrumbs from '@/components/Common/PageTitle';
import ParticleComponent from '@/components/Common/ParticleComponent';
import { API_URL } from '@/constant/config';
import toastPromiseError from '@/lib/toastPromiseError';

type IFormInput = {
  email: string;
};

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);
  const [recaptchaResponse, setRecaptchaResponse] = useState<string | null>(
    null
  );
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!recaptchaResponse) {
      toast.warn('Captcha harus diselesaikan');
      return;
    }
    await toast.promise(
      axios.post(
        stringifyUrl({
          url: `${API_URL}/auth/forgot-password`,
        }),
        data,
        { headers: { recaptcha_response: recaptchaResponse } }
      ),
      {
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
          render: toastPromiseError(() => {
            setSubmitBtnDisabled(false);
          }, 'Gagal melakukan lupa password!'),
        },
      }
    );
  };

  return (
    <main>
      <Breadcrumbs
        breadcrumbTitle='Lupa Password'
        breadcrumbSubTitle='Lupa Password'
      />

      <section className='login-area pb-90 relative'>
        <ParticleComponent />
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-xxl-6 col-xl-7 col-lg-8'>
              <div className='login-wrapper wow fadeInUp relative mb-40 !bg-neutral-200 dark:!bg-neutral-800'>
                <div className=' login-inner'>
                  <div className='login-content'>
                    <h4>Lupa Password</h4>
                    <form
                      className='login-form'
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className='row gap-y-6'>
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
                      <Captcha
                        onChange={(token) => setRecaptchaResponse(token)}
                      />
                      <div className='login-btn mt-4'>
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
