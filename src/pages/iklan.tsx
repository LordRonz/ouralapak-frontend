import type { NextPage } from 'next';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { FiUpload } from 'react-icons/fi';
import Select from 'react-select';

import Button from '@/components/buttons/Button';
import DragNDrop from '@/components/forms/DragNDrop';
import FormItem from '@/components/forms/FormItem';
import StyledInput from '@/components/forms/StyledInput';
import StyledSelect from '@/components/forms/StyledSelect';
import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';
import { toastStyle } from '@/constant/toast';
import clsxm from '@/lib/clsxm';
import oura_long from '~/images/ouralapak_logo_long.png';

type IFormInput = {
  judul: string;
  first_hand_status: boolean;
  platform: number;
  change_name_status: boolean;
  first_top_up_exist: boolean;
  first_top_up_image: string;
  account_bind: string[];
  favorite_heroes: string[];
  win_rate: string;
  total_hero: number;
  total_skin: number;
  total_skin_rare: string[];
  total_emblem: string[];
  recall_effect: string[];
  jenis_refund: 1 | 2 | 3;
  harga_akun: string;
  total_pembayaran: string;
  jenis_pembayaran: string;
  image_profile: string;
  image_win_rate: string;
  image_win_rate_hero: string;
  image_emblem: string;
  image_skin: string[];
};

const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

const Register: NextPage = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [selectedFile, setSelectedFile] = useState<File>();

  const onUpload = (files?: FileList | File[] | null) => {
    setSelectedFile(files?.[0]);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    if (!SUPPORTED_IMAGE_TYPES.includes(acceptedFiles[0].type)) {
      setSelectedFile(undefined);

      return;
    }
    onUpload(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    e.preventDefault();
    if (
      e?.currentTarget?.files?.[0]?.type &&
      !SUPPORTED_IMAGE_TYPES.includes(e.currentTarget.files[0].type)
    ) {
      e.target.value = '';
      setSelectedFile(undefined);

      return;
    }
    onUpload(e?.currentTarget?.files);
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  const accountBindOpts = [
    { value: '1', label: 'Moonton' },
    { value: '2', label: 'Facebook' },
  ];

  return (
    <Layout>
      <Seo templateTitle='Register' />
      <main>
        <section className=''>
          <div className='layout flex min-h-screen flex-col items-center justify-center gap-y-12 py-12'>
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
                <h1 className='text-4xl font-medium text-primary-300'>
                  Posting Iklan
                </h1>
              </div>
              <FormItem errorMessage={errors.judul?.message}>
                <label htmlFor='judul'>Judul</label>
                <StyledInput
                  type='text'
                  className='block rounded-lg border-2 bg-gray-300 p-2 dark:bg-gray-900'
                  {...register('judul', {
                    required: 'Judul harus diisi',
                  })}
                />
              </FormItem>
              <FormItem errorMessage={errors.first_hand_status?.message}>
                <label htmlFor='first_hand_status'>First Hand Status</label>
                <StyledSelect
                  className='block rounded-lg border-2 bg-gray-300 p-2 dark:bg-gray-900'
                  {...register('first_hand_status', {
                    required: 'First hand status harus diisi',
                  })}
                >
                  <option value='0'>Akun Pribadi</option>
                  <option value='1'>Akun Beli</option>
                </StyledSelect>
              </FormItem>
              <FormItem errorMessage={errors.platform?.message}>
                <label htmlFor='platform'>Nomor Telepon</label>
                <StyledSelect
                  className='block rounded-lg border-2 bg-gray-300 p-2 dark:bg-gray-900'
                  {...register('platform', {
                    required: 'Platform harus diisi',
                  })}
                >
                  <option value='1'>Android</option>
                  <option value='2'>iOS</option>
                </StyledSelect>
              </FormItem>
              <FormItem errorMessage={errors.change_name_status?.message}>
                <label htmlFor='change_name_status'>Change Name Status</label>
                <StyledSelect
                  className='block rounded-lg border-2 bg-gray-300 p-2 dark:bg-gray-900'
                  {...register('change_name_status', {
                    required: 'Change name status harus diisi',
                  })}
                >
                  <option value='0'>Change name non-aktif</option>
                  <option value='1'>Change name aktif</option>
                </StyledSelect>
              </FormItem>
              <FormItem errorMessage={errors.first_top_up_exist?.message}>
                <label htmlFor='first_top_up_exist'>Bukti top up</label>
                <StyledSelect
                  className='block rounded-lg border-2 bg-gray-300 p-2 dark:bg-gray-900'
                  {...register('first_top_up_exist', {
                    required: 'Bukti top up harus diisi',
                  })}
                >
                  <option value='0'>Bukti top up ada</option>
                  <option value='1'>Bukti top up tidak ada</option>
                </StyledSelect>
              </FormItem>
              <label htmlFor='confirm_password'>Foto bukti top up</label>
              <DragNDrop
                onChange={onFileChange}
                rootProps={getRootProps()}
                inputProps={getInputProps()}
                className='mb-8 mt-4'
              >
                <FiUpload
                  className={clsxm(
                    'mr-4 text-4xl',
                    !!selectedFile?.name && 'hidden'
                  )}
                />
                {selectedFile?.name ?? 'Upload Image'}
              </DragNDrop>
              <FormItem errorMessage={errors.account_bind?.[0].message}>
                <label htmlFor='first_top_up_exist'>Binding account</label>
                <Controller
                  control={control}
                  defaultValue={[]}
                  name='account_bind'
                  render={({ field: { onChange, value } }) => (
                    <Select
                      className={clsxm(
                        'w-full rounded-md dark:bg-dark',
                        'border',
                        'border-gray-800 dark:border-gray-500',
                        'transition-all duration-200 focus:border-primary-300 focus:outline-none focus:ring-0 dark:focus:border-primary-300'
                      )}
                      options={accountBindOpts}
                      value={accountBindOpts.filter((c) =>
                        value.includes(c.value)
                      )}
                      onChange={(val) => onChange(val.map((c) => c.value))}
                      isMulti
                    />
                  )}
                />
              </FormItem>
              <FormItem errorMessage={errors.account_bind?.[0].message}>
                <label htmlFor='first_top_up_exist'>Binding account</label>
                <Controller
                  control={control}
                  defaultValue={[]}
                  name='account_bind'
                  render={({ field: { onChange, value } }) => (
                    <Select
                      className={clsxm(
                        'w-full rounded-md dark:bg-dark',
                        'border',
                        'border-gray-800 dark:border-gray-500',
                        'transition-all duration-200 focus:border-primary-300 focus:outline-none focus:ring-0 dark:focus:border-primary-300'
                      )}
                      options={accountBindOpts}
                      value={accountBindOpts.filter((c) =>
                        value.includes(c.value)
                      )}
                      onChange={(val) => onChange(val.map((c) => c.value))}
                      isMulti
                    />
                  )}
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

export default Register;
