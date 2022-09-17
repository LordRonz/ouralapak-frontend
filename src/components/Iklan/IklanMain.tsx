import axios from 'axios';
import { add } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { stringifyUrl } from 'query-string';
import React, { ReactChild, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FaPhoneAlt } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';
import Lightbox from 'react-image-lightbox';
import PhoneInput, {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from 'react-phone-number-input';
import { Carousel } from 'react-responsive-carousel';
import Modal from 'react-responsive-modal';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useLifecycles, useSessionStorage } from 'react-use';
import useSWR from 'swr';

import Button from '@/components/buttons/Button';
import ButtonGradient from '@/components/buttons/ButtonGradient';
import IklanCardSingle from '@/components/Cards/IklanCardSingle';
import Captcha from '@/components/Common/Captcha';
import Breadcrumbs from '@/components/Common/PageTitle';
import Spinner from '@/components/Common/Spinner';
import XButton from '@/components/Common/XButton';
import ErrorPageMain from '@/components/ErrorPage/ErrorPageMain';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import { API_URL } from '@/constant/config';
import { customSelectStyles } from '@/constant/select';
import clsxm from '@/lib/clsxm';
import getAuthHeader from '@/lib/getAuthHeader';
import { calculateTimeLeft } from '@/lib/timeStuff';
import toastPromiseError from '@/lib/toastPromiseError';
import toIDRCurrency from '@/lib/toIDRCurrency';
import TrophyGreen from '@/svgs/trophy_green.svg';
import Bank from '@/types/bank';
import { IklanDetail, IklanHome } from '@/types/iklan';
import { InvoicePembeli } from '@/types/invoice';
import Pagination from '@/types/pagination';
import Refund from '@/types/refund';

type IFormInput = {
  jenis_pembayaran: number;
  nama: string;
  email: string;
  phone: string;
  token: string;
};

type CarouselNode = {
  key: null;
  type: string;
  props: {
    children?: CarouselNode[];
    alt?: string;
    src?: string;
  };
};

const IklanMain = ({ id }: { id: number }) => {
  const { data: iklan, error } = useSWR<{
    data: IklanDetail;
    message: string;
    success: boolean;
  }>(`${API_URL}${getAuthHeader() ? '/user' : ''}/iklan/${id}`);

  const { data: iklans } = useSWR<{
    data: { data: IklanHome[]; pagination: Pagination };
    message: string;
    success: boolean;
  }>(
    stringifyUrl({
      url: `${API_URL}/iklan`,
      query: {
        perPage: 4,
      },
    })
  );

  const { data: refund } = useSWR<{
    data: { data: Refund[]; pagination: Pagination };
    message: string;
    success: boolean;
  }>(
    stringifyUrl({
      url: `${API_URL}/master/refund`,
      query: {
        perPage: 200,
      },
    })
  );

  const [open, setOpen] = useState(false);
  const [previewCarousel, setPreviewCarousel] = useState<boolean>(false);
  const [carouselImg, setCarouselImg] = useState<string>();
  const [timeLeft, setTimeLeft] = useState<Duration>();
  const [endVerifyDisable, setEndVerifyDisable] = useState<Date>();

  const [verifyEmailData, setVerifyEmailData] = useSessionStorage<
    { hasClicked?: boolean; end?: Date } | undefined
  >('emailData');

  useEffect(() => {
    if (!endVerifyDisable) {
      return;
    }
    if (new Date() >= endVerifyDisable) {
      setEndVerifyDisable(undefined);
      setTimeLeft(undefined);
      return;
    }
    const intervalId = setInterval(() => {
      const resDur = calculateTimeLeft(endVerifyDisable);
      if (resDur.seconds === undefined && resDur.minutes === undefined) {
        setEndVerifyDisable(undefined);
        setTimeLeft(undefined);
        const newData = verifyEmailData;
        delete newData?.end;
        setVerifyEmailData(newData);
      } else {
        setTimeLeft(resDur);
      }
    }, 500);
    return () => {
      clearInterval(intervalId);
    };
  }, [endVerifyDisable, setVerifyEmailData, verifyEmailData]);

  useLifecycles(() => {
    if (verifyEmailData?.end) {
      setEndVerifyDisable(new Date(verifyEmailData.end));
    }
  });

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IFormInput>();

  const router = useRouter();

  const [beliBtnDisabled, setBeliBtnDisabled] = React.useState(false);
  const [recaptchaResponse, setRecaptchaResponse] = useState<string | null>(
    null
  );

  const [phone, setPhone] = useState<string>();

  const { data: banks } = useSWR<{
    data: { data: Bank[]; pagination: Pagination };
    message: string;
    success: boolean;
  }>(
    stringifyUrl({
      url: `${API_URL}/master/bank`,
      query: {
        perPage: 696969,
        transaction: 1,
      },
    })
  );

  const jenisPembayaranOpts = banks?.data.data.map((b) => ({
    value: b.id,
    label: b.name,
  }));

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!phone || (phone && !isPossiblePhoneNumber(phone))) {
      return;
    }

    if (!recaptchaResponse) {
      toast.warn('Captcha harus diselesaikan');
      return;
    }
    const res = await toast.promise(
      axios.post<{ data: InvoicePembeli; message: string; success: boolean }>(
        stringifyUrl({
          url: `${API_URL}/invoice/${id}`,
        }),
        { ...data, phone: phone?.replace('+', '') },
        { headers: { recaptcha_response: recaptchaResponse } }
      ),
      {
        pending: {
          render: () => {
            setBeliBtnDisabled(true);
            return 'Loading';
          },
        },
        success: {
          render: () => {
            setBeliBtnDisabled(false);
            router.push(`/invoice-beli/${res.data.data.no_invoice}`);
            return 'Berhasil beli, menuju laman invoice';
          },
        },
        error: {
          render: toastPromiseError(() => {
            setBeliBtnDisabled(false);
          }, 'Gagal beli akun!'),
        },
      }
    );
    console.log(res);
  };

  const verifyEmail = async () => {
    const email = getValues('email');
    if (!email) {
      return;
    }
    await toast.promise(
      axios.post(
        stringifyUrl({
          url: `${API_URL}/auth/verify-email`,
        }),
        { email }
      ),
      {
        pending: {
          render: () => {
            return 'Loading';
          },
        },
        success: {
          render: () => {
            const tempEnd = add(new Date(), { seconds: 60 });
            setEndVerifyDisable(tempEnd);
            setVerifyEmailData({
              ...verifyEmailData,
              hasClicked: true,
              end: tempEnd,
            });
            return 'Silahkan cek email!';
          },
        },
        error: {
          render: toastPromiseError(() => {
            // setBeliBtnDisabled(false);
          }, 'Gagal verifikasi email!'),
        },
      }
    );
  };

  const getRefundById = (id: string | number) => {
    if (!refund) return '';
    const res = refund.data.data.find((x) => +x.id === +id);
    return res?.name ?? '';
  };

  if (error) {
    return <ErrorPageMain />;
  }

  if (!jenisPembayaranOpts?.[0] || !iklan || !iklans) {
    return <Spinner />;
  }

  return (
    <main>
      <Breadcrumbs breadcrumbSubTitle={iklan.data.title} />

      <section className='art-details-area bg-white pt-8 dark:!bg-dark'>
        <div className='container'>
          <div className='art-details-wrapper'>
            <div className='row'>
              <div className='col-xl-6 col-lg-3'>
                <Carousel
                  infiniteLoop
                  dynamicHeight={true}
                  onClickItem={(i, item) => {
                    const it = item as CarouselNode;
                    setCarouselImg(it.props.children?.[0].props.src);
                    setPreviewCarousel(true);
                  }}
                  className='hover:cursor-zoom-in'
                >
                  <div>
                    <img
                      src={
                        iklan.data.image_profile
                          ? `${API_URL}/${iklan.data.image_profile}`
                          : ``
                      }
                      alt='profile-img'
                    />
                    <p className='legend'>Profile Image</p>
                  </div>
                  <div>
                    <img
                      src={
                        iklan.data.image_win_rate
                          ? `${API_URL}/${iklan.data.image_win_rate}`
                          : ``
                      }
                      alt='profile-img'
                    />
                    <p className='legend'>Win Rate</p>
                  </div>
                  <div>
                    <img
                      src={
                        iklan.data.image_win_rate_hero
                          ? `${API_URL}/${iklan.data.image_win_rate_hero}`
                          : ``
                      }
                      alt='profile-img'
                    />
                    <p className='legend'>Win Rate Hero</p>
                  </div>
                  <div>
                    <img
                      src={
                        iklan.data.image_emblem
                          ? `${API_URL}/${iklan.data.image_emblem}`
                          : ``
                      }
                      alt='profile-img'
                    />
                    <p className='legend'>Emblem</p>
                  </div>
                  {
                    iklan.data.image_skin.map((skinImg, i) => (
                      <div key={`skinImg_${i}`}>
                        <img
                          src={skinImg ? `${API_URL}/${skinImg}` : ``}
                          alt='profile-img'
                        />
                        <p className='legend'>Skin {i}</p>
                      </div>
                    )) as unknown as ReactChild
                  }
                </Carousel>
                {previewCarousel && carouselImg && (
                  <Lightbox
                    mainSrc={carouselImg}
                    onCloseRequest={() => setPreviewCarousel(false)}
                  />
                )}
              </div>
              <div className='col-xl-6 col-lg-7 pb-6'>
                <div className='art-details-content wow fadeInUp px-1 md:px-6'>
                  <div className='flex items-center space-x-8'>
                    <div className='flex w-full justify-between'>
                      <div>
                        <div className='created-by mb-2'>Created by</div>
                        <div className='creator mb-30'>
                          <div className='profile-img relative'>
                            <UnstyledLink
                              href={`https://instagram.com/${iklan.data.user.ig_username}`}
                            >
                              <Image
                                src={
                                  iklan.data.user?.profile_picture
                                    ? `${API_URL}/${iklan.data.user?.profile_picture}`
                                    : `/images/pfp.jpg`
                                }
                                className='h-16 w-16 rounded-full object-cover'
                                alt='profile-img'
                                height={64}
                                width={64}
                              />
                            </UnstyledLink>
                            <div className='profile-verification verified'>
                              <i className='fas fa-check'></i>
                            </div>
                          </div>
                          <div className='creator-name-id'>
                            <h4 className='artist-name'>
                              <UnstyledLink
                                href={`https://instagram.com/${iklan.data.user.ig_username}`}
                              >
                                <a>{iklan.data.user.name}</a>
                              </UnstyledLink>
                            </h4>
                            <div className='flex items-center justify-center gap-x-1'>
                              <span>
                                <FiInstagram />
                              </span>
                              <span>
                                {iklan.data.user.username.startsWith('@')
                                  ? ''
                                  : '@' + iklan.data.user.username}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='mt-50 mb-30 flex items-center gap-x-2'>
                        <Modal
                          open={open}
                          onClose={onCloseModal}
                          center
                          classNames={{
                            modal: 'rounded-xl p-0 overflow-y-auto',
                            root: 'overflow-y-auto',
                            modalContainer: 'overflow-y-auto',
                          }}
                          closeIcon={<XButton />}
                        >
                          <div className='row justify-content-center gap-y-6'>
                            <div className='login-wrapper wow fadeInUp relative'>
                              <div className=' login-inner px-3 md:p-0'>
                                <div className='login-content'>
                                  <h4>Beli Akun</h4>
                                  <form
                                    className='login-form'
                                    onSubmit={handleSubmit(onSubmit)}
                                  >
                                    <div className='row'>
                                      <div className='col-md-12'>
                                        <div className='single-input-unit'>
                                          <label htmlFor='email'>Nama</label>
                                          <input
                                            type='text'
                                            placeholder='Nama Anda'
                                            autoFocus
                                            {...register('nama', {
                                              required: 'Nama harus diisi',
                                            })}
                                          />
                                        </div>
                                        <p className='text-red-500'>
                                          {errors.nama?.message}
                                        </p>
                                      </div>
                                      <div className='col-md-12'>
                                        <div className='single-input-unit'>
                                          <label htmlFor='email'>Email</label>
                                          <div className='flex gap-x-1'>
                                            <input
                                              type='email'
                                              id='email'
                                              placeholder='Email Anda'
                                              {...register('email', {
                                                required: 'Email harus diisi',
                                                pattern: {
                                                  value:
                                                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                  message: 'Email tidak valid!',
                                                },
                                              })}
                                            />
                                            <Button
                                              onClick={() => verifyEmail()}
                                              disabled={
                                                !!(endVerifyDisable && timeLeft)
                                              }
                                            >
                                              {endVerifyDisable && timeLeft ? (
                                                <span className='text-red-600'>{`${timeLeft?.minutes
                                                  ?.toString()
                                                  .padStart(
                                                    2,
                                                    '0'
                                                  )}:${timeLeft?.seconds
                                                  ?.toString()
                                                  .padStart(2, '0')}`}</span>
                                              ) : (
                                                'Verifikasi'
                                              )}
                                            </Button>
                                          </div>
                                        </div>
                                        <p className='text-red-500'>
                                          {errors.email?.message}
                                        </p>
                                      </div>
                                      {verifyEmailData?.hasClicked && (
                                        <div className='col-md-12'>
                                          <div className='single-input-unit'>
                                            <label htmlFor='token'>
                                              Kode Verifikasi
                                            </label>
                                            <div className='flex gap-x-1'>
                                              <input
                                                id='token'
                                                placeholder='Masukkan Kode Verifikasi'
                                                {...register('token', {
                                                  required: 'Token harus diisi',
                                                  pattern: {
                                                    value: /^[0-9]{1,69}$/,
                                                    message:
                                                      'Token tidak valid!',
                                                  },
                                                })}
                                              />
                                            </div>
                                          </div>
                                          <p className='text-red-500'>
                                            {errors.token?.message}
                                          </p>
                                        </div>
                                      )}
                                      <div className='col-md-12'>
                                        <div className='single-input-unit'>
                                          <label htmlFor='phone'>
                                            No. Handphone
                                          </label>
                                          <PhoneInput
                                            defaultCountry='ID'
                                            placeholder='No. Handphone Anda'
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
                                      <div className='col-md-12'>
                                        <div className='single-input-unit'>
                                          <label htmlFor='jenis_pembayaran'>
                                            Jenis Pembayaran
                                          </label>
                                          <Controller
                                            control={control}
                                            defaultValue={
                                              jenisPembayaranOpts[0].value
                                            }
                                            name='jenis_pembayaran'
                                            render={({
                                              field: { onChange, value },
                                            }) => (
                                              <Select
                                                className={clsxm('py-3 pt-0')}
                                                options={jenisPembayaranOpts}
                                                value={jenisPembayaranOpts.find(
                                                  (c) => c.value === value
                                                )}
                                                onChange={(val) =>
                                                  onChange(val?.value)
                                                }
                                                styles={customSelectStyles}
                                              />
                                            )}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <Captcha
                                      onChange={(token) =>
                                        setRecaptchaResponse(token)
                                      }
                                    />
                                    <div className='login-btn mt-4'>
                                      <ButtonGradient
                                        className='text-white'
                                        type='submit'
                                        disabled={beliBtnDisabled}
                                      >
                                        Beli akun
                                      </ButtonGradient>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Modal>
                      </div>
                    </div>
                  </div>
                  <div className='mb-6'>
                    <div className='grid grid-cols-5 items-center justify-center md:grid-cols-1'>
                      <h1 className='col-span-3 text-3xl'>
                        {iklan.data.title}
                      </h1>
                      <div className='col-span-2 text-right text-xl font-bold text-[#1E53A3] md:hidden'>
                        {toIDRCurrency(iklan.data.harga_akun)}
                      </div>
                    </div>
                  </div>
                  <div className='#2EA0DE flex gap-x-2'>
                    <div className='rounded-3xl bg-[#EFEFEF] px-3 py-1'>
                      <p className='m-0 p-0 text-xs font-bold text-[#525358]'>
                        {iklan.data.platform}
                      </p>
                    </div>
                    <div className='rounded-3xl bg-[#D3EBF8] px-3 py-1'>
                      <p className='m-0 p-0 text-xs font-bold text-[#2EA0DE]'>
                        {iklan.data.jenis_refund}
                      </p>
                    </div>
                    <div className='flex items-center justify-center rounded-3xl bg-[rgba(52,_196,_84,_0.2)] px-2 py-1 md:gap-x-1'>
                      <span>
                        <TrophyGreen />
                      </span>
                      <p className='m-0 flex items-center justify-center gap-x-1 p-0 text-xs font-bold text-[#228F01]'>
                        Win Rate {iklan.data.win_rate}%
                      </p>
                    </div>
                  </div>
                  <div className='art-details-meta-info my-8 grid-cols-3 divide-x-2 md:grid'>
                    <div className='art-meta-item hidden md:block'>
                      <div className='text-4xl font-bold text-[#1E53A3]'>
                        {toIDRCurrency(iklan.data.harga_akun)}
                      </div>
                    </div>
                  </div>
                  <div className='art-details-information'>
                    <div className='art-information-tab-nav'>
                      <nav>
                        <div
                          className='nav-tabs grid w-full grid-cols-5'
                          id='nav-tab'
                          role='tablist'
                        >
                          <button
                            className='nav-link active !border-t-1 w-full !rounded-none !border-x-0 !border-neutral-400'
                            id='nav-bid-tab'
                            data-bs-toggle='tab'
                            data-bs-target='#tab-nav1'
                            type='button'
                            role='tab'
                            aria-selected='true'
                          >
                            <span className=''>Detail</span>
                          </button>
                          <button
                            className='nav-link !border-b-1 !border-t-1 w-full !rounded-none !border-x-0 !border-neutral-400'
                            id='nav-info-tab'
                            data-bs-toggle='tab'
                            data-bs-target='#tab-nav2'
                            type='button'
                            role='tab'
                            aria-selected='false'
                          >
                            <span className=''>Hero</span>
                          </button>
                          <button
                            className='nav-link !border-b-1 !border-t-1 w-full !rounded-none !border-x-0 !border-neutral-400'
                            id='nav-details-tab'
                            data-bs-toggle='tab'
                            data-bs-target='#tab-nav3'
                            type='button'
                            role='tab'
                            aria-selected='false'
                          >
                            <span className=''>Skin</span>
                          </button>
                          <button
                            className='nav-link !border-b-1 !border-t-1 w-full !rounded-none !border-x-0 !border-neutral-400'
                            id='nav-details-tab'
                            data-bs-toggle='tab'
                            data-bs-target='#tab-nav4'
                            type='button'
                            role='tab'
                            aria-selected='false'
                          >
                            <span className=''>Recall</span>
                          </button>
                          <button
                            className='nav-link !border-b-1 !border-t-1 w-full !rounded-none !border-x-0 !border-neutral-400'
                            id='nav-details-tab'
                            data-bs-toggle='tab'
                            data-bs-target='#tab-nav5'
                            type='button'
                            role='tab'
                            aria-selected='false'
                          >
                            <span className=''>Emblem</span>
                          </button>
                        </div>
                      </nav>
                    </div>
                    <div className='art-information-tab-contents mb-0'>
                      <div className='tab-content ' id='nav-tabContent'>
                        <div
                          className='tab-pane fade active show'
                          id='tab-nav1'
                          role='tabpanel'
                          aria-labelledby='nav-bid-tab'
                        >
                          <div className='art-user-wrapper'>
                            <div className='flex flex-wrap gap-x-10 gap-y-4 border-b border-neutral-400 pb-3'>
                              <div>
                                <h5 className='text-xs font-normal md:text-lg'>
                                  Status Akun
                                </h5>
                                <h4 className='text-sm md:text-xl'>
                                  {+iklan.data.first_hand_status === 0
                                    ? 'Pribadi'
                                    : 'Akun Beli'}
                                </h4>
                              </div>
                              <div>
                                <h5 className='text-xs font-normal md:text-lg'>
                                  Ganti Nama Akun
                                </h5>
                                <h4 className='text-sm md:text-xl'>
                                  {+iklan.data.change_name_status === 0
                                    ? 'Nonaktif'
                                    : 'Aktif'}
                                </h4>
                              </div>
                              <div>
                                <h5 className='text-xs font-normal md:text-lg'>
                                  Total Hero
                                </h5>
                                <h4 className='text-sm md:text-xl'>
                                  {iklan.data.total_hero}
                                </h4>
                              </div>
                              <div>
                                <h5 className='text-xs font-normal md:text-lg'>
                                  Total Skin
                                </h5>
                                <h4 className='text-sm md:text-xl'>
                                  {iklan.data.total_skin}
                                </h4>
                              </div>
                              <div>
                                <h5 className='text-xs font-normal md:text-lg'>
                                  Binding Account
                                </h5>
                                <div className='flex gap-x-2'>
                                  {iklan.data.account_bind.length > 0
                                    ? iklan.data.account_bind.map((a) => (
                                        <span
                                          className='rounded-2xl bg-neutral-300 px-3 py-1 text-sm md:text-xl'
                                          key={a.id}
                                        >
                                          {a.name}
                                        </span>
                                      ))
                                    : '-'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className='tab-pane fade'
                          id='tab-nav2'
                          role='tabpanel'
                          aria-labelledby='nav-info-tab'
                        >
                          <div className='art-user-wrapper'>
                            <div className='flex flex-wrap gap-x-10 gap-y-4 border-b border-neutral-400 pb-3'>
                              <div>
                                <h5 className='text-xs font-normal md:text-lg'>
                                  Favorite
                                </h5>
                                <div className='flex gap-x-2'>
                                  {iklan.data.hero.length > 0
                                    ? iklan.data.hero.map((a) => (
                                        <span
                                          className='rounded-2xl bg-neutral-300 px-3 py-1'
                                          key={a.id}
                                        >
                                          {a.name}
                                        </span>
                                      ))
                                    : '-'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className='tab-pane fade'
                          id='tab-nav3'
                          role='tabpanel'
                          aria-labelledby='nav-details-tab'
                        >
                          <div className='art-user-wrapper overflow-auto'>
                            <div className='flex flex-wrap gap-x-10 gap-y-4 border-b border-neutral-400 pb-3'>
                              <div>
                                <h5 className='text-xs font-normal md:text-lg'>
                                  Skin Rare
                                </h5>
                                <div className='flex flex-wrap gap-x-3 gap-y-3'>
                                  {iklan.data.total_skin_rare.length > 0
                                    ? iklan.data.total_skin_rare.map((a, i) => (
                                        <div
                                          className='flex gap-x-1'
                                          key={`${a.jenis}-${i}`}
                                        >
                                          <span className='flex items-center justify-center gap-x-2 overflow-hidden rounded-2xl bg-neutral-300 px-3 py-1'>
                                            <span className=''>{a.jenis}</span>
                                            <span className='flex h-8 w-8 items-center justify-center rounded-full bg-[#D3EBF8] text-[#2EA0DE]'>
                                              {a.total_skin}
                                            </span>
                                          </span>
                                        </div>
                                      ))
                                    : '-'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className='tab-pane fade'
                          id='tab-nav4'
                          role='tabpanel'
                          aria-labelledby='nav-details-tab'
                        >
                          <div className='art-user-wrapper overflow-auto'>
                            <div className='flex flex-wrap gap-x-10 gap-y-4 border-b border-neutral-400 pb-3'>
                              <div>
                                <h5 className='text-xs font-normal md:text-lg'>
                                  Efek Recall
                                </h5>
                                <div className='flex flex-wrap gap-x-3 gap-y-3'>
                                  {iklan.data.recall_effect.length > 0
                                    ? iklan.data.recall_effect.map((a, i) => (
                                        <span
                                          className='rounded-2xl bg-neutral-300 px-3 py-1'
                                          key={`${a}-${i}`}
                                        >
                                          {a}
                                        </span>
                                      ))
                                    : '-'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className='tab-pane fade'
                          id='tab-nav5'
                          role='tabpanel'
                          aria-labelledby='nav-details-tab'
                        >
                          <div className='art-user-wrapper overflow-auto'>
                            <div className='flex flex-wrap gap-x-10 gap-y-4 border-b border-neutral-400 pb-3'>
                              <div>
                                <h5 className='text-xs font-normal md:text-lg'>
                                  Emblem
                                </h5>
                                <div className='flex flex-wrap gap-x-3 gap-y-3'>
                                  {iklan.data.emblem.length > 0
                                    ? iklan.data.emblem.map((a, i) => (
                                        <div
                                          className='flex gap-x-1'
                                          key={`${a.id}-${i}`}
                                        >
                                          <span className='flex items-center justify-center gap-x-2 overflow-hidden rounded-2xl bg-neutral-300 px-3 py-1'>
                                            <span className=''>{a.name}</span>
                                            <span className='flex h-8 w-8 items-center justify-center rounded-full bg-[#D3EBF8] text-[#2EA0DE]'>
                                              {a.level}
                                            </span>
                                          </span>
                                        </div>
                                      ))
                                    : '-'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex gap-x-3'>
                    {iklan.data.status.toString().toLowerCase() ===
                      'dipublikasi' && (
                      <>
                        <Button
                          onClick={onOpenModal}
                          className='w-full md:hidden'
                        >
                          Beli Sekarang
                        </Button>
                        <Button
                          onClick={onOpenModal}
                          className='hidden md:block'
                        >
                          Beli Sekarang
                        </Button>
                      </>
                    )}
                    <ButtonLink
                      className='md:hidden'
                      variant='outline'
                      href={`https://wa.me/${iklan.data.user.phone
                        .replace(/\+/g, '')
                        .replace(/-/g, '')
                        .replace(/\(/g, '')
                        .replace(/\)/g, '')
                        .trim()}`}
                    >
                      <FaPhoneAlt />
                    </ButtonLink>
                    <ButtonLink
                      className='hidden md:block'
                      variant='outline'
                      href={`https://wa.me/${iklan.data.user.phone
                        .replace(/\+/g, '')
                        .replace(/-/g, '')
                        .replace(/\(/g, '')
                        .replace(/\)/g, '')
                        .trim()}`}
                    >
                      Hubungi Penjual
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='py-4'>
            <div className='mb-4 flex gap-x-4'>
              <h3>Iklan lainnya</h3>
              <Link href='/#jelajah_akun'>
                <a className='text-blue-400'>Lihat semua</a>
              </Link>
            </div>
            <div className='grid grid-cols-12 gap-y-3 gap-x-2 md:gap-y-5 md:gap-x-4'>
              {iklans.data.data.map((iklan, index) => (
                <IklanCardSingle
                  iklan={iklan}
                  key={`${iklan.id}${index}`}
                  refund={getRefundById(iklan.jenis_refund)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default IklanMain;
