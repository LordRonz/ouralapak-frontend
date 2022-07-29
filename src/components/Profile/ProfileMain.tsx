import axios from 'axios';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
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
import EditButton from '@/components/Common/EditButton';
import Breadcrumbs from '@/components/Common/PageTitle';
import XButton from '@/components/Common/XButton';
import ProfileCard from '@/components/Profile/ProfileCard';
import { API_URL } from '@/constant/config';
import { mySwalOpts } from '@/constant/swal';
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
    unregister,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInput>();

  const [toggleEditPassword, setToggleEditPassword] = useState(false);
  const [updateBtnDisabled, setUpdateBtnDisabled] = useState(false);
  const [phone, setPhone] = useState<string>();

  // const [previewIdCard, setPreviewIdCard] = useState(false);
  // const [previewIdCardValidation, setPreviewIdCardValidation] = useState(false);

  const [identityCard, setIdentityCard] = useState<File | null>(null);
  const [identityCardValidation, setIdentityCardValidation] =
    useState<File | null>(null);

  // const [openDialog, setOpenDialog] = useState(false);
  // const [profilePic, setProfilePic] = useState<File | File[] | null>(null);

  const { data: user, mutate } = useSWR<{
    data: User;
    message: string;
    success: boolean;
  }>(() => `${API_URL}/profile`);

  console.log(user);

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
          render: (e) => {
            setUpdateBtnDisabled(false);
            return (
              (e?.data?.response?.data.message as string) ||
              'Gagal update gambar profile!'
            );
          },
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
        ...(identityCard || identityCardValidation
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
          render: (e) => {
            setUpdateBtnDisabled(false);
            return (
              (e?.data?.response?.data.message as string) ||
              'Gagal update profil!'
            );
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

      <section className='creator-info-area pb-90 pt-60'>
        <div className='container'>
          <div className='row'>
            <ProfileCard
              user={user?.data}
              handleLogout={handleLogout}
              withEdit
              setFile={setProfilePicture}
            />
            <div className='col-lg-8'>
              <div className='creator-info-personal wow fadeInUp mb-40'>
                <form
                  className='personal-info-form'
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className='row gap-y-6'>
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
                        <label htmlFor='phone'>No. Handphone</label>
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
                    <div className='col-md-6 space-y-4'>
                      <label className='font-bold text-black'>
                        Kartu Identitas
                      </label>
                      <img
                        src={`${API_URL}/${user?.data.identity_card}`}
                        alt=''
                      />
                      <input
                        type='file'
                        onChange={(e) =>
                          e.target.files && setIdentityCard(e.target.files[0])
                        }
                      />
                    </div>
                    <div className='col-md-6 space-y-4'>
                      <label className='font-bold text-black'>
                        Kartu Identitas + Selfie
                      </label>
                      <img
                        src={`${API_URL}/${user?.data.identity_card_validation}`}
                        alt=''
                      />
                      <input
                        type='file'
                        onChange={(e) =>
                          e.target.files &&
                          setIdentityCardValidation(e.target.files[0])
                        }
                      />
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
