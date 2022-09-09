import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { stringifyUrl } from 'query-string';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import PhoneInput, {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from 'react-phone-number-input';
import { toast } from 'react-toastify';

import ButtonGradient from '@/components/buttons/ButtonGradient';
import Captcha from '@/components/Common/Captcha';
import Breadcrumbs from '@/components/Common/PageTitle';
import ParticleComponent from '@/components/Common/ParticleComponent';
import { API_URL } from '@/constant/config';
import toastPromiseError from '@/lib/toastPromiseError';

type IFormInput = {
  email: string;
  name: string;
  username: string;
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

  const [signUpBtnDisabled, setSignUpBtnDisabled] = useState(false);
  const [recaptchaResponse, setRecaptchaResponse] = useState<string | null>(
    null
  );
  const [passMode, setPassMode] = useState(true);

  const [phone, setPhone] = useState<string>();

  const router = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!phone || (phone && !isPossiblePhoneNumber(phone))) {
      return;
    }

    if (!recaptchaResponse) {
      toast.warn('Captcha harus diselesaikan');
      return;
    }

    await toast.promise(
      axios.post(
        stringifyUrl({
          url: `${API_URL}/auth/user/register`,
        }),
        { ...data, phone: phone?.replace('+', '') },
        { headers: { recaptcha_response: recaptchaResponse } }
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
            router.push('/login');
            return 'Kamu sudah terdaftar, konfirmasi email untuk aktivasi akun';
          },
        },
        error: {
          render: toastPromiseError(() => {
            setSignUpBtnDisabled(false);
          }, 'Gagal register!'),
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

      <section className='login-area relative pb-10 pt-20'>
        <ParticleComponent />
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-xxl-6 col-xl-7 col-lg-8'>
              <div className='sign-up-wrapper wow fadeInUp relative mb-40 !bg-neutral-200 dark:!bg-neutral-800'>
                <div className='sign-up-inner'>
                  <div className='sign-up-content'>
                    <h4>Buat Akun</h4>
                    <form
                      className='sign-up-form'
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className='row gap-y-6'>
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
                            <label htmlFor='ig_username'>IG Username</label>
                            <input
                              type='text'
                              placeholder='Username IG anda'
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
                            <div className='flex items-stretch justify-center'>
                              <input
                                type={passMode ? 'password' : 'text'}
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

export default SignUpMain;
