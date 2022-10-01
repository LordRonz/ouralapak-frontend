import axios from 'axios';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import ClipLoader from 'react-spinners/ClipLoader';

import AnimatePage from '@/components/AnimatePage';
import Footer from '@/components/Layout/Footer/FooterOne/Footer';
import HeaderIklan from '@/components/Layout/Header/HeaderIklan';
import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';
import { PRIMARY } from '@/constant/colors';
import { API_URL } from '@/constant/config';

const Verify: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean>();

  const router = useRouter();
  const { slug: token } = router.query;

  useEffect(() => {
    if (!token) return;
    console.log(token);
    (async () => {
      const res = await axios.put(`${API_URL}/auth/user/activate/${token}`);
      setLoading(false);
      if (res.data.success) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    })();
  }, [token]);

  return (
    <>
      <Seo templateTitle='Verify' />
      <AnimatePage>
        <HeaderIklan />
        <div className='flex h-80 items-center justify-center'>
          {loading ? (
            <ClipLoader size={100} color={PRIMARY['400']} />
          ) : success ? (
            <div className='flex flex-col items-center justify-center space-y-6'>
              <div className='flex space-x-4'>
                <h1>Verifikasi Berhasil</h1>{' '}
                <FiCheck className='text-5xl text-green-400' />
              </div>
              <ArrowLink href='/login' className='border-none text-xl'>
                Login
              </ArrowLink>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center space-y-6'>
              <div className='flex space-x-4'>
                <h1>Verifikasi Gagal</h1>{' '}
                <FiX className='text-5xl text-red-400' />
              </div>
            </div>
          )}
        </div>
        <Footer />
      </AnimatePage>
    </>
  );
};

export default Verify;
