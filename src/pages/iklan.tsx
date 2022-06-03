import type { NextPage } from 'next';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import Dropzone from 'react-dropzone';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { FiUpload } from 'react-icons/fi';
import Select from 'react-select';

import AnimatePage from '@/components/AnimatePage';
import Button from '@/components/buttons/Button';
import DeleteButton from '@/components/DeleteButton';
import DragNDrop from '@/components/forms/DragNDrop';
import FormItem from '@/components/forms/FormItem';
import StyledInput from '@/components/forms/StyledInput';
import StyledSelect from '@/components/forms/StyledSelect';
import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
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
  const [favHeroes, setFavHeroes] = useState<File[]>([]);
  const [dndDisabled, setDndDisabled] = useState<boolean>(false);

  const onUpload = (files?: FileList | File[] | null) => {
    setSelectedFile(files?.[0]);
  };

  const onBuktiTopUpDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    if (!SUPPORTED_IMAGE_TYPES.includes(acceptedFiles[0].type)) {
      setSelectedFile(undefined);

      return;
    }
    onUpload(acceptedFiles);
  }, []);

  const onFavHeroesDrop = useCallback((files: File[]) => {
    // Do something with the files
    files.filter(
      (file) => file.type && SUPPORTED_IMAGE_TYPES.includes(file.type)
    );

    setFavHeroes((currentHeroes) => [...currentHeroes, ...files]);
  }, []);

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
      <AnimatePage>
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
                <Dropzone onDrop={onBuktiTopUpDrop} disabled={dndDisabled}>
                  {({ getRootProps, getInputProps }) => (
                    <DragNDrop
                      rootProps={getRootProps()}
                      inputProps={getInputProps()}
                      className='group mb-8 mt-4'
                    >
                      <DeleteButton
                        onClick={(e) => e.preventDefault()}
                        onMouseEnter={() => setDndDisabled(true)}
                        onMouseLeave={() => setDndDisabled(false)}
                      />
                      <FiUpload
                        className={clsxm(
                          'mr-4 text-4xl',
                          !!selectedFile?.name && 'hidden'
                        )}
                      />
                      {selectedFile?.name ?? 'Upload Image'}
                    </DragNDrop>
                  )}
                </Dropzone>
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
                <label htmlFor='favorite_heroes'>Favorite Heroes</label>
                <Dropzone onDrop={onFavHeroesDrop} disabled={dndDisabled}>
                  {({ getRootProps, getInputProps }) => (
                    <DragNDrop
                      rootProps={getRootProps()}
                      inputProps={getInputProps()}
                      className='group mb-8 mt-4'
                    >
                      <DeleteButton
                        onClick={(e) => e.preventDefault()}
                        onMouseEnter={() => setDndDisabled(true)}
                        onMouseLeave={() => setDndDisabled(false)}
                      />
                      <FiUpload
                        className={clsxm(
                          'mr-4 text-4xl',
                          !!favHeroes?.length && 'hidden'
                        )}
                      />
                      {favHeroes.length
                        ? favHeroes.length + ' heroes'
                        : 'Upload Image'}
                    </DragNDrop>
                  )}
                </Dropzone>
                <FormItem errorMessage={errors.win_rate?.message}>
                  <label htmlFor='win_rate'>Win Rate</label>
                  <StyledInput
                    type='number'
                    className='block rounded-lg border-2 bg-gray-300 p-2 dark:bg-gray-900'
                    {...register('win_rate', {
                      required: 'Win rate harus diisi',
                      pattern: {
                        value: /^(\d{0,2}(\.\d{1,2})?|100(\.00?)?)$/,
                        message:
                          'Win rate haruslah di antara 0 - 100 dan maksimum 2 desimal di belakang koma',
                      },
                    })}
                  />
                </FormItem>
                <FormItem errorMessage={errors.total_hero?.message}>
                  <label htmlFor='total_hero'>Total hero</label>
                  <StyledInput
                    type='number'
                    className='block rounded-lg border-2 bg-gray-300 p-2 dark:bg-gray-900'
                    {...register('total_hero', {
                      required: 'Total hero harus diisi',
                      min: {
                        value: 1,
                        message: 'Minimum jumlah hero adalah 1',
                      },
                    })}
                  />
                </FormItem>
                <FormItem errorMessage={errors.total_skin?.message}>
                  <label htmlFor='total_skin'>Total skin</label>
                  <StyledInput
                    type='number'
                    className='block rounded-lg border-2 bg-gray-300 p-2 dark:bg-gray-900'
                    {...register('total_skin', {
                      required: 'Total skin harus diisi',
                      min: {
                        value: 0,
                        message: 'Minimum jumlah skin adalah 0',
                      },
                    })}
                  />
                </FormItem>
                <div className='flex items-center justify-center'>
                  <Button type='submit'>Submit</Button>
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
      </AnimatePage>
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
