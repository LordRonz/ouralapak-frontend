import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import ButtonGradient from '@/components/buttons/ButtonGradient';
import Breadcrumbs from '@/components/Common/PageTitle';
import ParticleComponent from '@/components/Common/ParticleComponent';
import { API_URL } from '@/constant/config';

type IFormInput = {
  password: string;
  confirm_password: string;
};

const ResetPasswordMain = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();

  const router = useRouter();
  const { slug: token } = router.query;

  const [resetBtnDisabled, setResetBtnDisabled] = React.useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await toast.promise(
      axios.put(`${API_URL}/auth/reset-password/${token}`, data),
      {
        pending: {
          render: () => {
            setResetBtnDisabled(true);
            return 'Loading';
          },
        },
        success: {
          render: () => {
            setResetBtnDisabled(false);
            router.push('/login');
            return 'Berhasil reset password';
          },
        },
        error: {
          render: () => {
            setResetBtnDisabled(false);
            return 'Gagal reset password!, Silahkan coba lagi';
          },
        },
      }
    );
  };

  return (
    <main>
      <Breadcrumbs
        breadcrumbTitle='Reset Password'
        breadcrumbSubTitle='Reset Password'
      />

      <section className='login-area pb-90 relative'>
        <ParticleComponent />
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-xxl-6 col-xl-7 col-lg-8'>
              <div className='login-wrapper pos-rel wow fadeInUp mb-40 !bg-neutral-200 dark:!bg-neutral-800'>
                <div className=' login-inner'>
                  <div className='login-content'>
                    <h4>Reset Password</h4>
                    <form
                      className='login-form'
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className='row'>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='password'>Password</label>
                            <input
                              type='password'
                              id='password'
                              placeholder='********'
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
                        <div className='col-md-12'>
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
                      <div className='note mb-2'>
                        <Link href='/forgot-password'>
                          <a className='text-btn'>Lupa password?</a>
                        </Link>
                      </div>
                      <div className='login-btn'>
                        <ButtonGradient
                          className='text-white'
                          type='submit'
                          disabled={resetBtnDisabled}
                        >
                          Reset Password
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

export default ResetPasswordMain;
