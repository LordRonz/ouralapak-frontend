import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaPencilAlt } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';
import Lightbox from 'react-image-lightbox';
import { Tooltip } from 'react-tippy';
import { toast } from 'react-toastify';
import { useLocalStorage } from 'react-use';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useSWR from 'swr';

import ButtonGradient from '@/components/buttons/ButtonGradient';
import EditButton from '@/components/Common/EditButton';
import Breadcrumbs from '@/components/Common/PageTitle';
import XButton from '@/components/Common/XButton';
import DragDropSection from '@/components/Upload/DragDropSection';
import { API_URL } from '@/constant/config';
import { mySwalOpts } from '@/constant/swal';
import clsxm from '@/lib/clsxm';
import useAuthHeader from '@/services/authHeader';
import User from '@/types/user';

import Button from '../buttons/Button';

type IFormInput = {
  name?: string;
  phone?: string;
  ig_username?: string;
  password?: string;
  confirm_password?: string;
};

const MySwal = withReactContent(Swal);

const ProfileMain = () => {
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

  const [identityCard, setIdentityCard] = useState<File | File[] | null>(null);
  const [identityCardValidation, setIdentityCardValidation] = useState<
    File | File[] | null
  >(null);

  // const [openDialog, setOpenDialog] = useState(false);
  // const [profilePic, setProfilePic] = useState<File | File[] | null>(null);

  const { data: user, mutate } = useSWR<{
    data: User;
    message: string;
    success: boolean;
  }>(() => `${API_URL}/profile`);

  const headers = useAuthHeader();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!headers.Authorization) {
      return;
    }
    const { password, confirm_password, ...profileData } = data;
    const passwordData = { password, confirm_password };
    await toast.promise(
      Promise.all([
        ...(data.name ?? data.ig_username ?? data.phone
          ? [axios.put(`${API_URL}/profile`, profileData, { headers })]
          : []),
        ...(data.password && data.confirm_password
          ? [
              axios.put(`${API_URL}/profile/password`, passwordData, {
                headers,
              }),
            ]
          : []),
      ]),
      {
        pending: {
          render: () => {
            setUpdateBtnDisabled(true);
            return 'Loading';
          },
        },
        success: {
          render: () => {
            setUpdateBtnDisabled(false);
            mutate();
            return 'Berhasil update profil';
          },
        },
        error: {
          render: () => {
            setUpdateBtnDisabled(false);
            return 'Gagal update profil!';
          },
        },
      }
    );
  };

  const { theme } = useTheme();
  const [, , removeToken] = useLocalStorage('token');

  const router = useRouter();

  const handleLogout = async () => {
    const { isConfirmed } = await MySwal.fire({
      title: 'Yakin ingin logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      ...mySwalOpts(theme),
    });
    if (isConfirmed) {
      removeToken();
      router.push('/login');
    }
  };

  return (
    <main>
      <Breadcrumbs
        breadcrumbTitle='Informasi Profil'
        breadcrumbSubTitle='Informasi Profil'
      />

      <section className='creator-info-area pb-90'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-3 col-md-8'>
              <div className='creator-info-details wow fadeInUp mb-40'>
                <div className='creator-img-name'>
                  <div className='profile-img pos-rel'>
                    <img
                      src={
                        user?.data.profile_picture
                          ? `${API_URL}${user.data.profile_picture}`
                          : `https://robohash.org/${
                              user?.data.username || 'AMOGUS'
                            }?set=set4`
                      }
                      alt='profile-img'
                    />
                  </div>
                  <Tooltip
                    trigger='click'
                    interactive
                    position='right-end'
                    html={
                      <div className='flex flex-col'>
                        <Button className='px-1 text-xs'>Upload Foto</Button>
                        <Button className='bg-rose-400 text-xs hover:bg-rose-500'>
                          Hapus Foto
                        </Button>
                      </div>
                    }
                  >
                    <button className='rounded-full p-1 ring-2 ring-primary-200'>
                      <FaPencilAlt className='text-xl' />
                    </button>
                  </Tooltip>
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
                <div className='profile-setting-list'>
                  <ul>
                    <li
                      className={clsxm(
                        router.pathname === '/profile' && 'active'
                      )}
                    >
                      <Link href='/profile'>
                        <a>
                          <i className='flaticon-account'></i>Profil
                        </a>
                      </Link>
                    </li>
                    <li
                      className={clsxm(
                        router.pathname === '/seller' && 'active'
                      )}
                    >
                      <Link href='/seller'>
                        <a>
                          <i className='flaticon-newspaper'></i>Iklan
                        </a>
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => handleLogout()}
                        className='space-x-4 hover:text-primary-500'
                      >
                        <i className='flaticon-logout'></i>
                        <span>Log Out</span>
                      </button>
                    </li>
                  </ul>
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
                            {...register('phone', {
                              // pattern: {
                              //   value:
                              //     /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/,
                              //   message: 'Nomor telepon tidak valid!',
                              // },
                            })}
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
                      <DragDropSection
                        file={identityCard}
                        setFile={setIdentityCard}
                        title='Gambar kartu identitas'
                        note='Format gambar | Max 20 MB'
                      />
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
                      <DragDropSection
                        file={identityCardValidation}
                        setFile={setIdentityCardValidation}
                        title='Gambar kartu identitas + selfie'
                        note='Format gambar | Max 20 MB'
                      />
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
                  <div className='personal-info-btn mt-4'>
                    <ButtonGradient
                      type='submit'
                      className='text-black'
                      disabled={updateBtnDisabled}
                    >
                      Update Profil
                    </ButtonGradient>
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

export default ProfileMain;
