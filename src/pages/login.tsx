import type { NextPage } from 'next';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';

import Button from '@/components/buttons/Button';
import StyledInput from '@/components/forms/StyledInput';
import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';
import { toastStyle } from '@/constant/toast';

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
    <>
      <Seo templateTitle='Login' />
      <main>
        <section className=''>
          <div className='layout flex min-h-screen flex-col items-center justify-center gap-y-12 text-center'>
            <div>
              <h1 className='mb-4 text-4xl text-primary-300'>Login</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid grid-rows-3'>
                <div className='row-span-2'>
                  <label htmlFor='name'>Email</label>
                  <StyledInput
                    type='text'
                    className='block rounded-lg border-2 bg-gray-300 p-2 dark:bg-gray-900'
                    {...register('email', {
                      required: 'This field is required',
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Invalid email',
                      },
                    })}
                  />
                </div>
                <p className='text-red-500'>{errors.email?.message}</p>
              </div>
              <div className='grid grid-rows-3'>
                <div className='row-span-2'>
                  <label htmlFor='password'>Password</label>
                  <StyledInput
                    type='password'
                    className='mb-4 block rounded-lg border-2 bg-gray-300 p-2 dark:bg-gray-900'
                    {...register('password', { required: true })}
                  />
                </div>
                <p className='text-red-500'>{errors.password?.message}</p>
              </div>
              <div className='mt-2'>
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
    </>
  );
};

export default Login;
