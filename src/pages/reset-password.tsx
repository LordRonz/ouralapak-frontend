import type { NextPage } from 'next';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import AnimatePage from '@/components/AnimatePage';
import Button from '@/components/buttons/Button';
import FormItem from '@/components/forms/FormItem';
import StyledInput from '@/components/forms/StyledInput';
import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';

type IFormInput = {
  password: string;
  confirm_password: string;
};

const ForgotPassword: NextPage = () => {
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
      <Seo templateTitle='Reset Password' />
      <AnimatePage>
        <main>
          <section className=''>
            <div className='layout flex min-h-screen flex-col items-center justify-center gap-y-12'>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='w-96 rounded-xl bg-gray-300 py-8 px-12 shadow-lg shadow-slate-400 dark:!bg-neutral-800 dark:!shadow-neutral-700'
              >
                <div className='mb-8 flex items-center justify-center'>
                  <h1 className='text-4xl text-primary-300'>Reset Password</h1>
                </div>
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
      </AnimatePage>
    </Layout>
  );
};

export default ForgotPassword;
