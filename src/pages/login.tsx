import type { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';

import Button from '@/components/buttons/Button';
import FormItem from '@/components/forms/FormItem';
import StyledInput from '@/components/forms/StyledInput';
import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';
import { toastStyle } from '@/constant/toast';
import oura_long from '~/images/ouralapak_logo_long.png';

type IFormInput = {
  email: string;
  password: string;
};

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <Layout>
      <Seo templateTitle='Login' />
      <main>
        <section className=''>
          <div className='layout flex min-h-screen flex-col items-center justify-center gap-y-12'>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='w-96 rounded-xl bg-gray-200 py-8 px-12 shadow-lg shadow-slate-400 dark:bg-neutral-800 dark:shadow-neutral-700'
            >
              <div className='mb-8 flex flex-col items-center justify-center gap-y-4'>
                <Image
                  src={oura_long}
                  width={135}
                  height={19}
                  alt='Ouralapak logo'
                />
                <h1 className='text-4xl font-medium text-primary-300'>Login</h1>
              </div>
              <FormItem errorMessage={errors.email?.message}>
                <label htmlFor='email'>Username/Email</label>
                <StyledInput
                  type='text'
                  className='block rounded-lg border-2 bg-gray-300 p-2 dark:bg-gray-900'
                  {...register('email', {
                    required: 'Username/Email harus diisi',
                  })}
                />
              </FormItem>
              <FormItem errorMessage={errors.password?.message}>
                <label htmlFor='password'>Password</label>
                <StyledInput
                  type='password'
                  className='mb-4 block rounded-lg border-2 bg-gray-300 p-2 dark:bg-gray-900'
                  {...register('password', {
                    required: 'Password harus diisi',
                  })}
                />
              </FormItem>
              <div className='mb-4 text-sm'>
                <CustomLink href='/forgot-password'>Lupa password?</CustomLink>
              </div>
              <div className='flex items-center justify-center'>
                <Button type='submit'>Submit</Button>
              </div>
              <div className='mt-4 text-sm'>
                Belum punya?{' '}
                <CustomLink href='/register'>Bikin akun</CustomLink> yuk
              </div>
            </form>

            <p className='text-xl text-primary-500 dark:text-primary-200'>
              <ArrowLink href='/' openNewTab={false} direction='left'>
                Back To Home
              </ArrowLink>
            </p>
          </div>
        </section>
      </main>
      <Toaster
        toastOptions={{
          style: toastStyle,
          loading: {
            iconTheme: {
              primary: '#eb2754',
              secondary: 'black',
            },
          },
        }}
      />
    </Layout>
  );
};

export default Login;
