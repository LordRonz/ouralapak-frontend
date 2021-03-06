import type { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import FormItem from '@/components/forms/FormItem';
import StyledInput from '@/components/forms/StyledInput';
import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';
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
              className='w-96 rounded-xl bg-gray-300 py-8 px-12 shadow-lg shadow-slate-400 dark:!bg-neutral-800 dark:!shadow-neutral-700'
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
                <label htmlFor='email'>Email</label>
                <StyledInput
                  type='text'
                  className='block rounded-lg border-2 bg-gray-300 p-2 dark:!bg-gray-900'
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
              </FormItem>
              <FormItem errorMessage={errors.password?.message}>
                <label htmlFor='password'>Password</label>
                <StyledInput
                  type='password'
                  className='mb-4 block rounded-lg border-2 bg-gray-300 p-2 dark:!bg-gray-900'
                  {...register('password', {
                    required: 'Password harus diisi',
                  })}
                />
              </FormItem>
              <div className='mt-2 flex items-center justify-center'>
                <Button type='submit'>Submit</Button>
              </div>
            </form>

            <p className='text-xl text-primary-200'>
              <ArrowLink href='/' openNewTab={false} direction='left'>
                Back To Home
              </ArrowLink>
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Login;
