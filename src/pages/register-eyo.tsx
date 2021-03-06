import type { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import AnimatePage from '@/components/AnimatePage';
import Button from '@/components/buttons/Button';
import FormItem from '@/components/forms/FormItem';
import StyledInput from '@/components/forms/StyledInput';
import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';
import oura_long from '~/images/ouralapak_logo_long.png';

type IFormInput = {
  email: string;
  name: string;
  phone: string;
  ig_username: string;
  password: string;
  confirm_password: string;
};

const Register: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <Layout>
      <Seo templateTitle='Register' />
      <AnimatePage>
        <main>
          <section className=''>
            <div className='layout flex min-h-screen flex-col items-center justify-center gap-y-12 py-12'>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='w-96 rounded-xl bg-gray-200 py-8 px-12 shadow-lg shadow-slate-400 dark:!bg-neutral-800 dark:!shadow-neutral-700'
              >
                <div className='mb-8 flex flex-col items-center justify-center gap-y-4'>
                  <Image
                    src={oura_long}
                    width={135}
                    height={19}
                    alt='Ouralapak logo'
                  />
                  <h1 className='text-4xl font-medium text-primary-300'>
                    Register
                  </h1>
                </div>
                <FormItem errorMessage={errors.email?.message}>
                  <label htmlFor='email'>Email</label>
                  <StyledInput
                    type='text'
                    className='block rounded-lg border-2 bg-gray-300 p-2 dark:!bg-gray-900'
                    {...register('email', {
                      required: 'Email harus diisi',
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Email tidak valid!',
                      },
                    })}
                  />
                </FormItem>
                <FormItem errorMessage={errors.name?.message}>
                  <label htmlFor='name'>Nama</label>
                  <StyledInput
                    type='text'
                    className='block rounded-lg border-2 bg-gray-300 p-2 dark:!bg-gray-900'
                    {...register('name', {
                      required: 'Nama harus diisi',
                    })}
                  />
                </FormItem>
                <FormItem errorMessage={errors.phone?.message}>
                  <label htmlFor='phone'>Nomor Telepon</label>
                  <StyledInput
                    type='text'
                    className='block rounded-lg border-2 bg-gray-300 p-2 dark:!bg-gray-900'
                    {...register('phone', {
                      required: 'Nomor telepon harus diisi',
                      pattern: {
                        value:
                          /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/,
                        message: 'Nomor telepon tidak valid!',
                      },
                    })}
                  />
                </FormItem>
                <FormItem errorMessage={errors.ig_username?.message}>
                  <label htmlFor='ig_username'>Username Instagram</label>
                  <StyledInput
                    type='text'
                    className='block rounded-lg border-2 bg-gray-300 p-2 dark:!bg-gray-900'
                    {...register('ig_username', {
                      required: 'Username instagram harus diisi',
                    })}
                  />
                </FormItem>
                <FormItem errorMessage={errors.password?.message}>
                  <label htmlFor='password'>Password</label>
                  <StyledInput
                    type='password'
                    className='mb-4 block rounded-lg border-2 bg-gray-300 p-2 dark:!bg-gray-900'
                    {...register('password', {
                      required: 'Password harus diisi',
                      minLength: {
                        value: 8,
                        message: 'Password harus berisi setidaknya 8 karakter',
                      },
                    })}
                  />
                </FormItem>
                <FormItem errorMessage={errors.confirm_password?.message}>
                  <label htmlFor='confirm_password'>Konfirmasi Password</label>
                  <StyledInput
                    type='confirm_password'
                    className='mb-4 block rounded-lg border-2 bg-gray-300 p-2 dark:!bg-gray-900'
                    {...register('confirm_password', {
                      required: 'Konfirmasi password anda!',
                      validate: (val: string) => {
                        if (watch('password') != val) {
                          return 'Konfirmasi password tidak sesuai!';
                        }
                      },
                    })}
                  />
                </FormItem>
                <div className='flex items-center justify-center'>
                  <Button type='submit'>Submit</Button>
                </div>
                <div className='mt-4 text-sm'>
                  Sudah punya akun? <CustomLink href='/login'>Login</CustomLink>{' '}
                  yuk
                </div>
              </form>

              <p className='text-xl text-primary-500 dark:!text-primary-200'>
                <ArrowLink href='/' openNewTab={false} direction='left'>
                  Back To Home
                </ArrowLink>
              </p>
            </div>
          </section>
        </main>
      </AnimatePage>
    </Layout>
  );
};

export default Register;
