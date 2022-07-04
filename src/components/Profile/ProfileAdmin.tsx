import axios from 'axios';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiEye } from 'react-icons/fi';
import Lightbox from 'react-image-lightbox';
import { toast } from 'react-toastify';
import useSWR from 'swr';

import ButtonGradient from '@/components/buttons/ButtonGradient';
import EditButton from '@/components/Common/EditButton';
import XButton from '@/components/Common/XButton';
import { API_URL } from '@/constant/config';
import useAuthHeader from '@/services/authHeader';
import User from '@/types/user';

type IFormInput = {
  name?: string;
  phone?: string;
  ig_username?: string;
  password?: string;
  confirm_password?: string;
};

const ProfileAdmin = ({ id }: { id: number }) => {
  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInput>();

  const [toggleEditPassword, setToggleEditPassword] = useState(false);
  const [updateBtnDisabled, setUpdateBtnDisabled] = useState(false);

  const [previewIdCard, setPreviewIdCard] = useState(false);
  const [previewIdCardValidation, setPreviewIdCardValidation] = useState(false);

  const [identityCard] = useState<File | File[] | null>(null);
  const [identityCardValidation] = useState<File | File[] | null>(null);

  const { data: user } = useSWR<{
    data: User;
    message: string;
    success: boolean;
  }>(() => `${API_URL}/admin/user/${id}`);

  const headers = useAuthHeader();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!headers.Authorization) {
      return;
    }
    await toast.promise(axios.put(`${API_URL}/profile`, data, { headers }), {
      pending: {
        render: () => {
          setUpdateBtnDisabled(true);
          return 'Loading';
        },
      },
      success: {
        render: () => {
          setUpdateBtnDisabled(false);
          return 'Berhasil update profil';
        },
      },
      error: {
        render: () => {
          setUpdateBtnDisabled(false);
          return 'Gagal update profil!';
        },
      },
    });
  };

  return (
    <main>
      <section className='creator-info-area pb-90'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-3 col-md-8'>
              <div className='creator-info-details wow fadeInUp mb-40'>
                <div className='creator-img-name'>
                  <div className='creator-name-id'>
                    <h4 className='artist-name pos-rel'>
                      {user?.data.name}
                      {user?.data.is_verified && (
                        <span className='profile-verification verified'>
                          <i className='fas fa-check'></i>
                        </span>
                      )}
                    </h4>
                    <div className='artist-id'>@{user?.data.username}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-8'>
              <div className='creator-info-personal wow fadeInUp mb-40'>
                <form
                  className='personal-info-form'
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='single-input-unit'>
                        <label>Nama</label>
                        {user && (
                          <input
                            type='text'
                            defaultValue={user?.data.name}
                            {...register('name')}
                          />
                        )}
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='single-input-unit'>
                        <label>Nomor Telepon</label>
                        {user && (
                          <input
                            type='text'
                            defaultValue={user?.data.phone}
                            {...register('phone', {})}
                          />
                        )}
                        <p className='text-red-500'>{errors.phone?.message}</p>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='single-input-unit'>
                        <label>Username IG</label>
                        {user && (
                          <input
                            type='text'
                            defaultValue={user?.data.ig_username}
                            {...register('ig_username')}
                          />
                        )}
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <h3 className='text-lg'>
                        Edit password{' '}
                        {toggleEditPassword ? (
                          <XButton
                            onClick={() => {
                              setToggleEditPassword(false);
                              unregister('password');
                              unregister('confirm_password');
                            }}
                          />
                        ) : (
                          <EditButton
                            onClick={() => setToggleEditPassword(true)}
                          />
                        )}
                      </h3>
                      {toggleEditPassword && (
                        <>
                          <div>
                            <div className='single-input-unit'>
                              <label htmlFor='password'>Password</label>
                              <input
                                type='password'
                                placeholder='Password anda'
                                {...register('password', {
                                  required: 'Password harus diisi!',
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
                          <div>
                            <div className='single-input-unit'>
                              <label htmlFor='confirm_password'>
                                Konfirmasi Password
                              </label>
                              <input
                                type='password'
                                placeholder='Konfirmasi password anda'
                                {...register('confirm_password', {
                                  required: 'Konfirmasi password anda!',
                                  validate: (val?: string) => {
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
                        </>
                      )}
                    </div>
                    <div className='col-md-6'>
                      <ButtonGradient
                        className='flex items-center justify-center gap-x-2 px-4 text-white'
                        disabled={updateBtnDisabled}
                        onClick={() => setPreviewIdCardValidation(true)}
                        variant='secondary'
                      >
                        <FiEye /> Lihat gambar
                      </ButtonGradient>
                      {previewIdCard && (
                        <Lightbox
                          mainSrc={URL.createObjectURL(identityCard as File)}
                          onCloseRequest={() => setPreviewIdCard(false)}
                        />
                      )}
                    </div>
                    <div className='col-md-6'>
                      <ButtonGradient
                        className='flex items-center justify-center gap-x-2 px-4 text-white'
                        disabled={updateBtnDisabled}
                        onClick={() => setPreviewIdCardValidation(true)}
                        variant='secondary'
                      >
                        <FiEye /> Lihat gambar
                      </ButtonGradient>
                      {previewIdCardValidation && (
                        <Lightbox
                          mainSrc={URL.createObjectURL(
                            identityCardValidation as File
                          )}
                          onCloseRequest={() =>
                            setPreviewIdCardValidation(false)
                          }
                        />
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfileAdmin;
