import type { NextPage } from 'next';
import React from 'react';
import { Toaster } from 'react-hot-toast';

import Button from '@/components/buttons/Button';
import StyledInput from '@/components/forms/StyledInput';
import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';
import { toastStyle } from '@/constant/toast';

const Login: NextPage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            <form onSubmit={handleSubmit}>
              <label htmlFor='name'>Name</label>
              <StyledInput
                type='text'
                name='name'
                className='mb-4 block rounded-lg border-2 bg-gray-300 p-2 dark:bg-gray-900'
              />
              <label htmlFor='password'>Password</label>
              <StyledInput
                type='password'
                name='password'
                className='mb-4 block rounded-lg border-2 bg-gray-300 p-2 dark:bg-gray-900'
              />
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
