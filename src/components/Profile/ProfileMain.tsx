import axios from 'axios';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiEye } from 'react-icons/fi';
import PhoneInput, {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from 'react-phone-number-input';
import { toast } from 'react-toastify';
import { useLocalStorage } from 'react-use';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useSWR from 'swr';

import ButtonGradient from '@/components/buttons/ButtonGradient';
import Breadcrumbs from '@/components/Common/PageTitle';
import InputFile from '@/components/Profile/InputFile';
import ProfileCard from '@/components/Profile/ProfileCard';
import { API_URL } from '@/constant/config';
import { mySwalOpts } from '@/constant/swal';
import toastPromiseError from '@/lib/toastPromiseError';
import useAuthHeader from '@/services/authHeader';
import User from '@/types/user';

type IFormInput = {
  name?: string;
  ig_username?: string;
  password?: string;
  confirm_password?: string;
};

const MySwal = withReactContent(Swal);

const ProfileMain = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInput>();

  const [updateBtnDisabled, setUpdateBtnDisabled] = useState(false);
  const [passwordInputType, setPasswordInputType] = useState<
    'password' | 'text'
  >('password');
  const [passwordConfirmationInputType, setPasswordConfirmationInputType] =
    useState<'password' | 'text'>('password');
  const [phone, setPhone] = useState<string>();

  // const [previewIdCard, setPreviewIdCard] = useState(false);
  // const [previewIdCardValidation, setPreviewIdCardValidation] = useState(false);

  const [identityCard, setIdentityCard] = useState<File | null>(null);
  const [identityCardValidation, setIdentityCardValidation] =
    useState<File | null>(null);
  const [identityCardValidationMask, setIdentityCardValidationMask] =
    useState<File | null>(null);

  // const [openDialog, setOpenDialog] = useState(false);
  // const [profilePic, setProfilePic] = useState<File | File[] | null>(null);

  const { data: user, mutate } = useSWR<{
    data: User;
    message: string;
    success: boolean;
  }>(() => `${API_URL}/profile`);

  useEffect(() => {
    setPhone(user?.data.phone);
  }, [user]);

  const headers = useAuthHeader();

  const setProfilePicture = (f: FileList) => {
    const profilePic = f[0];
    if (!profilePic || !headers.Authorization) {
      return;
    }
    const form = new FormData();
    if (Array.isArray(profilePic)) {
      profilePic.forEach((v) => form.append('profile_picture', v));
    } else {
      form.append('profile_picture', profilePic);
    }
    (async () => {
      await toast.promise(axios.put(`${API_URL}/profile`, form, { headers }), {
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
            return 'Berhasil update gambar profile';
          },
        },
        error: {
          render: toastPromiseError(() => {
            setUpdateBtnDisabled(false);
          }, 'Gagal update gambar profile!'),
        },
      });
    })();
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!headers.Authorization) {
      return;
    }

    const identityForm = new FormData();
    if (identityCard) {
      identityForm.append('identity_card', identityCard);
    }
    if (identityCardValidation) {
      identityForm.append('identity_card_validation', identityCardValidation);
    }
    if (identityCardValidationMask) {
      identityForm.append(
        'identity_card_validation_mask',
        identityCardValidationMask
      );
    }
    const { password, confirm_password, ...profileData } = data;
    const passwordData = { password, confirm_password };
    await toast.promise(
      Promise.all([
        ...(data.name ?? data.ig_username ?? phone
          ? [
              axios.put(
                `${API_URL}/profile`,
                { profileData, ...(phone && { phone }) },
                { headers }
              ),
            ]
          : []),
        ...(data.password && data.confirm_password
          ? [
              axios.put(`${API_URL}/profile/password`, passwordData, {
                headers,
              }),
            ]
          : []),
        ...(identityCard || identityCardValidation || identityCardValidationMask
          ? [
              axios.put(`${API_URL}/profile/identity`, identityForm, {
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
          render: toastPromiseError(() => {
            setUpdateBtnDisabled(false);
          }, 'Gagal update profil!'),
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
      <div className='creator-cover-img pos-rel mt-4'>
        <img src='images/banner_cover.png' alt='cover-img' />
      </div>
      <section className='creator-info-area pb-90 pt-40'>
        <div className='px-16'>
          <div className='row'>
            <div className='col-lg-4'>
              <ProfileCard
                user={user?.data}
                handleLogout={handleLogout}
                withEdit
                setFile={setProfilePicture}
              />
            </div>
            <div className='col-lg-8'>
              <div className='absolute top-36 flex flex-col'>
                <div className='flex'>
                  <h4 className='artist-name relative text-2xl text-white'>
                    {user?.data.name}
                    {!!user?.data.is_verified && (
                      <span className='profile-verification verified !right-[-30px]'>
                        <i className='fas fa-check' />
                      </span>
                    )}
                  </h4>
                </div>
                <div className='artist-id text-white'>
                  @{user?.data.username}
                </div>
              </div>
              <div className='creator-info-personal wow fadeInUp mb-40 rounded-xl bg-white px-3 py-3 dark:!bg-[#1c2434]'>
                <h1 className='mb-4 text-3xl text-[#B89C74]'>Profile</h1>
                <form
                  className='personal-info-form'
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className='row gap-y-6'>
                    <div className='row gap-y-6'>
                      <h2 className='m-0 text-xl font-normal'>Umum</h2>
                      <div className='mx-[12px] w-1 border border-black' />
                      <div className='col-md-12'>
                        <div className='single-input-unit'>
                          <label className='!font-normal'>Nama</label>
                          {user && (
                            <input
                              type='text'
                              defaultValue={user?.data.name}
                              className='rounded-lg border'
                              {...register('name')}
                            />
                          )}
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='single-input-unit'>
                          <label className='!font-normal'>Email</label>
                          {user && (
                            <input
                              type='text'
                              defaultValue={user?.data.email}
                              className='rounded-lg border disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:dark:bg-neutral-700'
                              disabled
                            />
                          )}
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='single-input-unit'>
                          <label htmlFor='phone' className='!font-normal'>
                            No. Handphone
                          </label>
                          <PhoneInput
                            defaultCountry='ID'
                            placeholder='Masukkan No. Handphone'
                            value={phone}
                            onChange={setPhone}
                            error={
                              phone
                                ? isValidPhoneNumber(phone)
                                  ? undefined
                                  : 'Invalid phone number'
                                : 'Phone number required'
                            }
                            className='rounded-lg border pl-[20px]'
                          />
                        </div>
                        <p className='text-red-500'>
                          {phone &&
                            !isPossiblePhoneNumber(phone) &&
                            'Nomor telepon tidak valid'}
                        </p>
                      </div>
                      <div className='col-md-6'>
                        <div className='single-input-unit'>
                          <label className='!font-normal'>Username</label>
                          {user && (
                            <input
                              type='text'
                              defaultValue={user?.data.username}
                              className='rounded-lg border disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:dark:bg-neutral-700'
                              disabled
                            />
                          )}
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='single-input-unit'>
                          <label className='!font-normal'>
                            Username Instagram
                          </label>
                          {user && (
                            <input
                              type='text'
                              defaultValue={user?.data.ig_username}
                              {...register('ig_username')}
                              className='rounded-lg border'
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='row !mt-8 gap-y-6'>
                      <h2 className='m-0 text-xl font-normal'>
                        Verifikasi Akun
                      </h2>
                      <div className='mx-[12px] w-1 border border-black' />
                      <div className='col-md-6 space-y-4'>
                        <label className='text-black dark:!text-white'>
                          Kartu Identitas (2 buah)
                        </label>
                        <img
                          src={`${API_URL}/${user?.data.identity_card}`}
                          alt=''
                        />
                        <InputFile
                          type='file'
                          onChange={(e) =>
                            e.target.files && setIdentityCard(e.target.files[0])
                          }
                          fileName={identityCard?.name}
                        />
                      </div>
                      <div className='col-md-6 space-y-4'>
                        <label className=' text-black dark:!text-white'>
                          Kartu Identitas + Selfie
                        </label>
                        <img
                          src={`${API_URL}/${user?.data.identity_card_validation}`}
                          alt=''
                        />
                        <InputFile
                          type='file'
                          onChange={(e) =>
                            e.target.files &&
                            setIdentityCardValidation(e.target.files[0])
                          }
                          fileName={identityCardValidation?.name}
                        />
                      </div>
                      <div className='col-md-6 space-y-4'>
                        <label className=' text-black dark:!text-white'>
                          Kartu Identitas + Tulisan Ouralapak
                        </label>
                        <img
                          src={`${API_URL}/${user?.data.identity_card_validation_mask}`}
                          alt=''
                        />
                        <InputFile
                          type='file'
                          onChange={(e) =>
                            e.target.files &&
                            setIdentityCardValidationMask(e.target.files[0])
                          }
                          fileName={identityCardValidationMask?.name}
                        />
                      </div>
                      {/* <div className='col-md-6'>
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
                      </div> */}
                    </div>
                    <div className='row !mt-8 gap-y-6'>
                      <h2 className='m-0 text-xl font-normal'>Ubah Password</h2>
                      <div className='mx-[12px] w-1 border border-black' />
                      <div className='col-md-6'>
                        <div className='single-input-unit'>
                          <label className='!font-normal'>
                            Kata sandi baru
                          </label>
                          {user && (
                            <div className='flex items-center'>
                              <input
                                type={passwordInputType}
                                className='rounded-lg border'
                                {...register('password', {
                                  minLength: {
                                    value: 8,
                                    message:
                                      'Password harus berisi setidaknya 8 karakter',
                                  },
                                })}
                                defaultValue=''
                                autoComplete='off'
                                aria-autocomplete='none'
                              />
                              <div
                                className='flex h-[50px] !w-8 items-center justify-center rounded-r-[5px] bg-[rgba(30,_83,_163,_0.13)]'
                                onClick={() =>
                                  setPasswordInputType((v) =>
                                    v === 'password' ? 'text' : 'password'
                                  )
                                }
                              >
                                <FiEye />
                              </div>
                            </div>
                          )}
                        </div>
                        <p className='text-red-500'>
                          {errors.password?.message}
                        </p>
                      </div>
                      <div className='col-md-6'>
                        <div className='single-input-unit'>
                          <label className='!font-normal'>
                            Ulangi kata sandi baru
                          </label>
                          {user && (
                            <div className='flex items-center'>
                              <input
                                type={passwordConfirmationInputType}
                                className='inline !rounded-r-none border'
                                {...register('confirm_password', {
                                  validate: (val?: string) => {
                                    if (watch('password') != val) {
                                      return 'Konfirmasi password tidak sesuai!';
                                    }
                                  },
                                })}
                                defaultValue=''
                                autoComplete='off'
                                aria-autocomplete='none'
                              />
                              <div
                                className='flex h-[50px] !w-8 items-center justify-center rounded-r-[5px] bg-[rgba(30,_83,_163,_0.13)]'
                                onClick={() =>
                                  setPasswordConfirmationInputType((v) =>
                                    v === 'password' ? 'text' : 'password'
                                  )
                                }
                              >
                                <FiEye />
                              </div>
                            </div>
                          )}
                        </div>
                        <p className='text-red-500'>
                          {errors.confirm_password?.message}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='personal-info-btn mt-4'>
                    <ButtonGradient
                      type='submit'
                      className='w-full text-white'
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
