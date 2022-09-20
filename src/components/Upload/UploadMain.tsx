import axios from 'axios';
import mergeImages from 'merge-images';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import queryString, { stringifyUrl } from 'query-string';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { FiChevronLeft, FiInfo } from 'react-icons/fi';
import { HiPlus } from 'react-icons/hi';
import Lightbox from 'react-image-lightbox';
import Modal from 'react-responsive-modal';
import Select, { SingleValue } from 'react-select';
import { Theme, toast } from 'react-toastify';
import { useLifecycles, useSessionStorage } from 'react-use';
import useSWR from 'swr';

import MyButton from '@/components/buttons/Button';
import ButtonGradient from '@/components/buttons/ButtonGradient';
import Captcha from '@/components/Common/Captcha';
import Breadcrumbs from '@/components/Common/PageTitle';
import Spinner from '@/components/Common/Spinner';
import XButton from '@/components/Common/XButton';
import UnstyledLink from '@/components/links/UnstyledLink';
import ConfirmationDialog from '@/components/Upload/Dialog';
import StyledInputFile from '@/components/Upload/StyledInputFile';
import { selectDarkTheme } from '@/constant/colors';
import { API_URL } from '@/constant/config';
import { customSelectStyles, customSelectStylesMulti } from '@/constant/select';
import clsxm from '@/lib/clsxm';
import dataURLtoFile from '@/lib/dataURLtoFile';
import getAuthHeader from '@/lib/getAuthHeader';
import getHeightAndWidthFromDataUrl from '@/lib/getHeightAndWidthFromDataUrl';
import resizeFile from '@/lib/resizeFile';
import toastPromiseError from '@/lib/toastPromiseError';
import toIDRCurrency from '@/lib/toIDRCurrency';
import useAuthHeader from '@/services/authHeader';
import Bank from '@/types/bank';
import BindingAcc from '@/types/bindingAccount';
import EmblemMaster from '@/types/emblemMaster';
import FeePayment from '@/types/feePayment';
import HeroMaster from '@/types/heroMaster';
import Packages from '@/types/packages';
import Pagination from '@/types/pagination';
import Platform from '@/types/platform';
import Refund from '@/types/refund';
import User from '@/types/user';

type IFormInput = {
  title: string;
  platform_id: number;
  first_hand_status: number;
  change_name_status?: number;
  account_bind: number[];
  favorite_heroes: number[];
  win_rate: number;
  total_hero: number;
  total_skin: number;
  total_skin_rare: {
    jenis: string;
    total_skin?: number;
  }[];
  first_top_up_exist: number;
  total_emblem: {
    id_emblem: number;
    level: number;
  }[];
  recall_effect: string[];
  jenis_refund: number;
  harga_akun: number;
  jenis_pembayaran: number;
  package_id: number;
};

// const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

const UploadMain = () => {
  const [saveData, setSaveData] = useSessionStorage<IFormInput | undefined>(
    'saveData'
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [selectedBank, setSelectedBank] = useState<number>();

  const {
    control,
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      recall_effect: [],
    },
  });

  const [authorized, setAuthorized] = useState(false);

  const router = useRouter();
  useEffect(() => {
    (async () => {
      axios
        .get(`${API_URL}/profile`, {
          headers: { Authorization: getAuthHeader() ?? '' },
        })
        .then(() => setAuthorized(true))
        .catch(() =>
          router.push(
            `/login?${queryString.stringify({
              state: 'unauthorized',
              returnTo: router.pathname,
            })}`
          )
        );
    })();
  }, [router]);

  const totalSkinRareFields = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'total_skin_rare', // unique name for your Field Array
  });

  const totalEmblemFields = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'total_emblem', // unique name for your Field Array
  });
  const [recallEffectCnt, setRecallEffectCnt] = useState<number>(1);

  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);

  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLifecycles(() => {
    if (saveData) {
      reset(saveData);
      setRecallEffectCnt(saveData.recall_effect.length);
      setSaveData(undefined);
    }
  });

  const { data: user } = useSWR<{
    data: User;
    message: string;
    success: boolean;
  }>(mounted ? `${API_URL}/profile` : null);

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

  const { data: platform } = useSWR<{
    data: { data: Platform[]; pagination: Pagination };
    message: string;
    success: boolean;
  }>(`${API_URL}/master/platform`);

  const { data: packages } = useSWR<{
    data: { data: Packages[]; pagination: Pagination };
    message: string;
    success: boolean;
  }>(`${API_URL}/master/packages`);

  const { data: bindingAcc } = useSWR<{
    data: { data: BindingAcc[]; pagination: Pagination };
    message: string;
    success: boolean;
  }>(`${API_URL}/master/binding-account`);

  const { data: heroes } = useSWR<{
    data: { data: HeroMaster[]; pagination: Pagination };
    message: string;
    success: boolean;
  }>(`${API_URL}/master/hero?perPage=200`);

  const { data: emblem } = useSWR<{
    data: { data: EmblemMaster[]; pagination: Pagination };
    message: string;
    success: boolean;
  }>(`${API_URL}/master/emblem?perPage=200`);

  const { data: refund } = useSWR<{
    data: { data: Refund[]; pagination: Pagination };
    message: string;
    success: boolean;
  }>(`${API_URL}/master/refund?perPage=200`);

  const { data: feePayment } = useSWR<{
    data: { data: FeePayment[]; pagination: Pagination };
    message: string;
    success: boolean;
  }>(
    selectedBank
      ? `${API_URL}/master/fee-payment?id_bank=${selectedBank}`
      : null
  );

  const changeNameOpts = [
    { value: 0, label: 'OFF' },
    { value: 1, label: 'ON' },
  ];

  const accountBindOpts = bindingAcc?.data.data.map((acc) => ({
    value: acc.id,
    label: acc.name,
  }));

  const favHeroesOpts = heroes?.data.data.map((hero) => ({
    value: hero.id,
    label: hero.name,
  }));

  const emblemOpts = emblem?.data.data.map((e) => ({
    value: e.id,
    label: e.name,
  }));

  const jenisRefundOpts = user?.data.is_verified
    ? refund?.data.data.map((re) => ({
        value: re.id,
        label: re.desc,
      }))
    : refund?.data.data
        .map((re) => ({
          value: re.id,
          label: re.desc,
        }))
        .slice(0, 1);

  const jenisPembayaranOpts = banks?.data.data
    .filter((b) => !!b.is_active)
    .map((b) => ({
      value: b.id,
      label: b.name,
    }));

  const platformId = platform?.data.data.map((p) => ({
    value: p.id,
    label: p.name,
  }));

  const packageId = packages?.data.data.map((p) => ({
    value: p.id,
    label: `${p.description} (${toIDRCurrency(p.price)})`,
  }));

  const firstHandStatusOpts = [
    {
      value: 0,
      label: 'Akun Pribadi',
    },
    {
      value: 1,
      label: 'Akun Hasil Beli',
    },
  ];

  const firstTopUpOpts = [
    {
      value: 0,
      label: 'Tidak Ada',
    },
    {
      value: 1,
      label: 'Ada',
    },
  ];

  const [previewImgProfile, setPreviewImgProfile] = useState(false);
  const [previewWinRate, setPreviewWinRate] = useState(false);
  const [previewWinRateHero, setPreviewWinRateHero] = useState(false);
  const [previewEmblem, setPreviewEmblem] = useState(false);
  const [previewSkin, setPreviewSkin] = useState(false);
  const [skinIndex, setSkinIndex] = useState(0);

  const [imageProfile, setImageProfile] = useState<File | File[] | null>(null);
  const [imageWinRate, setImageWinRate] = useState<File | File[] | null>(null);
  const [imageWinRateHero, setImageWinRateHero] = useState<
    File | File[] | null
  >(null);
  const [imageEmblem, setImageEmblem] = useState<File | File[] | null>(null);
  const [imageSkin, setImageSkin] = useState<File | File[] | null>(null);
  const headers = useAuthHeader();

  const [imgSkinField, setImgSkinField] = useState(0);

  const [responseCaptcha, setResponseCapthca] = useState<string | null>(null);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (
      !headers.Authorization ||
      !imageProfile ||
      !imageWinRate ||
      !imageWinRateHero ||
      !imageEmblem ||
      !imageSkin
    ) {
      toast.error('Semua gambar harus diisi', { theme: theme as Theme });
      return;
    }
    const form = new FormData();

    Object.entries(data).forEach((v) => {
      if ((Array.isArray(v[1]) && v[1].length === 0) || v[1] === undefined) {
        return;
      }
      form.append(
        v[0],
        Array.isArray(v[1]) ? JSON.stringify(v[1]) : v[1].toString()
      );
    });
    if (Array.isArray(imageProfile)) {
      imageProfile.forEach((v) => v && form.append('image_profile', v));
    } else {
      form.append('image_profile', imageProfile);
    }
    if (Array.isArray(imageWinRate)) {
      imageWinRate.forEach((v) => v && form.append('image_win_rate', v));
    } else {
      form.append('image_win_rate', imageWinRate);
    }
    if (Array.isArray(imageWinRateHero)) {
      imageWinRateHero.forEach(
        (v) => v && form.append('image_win_rate_hero', v)
      );
    } else {
      form.append('image_win_rate_hero', imageWinRateHero);
    }
    if (Array.isArray(imageEmblem)) {
      imageEmblem.forEach((v) => v && form.append('image_emblem', v));
    } else {
      form.append('image_emblem', imageEmblem);
    }
    if (Array.isArray(imageSkin)) {
      imageSkin.forEach((v) => v && form.append('image_skin', v));
    } else {
      form.append('image_skin', imageSkin);
    }
    if (!openDialog) {
      setOpenDialog(true);
      return;
    }
    if (!responseCaptcha) {
      if (!recaptchaRef.current) {
        toast.warn('Captcha harus diselesaikan');
      } else {
        recaptchaRef.current.execute();
      }
      return;
    }
    // for (const pair of form.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    // return;
    const res = await toast.promise(
      axios.post(
        stringifyUrl({
          url: `${API_URL}/user/iklan`,
        }),
        form,
        { headers: { ...headers, recaptcha_response: responseCaptcha } }
      ),
      {
        pending: {
          render: () => {
            setSubmitBtnDisabled(true);
            setOpenDialog(false);
            return 'Loading';
          },
        },
        success: {
          render: () => {
            setSubmitBtnDisabled(false);
            setOpenDialog(false);
            return 'Berhasil posting iklan';
          },
        },
        error: {
          render: toastPromiseError(() => {
            setSubmitBtnDisabled(false);
            setOpenDialog(false);
          }, 'Gagal Submit Iklan!'),
        },
      }
    );
    const no_invoice = res.data.data.no_invoice as string;

    router.push(`/invoice/${no_invoice}`);
  };

  const recaptchaRef = React.createRef<ReCAPTCHA>();

  const [emblemOptsSet, setEmblemOptsSet] = useState(false);

  const [openJenisRefund, setOpenJenisRefund] = useState(false);

  const onCloseJenisRefund = () => setOpenJenisRefund(false);

  const [openChangeNameStatus, setOpenChangeNameStatus] = useState(false);

  const onCloseChangeNameStatus = () => setOpenChangeNameStatus(false);

  const [openUploadCaptureProfile, setOpenUploadCaptureProfile] =
    useState(false);

  const onCloseUploadCaptureProfile = () => setOpenUploadCaptureProfile(false);

  const [openWinRate, setOpenWinRate] = useState(false);

  const onCloseWinRate = () => setOpenWinRate(false);

  const [openFavHero, setOpenFavHero] = useState(false);

  const onCloseFavHero = () => setOpenFavHero(false);

  const [openEmblem, setOpenEmblem] = useState(false);

  const onCloseEmblem = () => setOpenEmblem(false);

  const [openSkin, setOpenSkin] = useState(false);

  const onCloseSkin = () => setOpenSkin(false);

  useEffect(() => {
    if (
      emblemOpts &&
      emblemOpts.length > 0 &&
      totalEmblemFields.fields.length < 1 &&
      !emblemOptsSet &&
      !saveData
    ) {
      setEmblemOptsSet(true);
      totalEmblemFields.append({
        id_emblem: emblemOpts.filter(
          (x) =>
            !getValues('total_emblem')
              .map((x) => x.id_emblem)
              .includes(x.value)
        )[0]?.value,
        level: 1,
      });
    }
  }, [emblemOpts, emblemOptsSet, getValues, saveData, totalEmblemFields]);

  const twibbonize = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage?: (value: File | File[] | null) => void
  ) => {
    if (!e.target.files?.[0]) {
      return;
    }
    const img = await resizeFile(
      await dataURLtoFile(
        (await resizeFile(
          e.target.files[0],
          1360,
          760,
          'PNG',
          100,
          0,
          undefined,
          1360,
          760
        )) as string,
        e.target.files[0].name
      ),
      1360,
      760,
      'PNG',
      100,
      0
    );
    const { height, width } = await getHeightAndWidthFromDataUrl(img as string);
    const twibbonizedImg = await mergeImages([
      {
        src: img as string,
        x: 68 + 680 - Math.round(width / 2),
        y: 288 + 380 - Math.round(height / 2),
      },
      '/images/twibbon.png',
    ]);
    setImage &&
      setImage(await dataURLtoFile(twibbonizedImg, e.target.files[0].name));
  };

  if (totalSkinRareFields.fields.length < 1) {
    totalSkinRareFields.append({
      jenis: 'medium',
      total_skin: undefined,
    });
  }

  if (
    !authorized ||
    !accountBindOpts ||
    !favHeroesOpts ||
    !emblemOpts ||
    !jenisRefundOpts ||
    !jenisPembayaranOpts ||
    !platformId ||
    !packageId
  ) {
    return <Spinner />;
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbTitle='Posting Iklan'
        breadcrumbSubTitle='Posting Iklan'
      />

      <div className='upload-area pb-90 pt-12'>
        <div className='container p-0'>
          <div className='upload-wrapper mb-10'>
            <span
              className='mb-4 flex cursor-pointer items-center gap-x-3'
              onClick={() => router.back()}
            >
              <FiChevronLeft className='font-bold' />
              <p className='m-0 font-bold'>Kembali</p>
            </span>
            <form className='upload-form p-0' onSubmit={handleSubmit(onSubmit)}>
              <div className='row rounded-xl bg-white p-4 py-6 dark:!bg-gray-800'>
                <div className='artist-meta-info creator-details-meta-info mb-4'>
                  <h1 className='text-3xl text-[#B89C74]'>Posting Iklan</h1>
                </div>
                <div className=''>
                  <div className='row wow fadeInUp gap-y-3'>
                    <div className='col-md-8'>
                      <div className='single-input-unit'>
                        <label>Judul</label>
                        <input
                          type='text'
                          placeholder='Masukkan judul iklan'
                          {...register('title', {
                            required: 'Judul harus diisi',
                          })}
                          className='border border-2 dark:!border-gray-700'
                        />
                      </div>
                      <p className='text-red-500'>{errors.title?.message}</p>
                    </div>
                    <div className='col-md-4'>
                      <div className='single-input-unit'>
                        <label htmlFor='jenis_refund' className='!flex gap-x-2'>
                          <span>Jenis Refund</span>
                          <FiInfo
                            className='cursor-pointer'
                            onClick={() => setOpenJenisRefund(true)}
                          />
                        </label>
                        <Controller
                          control={control}
                          defaultValue={jenisRefundOpts[0].value}
                          name='jenis_refund'
                          render={({ field: { onChange, value } }) => (
                            <Select
                              className={clsxm(
                                'rounded-md border border-2 pt-0 dark:!border-gray-700'
                              )}
                              options={jenisRefundOpts}
                              value={jenisRefundOpts.find(
                                (c) => c.value === value
                              )}
                              onChange={(val) => onChange(val?.value)}
                              theme={
                                mounted && theme === 'dark'
                                  ? selectDarkTheme
                                  : undefined
                              }
                              styles={customSelectStyles}
                            />
                          )}
                        />
                        {!user?.data.is_verified && (
                          <UnstyledLink
                            href='/profile'
                            className='text-sm text-yellow-500'
                            onClick={() => setSaveData(getValues())}
                          >
                            Akun anda belum diverifikasi, silahkan upload
                            identitas terlebih dahulu agar dapat memilih opsi
                            Refund lainnya
                          </UnstyledLink>
                        )}
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='single-input-unit'>
                        <label htmlFor='platform_id'>Status Akun</label>
                        <Controller
                          control={control}
                          defaultValue={firstHandStatusOpts[0].value}
                          name='first_hand_status'
                          render={({ field: { onChange, value } }) => (
                            <Select
                              className={clsxm(
                                'rounded-md border border-2 pt-0 dark:!border-gray-700'
                              )}
                              options={firstHandStatusOpts}
                              value={firstHandStatusOpts.find(
                                (c) => c.value === value
                              )}
                              onChange={(val) => onChange(val?.value)}
                              theme={
                                mounted && theme === 'dark'
                                  ? selectDarkTheme
                                  : undefined
                              }
                              styles={customSelectStyles}
                            />
                          )}
                        />
                      </div>
                      <p className='text-red-500'>
                        {errors.first_hand_status?.message}
                      </p>
                    </div>
                    <div className='col-md-4'>
                      <div className='single-input-unit'>
                        <label>Win Rate</label>
                        <div className='flex'>
                          <input
                            type='number'
                            step='any'
                            onWheel={(e) =>
                              e.target instanceof HTMLElement && e.target.blur()
                            }
                            placeholder='Masukkan win rate'
                            {...register('win_rate', {
                              required: 'Win rate harus diisi',
                              pattern: {
                                value: /^(\d{0,2}(\.\d{1,2})?|100(\.00?)?)$/,
                                message:
                                  'Win rate haruslah di antara 0 - 100 dan maksimum 2 desimal di belakang koma',
                              },
                              valueAsNumber: true,
                            })}
                            className='rounded-md border border-2 dark:!border-gray-700'
                            style={{
                              borderTopRightRadius: 0,
                              borderBottomRightRadius: 0,
                              borderRightWidth: 0,
                            }}
                          />
                          <div className='extension flex items-center justify-center rounded-r-md border border-2 pt-0 dark:!border-gray-700'>
                            %
                          </div>
                        </div>
                      </div>
                      <p className='text-red-500'>{errors.win_rate?.message}</p>
                    </div>
                    <div className='col-md-4'>
                      <div className='single-input-unit'>
                        <label htmlFor='package_id'>Paket Posting Iklan</label>
                        <Controller
                          control={control}
                          defaultValue={packageId[0].value}
                          name='package_id'
                          render={({ field: { onChange, value } }) => (
                            <Select
                              styles={customSelectStyles}
                              className={clsxm(
                                'rounded-md border border-2 pt-0 dark:!border-gray-700'
                              )}
                              options={packageId}
                              value={packageId.find((c) => c.value === value)}
                              onChange={(val) => onChange(val?.value)}
                              theme={
                                mounted && theme === 'dark'
                                  ? selectDarkTheme
                                  : undefined
                              }
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='single-input-unit'>
                        <label htmlFor='platform_id'>Platform</label>
                        <Controller
                          control={control}
                          defaultValue={platformId[0].value}
                          name='platform_id'
                          render={({ field: { onChange, value } }) => (
                            <Select
                              styles={customSelectStyles}
                              className={clsxm(
                                'rounded-md border border-2 pt-0 dark:!border-gray-700'
                              )}
                              options={platformId}
                              value={platformId.find((c) => c.value === value)}
                              onChange={(val) => onChange(val?.value)}
                              theme={
                                mounted && theme === 'dark'
                                  ? selectDarkTheme
                                  : undefined
                              }
                            />
                          )}
                        />
                      </div>
                      <p className='text-red-500'>
                        {errors.platform_id?.message}
                      </p>
                    </div>
                    <div className='col-md-4'>
                      <div className='single-input-unit'>
                        <label>Jumlah Skin</label>
                        <input
                          type='number'
                          onWheel={(e) =>
                            e.target instanceof HTMLElement && e.target.blur()
                          }
                          placeholder='Masukkan jumlah skin'
                          {...register('total_skin', {
                            required: 'Total skin harus diisi',
                            min: {
                              value: 0,
                              message: 'Minimum jumlah skin adalah 0',
                            },
                            valueAsNumber: true,
                          })}
                          className='rounded-md border border-2 pt-0 dark:!border-gray-700'
                        />
                      </div>
                      <p className='text-red-500'>
                        {errors.total_skin?.message}
                      </p>
                    </div>
                    <div className='col-md-4'>
                      <div className='single-input-unit'>
                        <label htmlFor='jenis_pembayaran'>
                          Jenis Pembayaran
                        </label>
                        <Controller
                          control={control}
                          defaultValue={jenisPembayaranOpts[0].value}
                          name='jenis_pembayaran'
                          render={({ field: { onChange, value } }) => (
                            <Select
                              styles={customSelectStyles}
                              className={clsxm(
                                'rounded-md border border-2 pt-0 dark:!border-gray-700'
                              )}
                              options={jenisPembayaranOpts}
                              value={jenisPembayaranOpts.find(
                                (c) => c.value === value
                              )}
                              onChange={(val) => {
                                onChange(val?.value);
                                setSelectedBank(val?.value);
                              }}
                              theme={
                                mounted && theme === 'dark'
                                  ? selectDarkTheme
                                  : undefined
                              }
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='single-input-unit'>
                        <label
                          htmlFor='change_name_status'
                          className='!flex gap-x-2'
                        >
                          <span>Change Name Status</span>
                          <FiInfo
                            className='cursor-pointer'
                            onClick={() => setOpenChangeNameStatus(true)}
                          />
                        </label>
                        <Controller
                          control={control}
                          defaultValue={changeNameOpts[0].value}
                          name='change_name_status'
                          render={({ field: { onChange, value } }) => (
                            <Select
                              styles={customSelectStyles}
                              className={clsxm(
                                'rounded-md border border-2 pt-0 dark:!border-gray-700'
                              )}
                              options={changeNameOpts}
                              value={changeNameOpts.find(
                                (c) => c.value === value
                              )}
                              onChange={(
                                val: SingleValue<{
                                  value: number;
                                  label: string;
                                }>
                              ) => onChange(val?.value)}
                              theme={
                                mounted && theme === 'dark'
                                  ? selectDarkTheme
                                  : undefined
                              }
                            />
                          )}
                        />
                      </div>
                      <p className='text-red-500'>
                        {errors.change_name_status?.message}
                      </p>
                    </div>
                    <div className='col-md-4'>
                      <div className='single-input-unit'>
                        <label>Jumlah Hero</label>
                        <input
                          type='number'
                          onWheel={(e) =>
                            e.target instanceof HTMLElement && e.target.blur()
                          }
                          placeholder='Masukkan jumlah hero'
                          {...register('total_hero', {
                            required: 'Total hero harus diisi',
                            min: {
                              value: 1,
                              message: 'Minimum jumlah hero adalah 1',
                            },
                            valueAsNumber: true,
                          })}
                          className='rounded-md border border-2 pt-0 dark:!border-gray-700'
                        />
                      </div>
                      <p className='text-red-500'>
                        {errors.total_hero?.message}
                      </p>
                    </div>
                    <div className='col-md-4'>
                      <div className='single-input-unit'>
                        <label>Harga Akun</label>
                        <div className='flex'>
                          <div className='extension flex items-center justify-center rounded-l-md border border-2 pt-0 dark:!border-gray-700'>
                            Rp.
                          </div>
                          <input
                            type='number'
                            onWheel={(e) =>
                              e.target instanceof HTMLElement && e.target.blur()
                            }
                            placeholder='Masukkan harga akun'
                            {...register('harga_akun', {
                              required: 'Harga akun harus diisi',
                              min: {
                                value: 1,
                                message: 'Minimum harga adalah 1',
                              },
                              valueAsNumber: true,
                            })}
                            className='!rounded-r-md border border-2 pt-0 dark:!border-gray-700'
                            style={{
                              borderTopLeftRadius: 0,
                              borderBottomLeftRadius: 0,
                              borderLeftWidth: 0,
                            }}
                          />
                        </div>
                      </div>
                      <p className='text-red-500'>
                        {errors.harga_akun?.message}
                      </p>
                    </div>
                    <div className='col-md-6'>
                      <div className='single-input-unit'>
                        <label htmlFor='account_bind'>Binding account</label>
                        <Controller
                          control={control}
                          defaultValue={[]}
                          name='account_bind'
                          render={({ field: { onChange, value } }) => (
                            <Select
                              placeholder='Pilih binding account'
                              styles={customSelectStylesMulti}
                              className={clsxm(
                                'rounded-md border border-2 pt-0 dark:!border-gray-700'
                              )}
                              options={accountBindOpts}
                              value={accountBindOpts.filter((c) =>
                                value.includes(c.value)
                              )}
                              onChange={(val) =>
                                onChange(val.map((c) => c.value))
                              }
                              isMulti
                              theme={
                                mounted && theme === 'dark'
                                  ? selectDarkTheme
                                  : undefined
                              }
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='single-input-unit'>
                        <label
                          htmlFor='favorite_heroes'
                          className='!flex gap-x-2'
                        >
                          <span>Change Name Status</span>
                          <FiInfo
                            className='cursor-pointer'
                            onClick={() => setOpenChangeNameStatus(true)}
                          />
                        </label>
                        <Controller
                          control={control}
                          defaultValue={[]}
                          name='favorite_heroes'
                          render={({ field: { onChange, value } }) => (
                            <Select
                              placeholder='Pilih hero favorit'
                              styles={customSelectStylesMulti}
                              className={clsxm(
                                'rounded-md border border-2 pt-0 dark:!border-gray-700'
                              )}
                              options={favHeroesOpts}
                              value={favHeroesOpts.filter((c) =>
                                value.includes(c.value)
                              )}
                              onChange={(val) =>
                                val.length <= 5
                                  ? onChange(val.map((c) => c.value))
                                  : toast.error(
                                      'Maximal jumlah hero adalah 5',
                                      { toastId: 'max_hero' }
                                    )
                              }
                              isMulti
                              theme={
                                mounted && theme === 'dark'
                                  ? selectDarkTheme
                                  : undefined
                              }
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='single-input-unit space-y-4'>
                        <div className='flex items-center space-x-4'>
                          <label className='m-0'>Skin Rare</label>
                          <Button
                            variant='success'
                            className='!rounded-full !bg-[#16B81C] !p-1'
                            onClick={() =>
                              totalSkinRareFields.append({
                                jenis: 'medium',
                                total_skin: 1,
                              })
                            }
                          >
                            <HiPlus />
                          </Button>
                        </div>
                        <div className='max-h-80 space-y-4 overflow-auto'>
                          <div className='rounded-xl border-primary-200'>
                            {!!totalSkinRareFields.fields.length && (
                              <div className='flex'>
                                <label
                                  className='mr-2 basis-full !text-sm'
                                  htmlFor='jenis'
                                >
                                  Jenis
                                </label>
                                <label
                                  className='mr-2 !hidden'
                                  htmlFor='total_skin'
                                >
                                  Total Skin
                                </label>
                              </div>
                            )}
                            <div className='flex flex-col gap-y-3'>
                              {totalSkinRareFields.fields.map(
                                (field, index) => (
                                  <div className='flex gap-x-2' key={field.id}>
                                    <div className='basis-full'>
                                      <input
                                        type='text'
                                        placeholder='Jenis'
                                        {...register(
                                          `total_skin_rare.${index}.jenis` as const,
                                          {
                                            required: 'Jenis harus diisi',
                                          }
                                        )}
                                        className='mb-0 rounded-md border border-2 pt-0 dark:!border-gray-700'
                                      />
                                    </div>
                                    <div className='mr-2 hidden basis-1/4'>
                                      <input
                                        type='number'
                                        onWheel={(e) =>
                                          e.target instanceof HTMLElement &&
                                          e.target.blur()
                                        }
                                        placeholder='0'
                                        defaultValue={1}
                                        {...register(
                                          `total_skin_rare.${index}.total_skin` as const,
                                          {
                                            valueAsNumber: true,
                                          }
                                        )}
                                        className='mb-0'
                                      />
                                    </div>
                                    {totalSkinRareFields.fields.length > 1 && (
                                      <XButton
                                        onClick={() =>
                                          totalSkinRareFields.remove(index)
                                        }
                                        className='self-center bg-rose-300'
                                      />
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className='text-red-500'>{errors.title?.message}</p>
                    </div>
                    <div className='col-md-6 mb-4'>
                      <div className='single-input-unit space-y-4'>
                        <div className='flex items-center space-x-4'>
                          <label className='m-0'>Emblem</label>
                          {totalEmblemFields.fields.length <
                            emblemOpts.length && (
                            <Button
                              variant='success'
                              className='!rounded-full !bg-[#16B81C] !p-1'
                              onClick={() =>
                                totalEmblemFields.append({
                                  id_emblem: emblemOpts.filter(
                                    (x) =>
                                      !getValues('total_emblem')
                                        .map((x) => x.id_emblem)
                                        .includes(x.value)
                                  )[0]?.value,
                                  level: 1,
                                })
                              }
                            >
                              <HiPlus />
                            </Button>
                          )}
                        </div>
                        <div className='overflow max-h-80 space-y-4'>
                          <div className='rounded-xl border-primary-200'>
                            {!!totalEmblemFields.fields.length && (
                              <div className='flex justify-around'>
                                <label
                                  className='basis-3/4 !text-sm'
                                  htmlFor='jenis'
                                >
                                  Nama
                                </label>
                                <label
                                  className='basis-1/4 !text-sm'
                                  htmlFor='total_skin'
                                >
                                  Level
                                </label>
                              </div>
                            )}
                            <div className='space-y-2'>
                              {totalEmblemFields.fields.map((field, index) => (
                                <div className='flex gap-x-1' key={field.id}>
                                  <div className='basis-3/4'>
                                    <Controller
                                      control={control}
                                      defaultValue={
                                        emblemOpts.filter(
                                          (x) =>
                                            !getValues('total_emblem')
                                              .filter(
                                                (x) =>
                                                  x.id_emblem !==
                                                  getValues(
                                                    `total_emblem.${index}.id_emblem`
                                                  )
                                              )
                                              .map((x) => x.id_emblem)
                                              .includes(x.value)
                                        )[0]?.value
                                      }
                                      name={`total_emblem.${index}.id_emblem`}
                                      render={({
                                        field: { onChange, value },
                                      }) => (
                                        <Select
                                          styles={customSelectStyles}
                                          className={clsxm(
                                            'rounded-md border border-2 pt-0 dark:!border-gray-700'
                                          )}
                                          options={emblemOpts.filter(
                                            (x) =>
                                              !getValues('total_emblem')
                                                .filter(
                                                  (x) =>
                                                    x.id_emblem !==
                                                    getValues(
                                                      `total_emblem.${index}.id_emblem`
                                                    )
                                                )
                                                .map((x) => x.id_emblem)
                                                .includes(x.value)
                                          )}
                                          value={emblemOpts.find(
                                            (c) => c.value === value
                                          )}
                                          onChange={(val) =>
                                            onChange(val?.value)
                                          }
                                          theme={
                                            mounted && theme === 'dark'
                                              ? selectDarkTheme
                                              : undefined
                                          }
                                        />
                                      )}
                                    />
                                  </div>
                                  <div className='basis-1/4'>
                                    <input
                                      type='number'
                                      onWheel={(e) =>
                                        e.target instanceof HTMLElement &&
                                        e.target.blur()
                                      }
                                      placeholder='1'
                                      {...register(
                                        `total_emblem.${index}.level` as const,
                                        {
                                          required: 'Level harus diisi',
                                          min: {
                                            value: 1,
                                            message: 'Minimum level adalah 1',
                                          },
                                          valueAsNumber: true,
                                        }
                                      )}
                                      className='mb-0 rounded-md border border-2 pt-0 dark:!border-gray-700'
                                    />
                                  </div>
                                  {totalEmblemFields.fields.length > 1 && (
                                    <XButton
                                      onClick={() =>
                                        totalEmblemFields.remove(index)
                                      }
                                      className='self-center bg-rose-300'
                                    />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-6 mb-4'>
                      <div className='single-input-unit'>
                        <div className='mb-2 flex items-center space-x-4'>
                          <label className='m-0'>Recall Effect</label>
                          <Button
                            variant='success'
                            onClick={() => setRecallEffectCnt((v) => v + 1)}
                            className='!rounded-full !bg-[#16B81C] !p-1'
                          >
                            <HiPlus />
                          </Button>
                        </div>
                        <div className='max-h-60 overflow-auto'>
                          {[...new Array(recallEffectCnt)].map((_, index) => (
                            <>
                              <div className='flex gap-x-2'>
                                <input
                                  key={index}
                                  type='text'
                                  placeholder={`Masukkan recall effect`}
                                  {...register(`recall_effect.${index}`, {
                                    required: 'Recall effect harus diisi',
                                  })}
                                  className='mb-0 rounded-md border border-2 pt-0 dark:!border-gray-700'
                                />
                                {recallEffectCnt > 1 && (
                                  <XButton
                                    className='self-center bg-rose-300'
                                    onClick={() => {
                                      if (recallEffectCnt > 1) {
                                        unregister(`recall_effect.${index}`);
                                        const arr = getValues('recall_effect');
                                        arr.splice(index, 1);
                                        setValue('recall_effect', arr);
                                      } else {
                                        setValue('recall_effect', []);
                                      }
                                      setRecallEffectCnt((v) =>
                                        Math.max(v - 1, 0)
                                      );
                                    }}
                                  />
                                )}
                              </div>
                              <p className='text-red-500'>
                                {errors.recall_effect?.[index]?.message}
                              </p>
                            </>
                          ))}
                        </div>
                      </div>
                      <div className='single-input-unit mt-2'>
                        <label htmlFor='platform_id'>
                          Bukti Top Up Pertama
                        </label>
                        <Controller
                          control={control}
                          defaultValue={firstTopUpOpts[0].value}
                          name='first_top_up_exist'
                          render={({ field: { onChange, value } }) => (
                            <Select
                              className={clsxm(
                                'rounded-md border border-2 pt-0 dark:!border-gray-700'
                              )}
                              options={firstTopUpOpts}
                              value={firstTopUpOpts.find(
                                (c) => c.value === value
                              )}
                              onChange={(val) => onChange(val?.value)}
                              theme={
                                mounted && theme === 'dark'
                                  ? selectDarkTheme
                                  : undefined
                              }
                              styles={customSelectStyles}
                            />
                          )}
                        />
                      </div>
                      <p className='text-red-500'>
                        {errors.first_top_up_exist?.message}
                      </p>
                    </div>
                    <div className='col-md-6 grid grid-cols-2 gap-y-4 gap-x-4'>
                      <div>
                        <div className=''>
                          <label
                            htmlFor='change_name_status'
                            className='mb-2 !flex items-center gap-x-2'
                          >
                            <span className='text-base font-bold text-[#171717] dark:text-white'>
                              Hero Favorit
                            </span>
                            <FiInfo
                              className='cursor-pointer'
                              onClick={() => setOpenFavHero(true)}
                            />
                          </label>
                          <div className='single-input-unit flex items-center gap-x-2'>
                            <StyledInputFile
                              onChange={(e) => {
                                twibbonize(e, setImageWinRateHero);
                              }}
                              labelClassName={clsxm(
                                !imageWinRateHero && '!text-neutral-500',
                                'overflow-hidden'
                              )}
                            >
                              {imageWinRateHero
                                ? (imageWinRateHero as File).name
                                : 'Pilih file gambar'}
                            </StyledInputFile>
                            {imageWinRateHero && (
                              <Button
                                variant='success'
                                className='h-[50px] !rounded-md'
                                onClick={() => setPreviewWinRateHero(true)}
                              >
                                Lihat
                              </Button>
                            )}
                          </div>
                        </div>
                        {previewWinRateHero && imageWinRateHero && (
                          <Lightbox
                            mainSrc={URL.createObjectURL(
                              imageWinRateHero as File
                            )}
                            onCloseRequest={() => setPreviewWinRateHero(false)}
                          />
                        )}
                      </div>
                      <div>
                        <div className=''>
                          <label
                            htmlFor='change_name_status'
                            className='mb-2 !flex items-center gap-x-2'
                          >
                            <span className='text-base font-bold text-[#171717] dark:text-white'>
                              Win Rate All Season
                            </span>
                            <FiInfo
                              className='cursor-pointer'
                              onClick={() => setOpenWinRate(true)}
                            />
                          </label>
                          <div className='single-input-unit flex items-center gap-x-2'>
                            <StyledInputFile
                              onChange={(e) => {
                                twibbonize(e, setImageWinRate);
                              }}
                              labelClassName={clsxm(
                                !imageWinRate && '!text-neutral-500',
                                'overflow-hidden'
                              )}
                            >
                              {imageWinRate
                                ? (imageWinRate as File).name
                                : 'Pilih file gambar'}
                            </StyledInputFile>
                            {imageWinRate && (
                              <Button
                                variant='success'
                                className='h-[50px] !rounded-md'
                                onClick={() => setPreviewWinRate(true)}
                              >
                                Lihat
                              </Button>
                            )}
                          </div>
                        </div>
                        {previewWinRate && imageWinRate && (
                          <Lightbox
                            mainSrc={URL.createObjectURL(imageWinRate as File)}
                            onCloseRequest={() => setPreviewWinRate(false)}
                          />
                        )}
                      </div>
                      <div>
                        <div className=''>
                          <label
                            htmlFor='change_name_status'
                            className='mb-2 !flex items-center gap-x-2'
                          >
                            <span className='text-base font-bold text-[#171717] dark:text-white'>
                              Profile
                            </span>
                            <FiInfo
                              className='cursor-pointer'
                              onClick={() => setOpenUploadCaptureProfile(true)}
                            />
                          </label>
                          <div className='single-input-unit flex items-center gap-x-2'>
                            <StyledInputFile
                              onChange={(e) => {
                                twibbonize(e, setImageProfile);
                              }}
                              labelClassName={clsxm(
                                !imageProfile && '!text-neutral-500',
                                'overflow-hidden'
                              )}
                            >
                              {imageProfile
                                ? (imageProfile as File).name
                                : 'Pilih file gambar'}
                            </StyledInputFile>
                            {imageProfile && (
                              <Button
                                variant='success'
                                className='h-[50px] !rounded-md'
                                onClick={() => setPreviewImgProfile(true)}
                              >
                                Lihat
                              </Button>
                            )}
                          </div>
                        </div>
                        {previewImgProfile && imageProfile && (
                          <Lightbox
                            mainSrc={URL.createObjectURL(imageProfile as File)}
                            onCloseRequest={() => setPreviewImgProfile(false)}
                          />
                        )}
                      </div>
                      <div>
                        <div className=''>
                          <label
                            htmlFor='change_name_status'
                            className='mb-2 !flex items-center gap-x-2'
                          >
                            <span className='text-base font-bold text-[#171717] dark:text-white'>
                              Emblem
                            </span>
                            <FiInfo
                              className='cursor-pointer'
                              onClick={() => setOpenEmblem(true)}
                            />
                          </label>
                          <div className='single-input-unit flex items-center gap-x-2'>
                            <StyledInputFile
                              onChange={(e) => {
                                twibbonize(e, setImageEmblem);
                              }}
                              labelClassName={clsxm(
                                !imageEmblem && '!text-neutral-500',
                                'overflow-hidden'
                              )}
                            >
                              {imageEmblem
                                ? (imageEmblem as File).name
                                : 'Pilih file gambar'}
                            </StyledInputFile>
                            {imageEmblem && (
                              <Button
                                variant='success'
                                className='h-[50px] !rounded-md'
                                onClick={() => setPreviewEmblem(true)}
                              >
                                Lihat
                              </Button>
                            )}
                          </div>
                        </div>
                        {previewEmblem && imageEmblem && (
                          <Lightbox
                            mainSrc={URL.createObjectURL(imageEmblem as File)}
                            onCloseRequest={() => setPreviewEmblem(false)}
                          />
                        )}
                      </div>
                      <div className='col-span-2'>
                        <div className=''>
                          <div className='mb-2 flex items-center gap-x-2 '>
                            <label className='flex items-center gap-x-2 text-base font-bold text-[#171717] dark:text-white'>
                              <span>Skin</span>{' '}
                              <FiInfo
                                className='cursor-pointer'
                                onClick={() => setOpenSkin(true)}
                              />
                            </label>
                            <Button
                              variant='success'
                              className='h-[26px] w-[26px] !rounded-full !bg-[#16B81C] !p-1'
                              onClick={() =>
                                imgSkinField < 4 &&
                                setImgSkinField(imgSkinField + 1)
                              }
                            >
                              <HiPlus />
                            </Button>
                            <span className='text-neutral-400'>
                              * Dapat memasukkan gambar lebih dari satu
                            </span>
                          </div>
                          <div className='flex flex-col gap-y-2'>
                            {[...Array(imgSkinField + 1)].map((f, i) => (
                              <div
                                className='single-input-unit flex items-center gap-x-2'
                                key={`${f}${i}`}
                              >
                                <StyledInputFile
                                  onChange={(e) => {
                                    twibbonize(e, (a: File | File[] | null) => {
                                      const b = [
                                        ...((imageSkin as File[]) ?? []),
                                      ];
                                      b[i] = a as File;
                                      setImageSkin(b);
                                    });
                                  }}
                                  labelClassName={clsxm(
                                    (!imageSkin || !(imageSkin as File[])[i]) &&
                                      '!text-neutral-500',
                                    'overflow-hidden'
                                  )}
                                >
                                  {imageSkin && (imageSkin as File[])[i]
                                    ? (imageSkin as File[])[i].name
                                    : 'Pilih file gambar'}
                                </StyledInputFile>
                                {imgSkinField > 0 && (
                                  <XButton
                                    onClick={() => {
                                      const b = [
                                        ...((imageSkin as File[]) ?? []),
                                      ];
                                      b.splice(i, 1);
                                      imgSkinField &&
                                        setImgSkinField(imgSkinField - 1);
                                      setImageSkin(b);
                                    }}
                                  />
                                )}
                                {imageSkin && (imageSkin as File[])[i] && (
                                  <>
                                    <Button
                                      variant='success'
                                      className='h-[50px] !rounded-md'
                                      onClick={() => {
                                        setSkinIndex(i);
                                        setPreviewSkin(true);
                                      }}
                                    >
                                      Lihat
                                    </Button>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        {previewSkin &&
                          imageSkin &&
                          (imageSkin as File[])[skinIndex] && (
                            <Lightbox
                              mainSrc={
                                (imageSkin as File[])[skinIndex] &&
                                URL.createObjectURL(
                                  (imageSkin as File[])[skinIndex]
                                )
                              }
                              nextSrc={
                                (imageSkin as File[]).length >
                                  (skinIndex + 1) %
                                    (imageSkin as File[]).length &&
                                ((imageSkin as File[])[
                                  (skinIndex + 1) % (imageSkin as File[]).length
                                ] as File)
                                  ? URL.createObjectURL(
                                      (imageSkin as File[])[
                                        (skinIndex + 1) %
                                          (imageSkin as File[]).length
                                      ] as File
                                    )
                                  : undefined
                              }
                              prevSrc={
                                ((imageSkin as File[])[
                                  (skinIndex +
                                    (imageSkin as File[]).length -
                                    1) %
                                    (imageSkin as File[]).length
                                ] as File) &&
                                URL.createObjectURL(
                                  (imageSkin as File[])[
                                    (skinIndex +
                                      (imageSkin as File[]).length -
                                      1) %
                                      (imageSkin as File[]).length
                                  ] as File
                                )
                              }
                              onCloseRequest={() => setPreviewSkin(false)}
                              onMovePrevRequest={() =>
                                (imageSkin as File[])[
                                  (skinIndex +
                                    (imageSkin as File[]).length -
                                    1) %
                                    (imageSkin as File[]).length
                                ] &&
                                setSkinIndex(
                                  (skinIndex +
                                    (imageSkin as File[]).length -
                                    1) %
                                    (imageSkin as File[]).length
                                )
                              }
                              onMoveNextRequest={() =>
                                (imageSkin as File[])[
                                  (skinIndex + 1) % (imageSkin as File[]).length
                                ] &&
                                setSkinIndex(
                                  (skinIndex + 1) % (imageSkin as File[]).length
                                )
                              }
                            />
                          )}
                      </div>
                    </div>
                  </div>
                  <div className='upload-btn wow fadeInUp mt-4 !hidden md:!block'>
                    <ButtonGradient
                      disabled={submitBtnDisabled}
                      className='w-full'
                      type='submit'
                      onClick={() => {
                        setIsChecked(false);
                      }}
                    >
                      Preview
                    </ButtonGradient>
                  </div>
                  <ConfirmationDialog
                    open={openDialog}
                    setOpen={setOpenDialog}
                    onClose={() => {
                      setOpenDialog(false);
                    }}
                  >
                    <div className='space-y-4'>
                      <div className='mb-8 flex items-center justify-start p-3'>
                        <h1 className='pb-0 text-3xl !text-black dark:!text-white'>
                          Preview Iklan
                        </h1>
                      </div>
                      <div className='grid grid-cols-2 gap-x-3 gap-y-3 p-3 md:grid-cols-3'>
                        <div>
                          <label>Judul</label>
                          <p className='text-2xl font-bold text-black dark:!text-white'>
                            {getValues('title')}
                          </p>
                        </div>
                        <div>
                          <label>Penjual</label>
                          <p className='text-2xl font-bold text-black dark:!text-white'>
                            {user?.data.name} - @{user?.data.ig_username}
                          </p>
                        </div>
                        <div>
                          <label>Jenis Refund</label>
                          <p className='text-2xl font-bold text-black dark:!text-white'>
                            {
                              jenisRefundOpts.find(
                                (p) => p.value === getValues('jenis_refund')
                              )?.label
                            }
                          </p>
                        </div>
                        <div>
                          <label>Status Akun</label>
                          <p className='text-2xl font-bold text-black dark:!text-white'>
                            {getValues('first_hand_status') === 0
                              ? 'Pribadi'
                              : 'Beli'}
                          </p>
                        </div>
                        <div>
                          <label>Win Rate</label>
                          <p className='text-2xl font-bold text-black dark:!text-white'>
                            {getValues('win_rate')} %
                          </p>
                        </div>
                        <div>
                          <label>Paket Posting Akun</label>
                          <p className='text-2xl font-bold text-black dark:!text-white'>
                            {
                              packageId.find(
                                (p) => p.value === getValues('package_id')
                              )?.label
                            }
                          </p>
                        </div>
                        <div>
                          <label>Change Name Status</label>
                          <p className='text-2xl font-bold text-black dark:!text-white'>
                            {
                              changeNameOpts.find(
                                (p) =>
                                  p.value === getValues('change_name_status')
                              )?.label
                            }
                          </p>
                        </div>
                        <div>
                          <label>Platform</label>
                          <p className='text-2xl font-bold text-black dark:!text-white'>
                            {
                              platformId.find(
                                (p) => p.value === getValues('platform_id')
                              )?.label
                            }
                          </p>
                        </div>
                        <div>
                          <label>Harga Akun</label>
                          <p className='text-2xl font-bold text-black dark:!text-white'>
                            {new Intl.NumberFormat('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                            }).format(getValues('harga_akun'))}
                          </p>
                        </div>
                        <div>
                          <label>Jenis Pembayaran</label>
                          <p className='text-2xl font-bold text-black dark:!text-white'>
                            {
                              jenisPembayaranOpts.find(
                                (p) => p.value === getValues('jenis_pembayaran')
                              )?.label
                            }
                          </p>
                        </div>
                        <div>
                          <label>Screenshot Profile</label>
                          <MyButton
                            className={clsxm(
                              'block',
                              'bg-[#87A4E9]',
                              'border border-tertiary-400',
                              'hover:bg-tertiary-300',
                              'active:bg-tertiary-400',
                              'disabled:bg-tertiary-200 disabled:hover:bg-tertiary-200 disabled:hover:text-black',
                              'py-1'
                            )}
                            onClick={() => setPreviewImgProfile(true)}
                          >
                            Preview
                          </MyButton>
                          {previewImgProfile && (
                            <Lightbox
                              mainSrc={URL.createObjectURL(
                                imageProfile as File
                              )}
                              onCloseRequest={() => setPreviewImgProfile(false)}
                            />
                          )}
                        </div>
                        <div>
                          <label>Screenshot Win Rate</label>
                          <MyButton
                            className={clsxm(
                              'block',
                              'bg-[#87A4E9]',
                              'border border-tertiary-400',
                              'hover:bg-tertiary-300',
                              'active:bg-tertiary-400',
                              'disabled:bg-tertiary-200 disabled:hover:bg-tertiary-200 disabled:hover:text-black',
                              'py-1'
                            )}
                            onClick={() => setPreviewWinRate(true)}
                          >
                            Preview
                          </MyButton>
                          {previewWinRate && (
                            <Lightbox
                              mainSrc={URL.createObjectURL(
                                imageWinRate as File
                              )}
                              onCloseRequest={() => setPreviewWinRate(false)}
                            />
                          )}
                        </div>
                        <div>
                          <label>Screenshot Hero Favorit</label>
                          <MyButton
                            className={clsxm(
                              'block',
                              'bg-[#87A4E9]',
                              'border border-tertiary-400',
                              'hover:bg-tertiary-300',
                              'active:bg-tertiary-400',
                              'disabled:bg-tertiary-200 disabled:hover:bg-tertiary-200 disabled:hover:text-black',
                              'py-1'
                            )}
                            onClick={() => setPreviewWinRateHero(true)}
                          >
                            Preview
                          </MyButton>
                          {previewWinRateHero && (
                            <Lightbox
                              mainSrc={URL.createObjectURL(
                                imageWinRateHero as File
                              )}
                              onCloseRequest={() =>
                                setPreviewWinRateHero(false)
                              }
                            />
                          )}
                        </div>
                        <div>
                          <label>Screenshot Emblem</label>
                          <MyButton
                            className={clsxm(
                              'block',
                              'bg-[#87A4E9]',
                              'border border-tertiary-400',
                              'hover:bg-tertiary-300',
                              'active:bg-tertiary-400',
                              'disabled:bg-tertiary-200 disabled:hover:bg-tertiary-200 disabled:hover:text-black',
                              'py-1'
                            )}
                            onClick={() => setPreviewEmblem(true)}
                          >
                            Preview
                          </MyButton>
                          {previewEmblem && (
                            <Lightbox
                              mainSrc={URL.createObjectURL(imageEmblem as File)}
                              onCloseRequest={() => setPreviewEmblem(false)}
                            />
                          )}
                        </div>
                        <div>
                          <label>Screenshot Skin</label>
                          <MyButton
                            className={clsxm(
                              'block',
                              'bg-[#87A4E9]',
                              'border border-tertiary-400',
                              'hover:bg-tertiary-300',
                              'active:bg-tertiary-400',
                              'disabled:bg-tertiary-200 disabled:hover:bg-tertiary-200 disabled:hover:text-black',
                              'py-1'
                            )}
                            onClick={() => setPreviewSkin(true)}
                          >
                            Preview
                          </MyButton>
                          {previewSkin && (
                            <Lightbox
                              mainSrc={URL.createObjectURL(
                                (imageSkin as File[])[skinIndex] as File
                              )}
                              nextSrc={URL.createObjectURL(
                                (imageSkin as File[])[
                                  (skinIndex + 1) % (imageSkin as File[]).length
                                ] as File
                              )}
                              prevSrc={URL.createObjectURL(
                                (imageSkin as File[])[
                                  (skinIndex +
                                    (imageSkin as File[]).length -
                                    1) %
                                    (imageSkin as File[]).length
                                ] as File
                              )}
                              onCloseRequest={() => setPreviewSkin(false)}
                              onMovePrevRequest={() =>
                                setSkinIndex(
                                  (skinIndex +
                                    (imageSkin as File[]).length -
                                    1) %
                                    (imageSkin as File[]).length
                                )
                              }
                              onMoveNextRequest={() =>
                                setSkinIndex(
                                  (skinIndex + 1) % (imageSkin as File[]).length
                                )
                              }
                            />
                          )}
                        </div>
                        <div>
                          <label>Binding Account</label>
                          <div className='mt-2 flex max-h-36 flex-wrap gap-x-1 gap-y-1 overflow-auto'>
                            {getValues('account_bind')
                              ?.map(
                                (v) =>
                                  accountBindOpts.find((p) => p.value === v)
                                    ?.label
                              )
                              .map((v, i) => (
                                <div
                                  className='rounded bg-[#EFEFEF] p-[4px_15px] dark:bg-neutral-200'
                                  key={i}
                                >
                                  <p className='m-0'>{v}</p>
                                </div>
                              ))}
                          </div>
                        </div>
                        <div>
                          <label>Favorite Heroes</label>
                          <div className='mt-2 flex max-h-36 flex-wrap gap-x-1 gap-y-1 overflow-auto'>
                            {getValues('favorite_heroes')
                              ?.map(
                                (v) =>
                                  favHeroesOpts.find((p) => p.value === v)
                                    ?.label
                              )
                              .map((v, i) => (
                                <div
                                  className='rounded bg-[#EFEFEF] p-[4px_15px] dark:bg-neutral-200'
                                  key={i}
                                >
                                  <p className='m-0'>{v}</p>
                                </div>
                              ))}
                          </div>
                        </div>
                        <div>
                          <label>Emblem</label>
                          <div className='flex max-h-36 flex-wrap gap-x-2 gap-y-1 overflow-auto rounded-xl p-1'>
                            {getValues('total_emblem')?.map(
                              ({ id_emblem, level }, i) => (
                                <div
                                  className='flex items-center justify-center gap-x-3 rounded bg-[#EFEFEF] p-[4px_15px] dark:bg-neutral-200'
                                  key={`${id_emblem}${i}`}
                                >
                                  <p className='m-0'>
                                    {
                                      emblemOpts.find(
                                        (v) => v.value == id_emblem
                                      )?.label
                                    }
                                  </p>
                                  <p className='className text-[]] m-0 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#D3EBF8] !text-sm'>
                                    {level}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                        <div>
                          <label>Skin Rare</label>
                          <div className='flex max-h-36 flex-wrap gap-x-2 gap-y-1 overflow-auto rounded-xl p-1'>
                            {getValues('total_skin_rare')?.map(
                              ({ jenis, total_skin }, i) => (
                                <div
                                  className='flex items-center justify-center gap-x-3 rounded bg-[#EFEFEF] p-[4px_15px] dark:bg-neutral-200'
                                  key={`${jenis}${i}`}
                                >
                                  <p className='m-0'>{jenis}</p>
                                  <p className='className text-[]] m-0 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#D3EBF8] !text-sm'>
                                    {total_skin}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                        <div>
                          <label>Recall</label>
                          <div className='flex max-h-36 flex-wrap gap-x-1 gap-y-1 overflow-auto'>
                            {getValues('recall_effect').map((v, i) => (
                              <div
                                className='rounded bg-[#EFEFEF] p-[4px_15px] dark:bg-neutral-200'
                                key={i}
                              >
                                <p className='m-0'>{v}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className='flex flex-col items-center justify-center gap-y-4 bg-[#F1F1F1] p-3'>
                        <div className='space-y-4'>
                          <div className='text-center'>
                            <h3>Rincian Pembayaran</h3>
                          </div>
                          <div className='grid grid-cols-2'>
                            <div>
                              <p className='text-black dark:!text-white'>
                                Biaya Posting -{' '}
                                {
                                  packages?.data.data.find(
                                    (v) => v.id === getValues('package_id')
                                  )?.name
                                }
                              </p>
                              <hr />
                              <p className='text-black dark:!text-white'>
                                Biaya Admin -{' '}
                                {
                                  banks?.data.data.find(
                                    (v) =>
                                      v.id === getValues('jenis_pembayaran')
                                  )?.name
                                }
                              </p>
                              <p className='mt-12 text-xl font-bold text-black dark:!text-white'>
                                TOTAL
                              </p>
                            </div>
                            <div className='text-right'>
                              <p className='text-black dark:!text-white'>
                                {toIDRCurrency(
                                  packages?.data.data.find(
                                    (v) => v.id === getValues('package_id')
                                  )?.price
                                )}
                              </p>
                              <hr />
                              <p className='text-black dark:!text-white'>
                                {toIDRCurrency(
                                  feePayment?.data.data &&
                                    feePayment?.data.data.length > 0
                                    ? feePayment?.data.data[0].fee_flat
                                    : 0
                                )}
                              </p>
                              <p className='mt-12 text-xl font-bold text-black dark:!text-white'>
                                {toIDRCurrency(
                                  packages?.data.data.find(
                                    (v) => v.id === getValues('package_id')
                                  )?.price ??
                                    0 +
                                      (feePayment?.data.data &&
                                      feePayment?.data.data.length > 0
                                        ? feePayment?.data.data[0].fee_flat
                                        : 0)
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                        <Captcha
                          show={openDialog}
                          ref={recaptchaRef}
                          onChange={(token) => setResponseCapthca(token)}
                        />
                        <div>
                          <input
                            type='checkbox'
                            value='agreed'
                            checked={isChecked}
                            onChange={() => setIsChecked((v) => !v)}
                            className='mr-4'
                          />
                          <p className='inline rounded-md bg-rose-100 text-red-500'>
                            Data yang diisi sudah benar dan tidak dapat diubah
                            jika sudah disubmit
                          </p>
                        </div>
                        <div className='flex items-center justify-center'>
                          <ButtonGradient
                            disabled={!isChecked || submitBtnDisabled}
                            className='text-black'
                            onClick={() => handleSubmit(onSubmit)()}
                          >
                            Submit Iklan
                          </ButtonGradient>
                        </div>
                      </div>
                    </div>
                  </ConfirmationDialog>
                </div>
                <div className='col-lg-4'>
                  <div className='upload-btn wow fadeInUp mt-4 md:!hidden'>
                    <ButtonGradient
                      disabled={submitBtnDisabled}
                      className='text-black'
                      type='submit'
                      onClick={() => setIsChecked(false)}
                    >
                      Preview
                    </ButtonGradient>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Modal
        open={openJenisRefund}
        onClose={onCloseJenisRefund}
        center
        classNames={{
          modal: 'rounded-xl p-0 overflow-y-auto',
          root: 'overflow-y-auto',
          modalContainer: 'overflow-y-auto',
        }}
        closeIcon={<XButton />}
      >
        <div className='p-6'>
          <h1 className='mb-4 text-2xl'>Jenis Refund</h1>
          <h2 className='mb-4 text-xl font-normal'>
            Berikut adalah penjelasan jenis-jenis refund yang yang terdapat
            dalam penjualan akun
          </h2>
          <div className='flex gap-x-2'>
            <p className='m-0'>1. </p>
            <p className='m-0'>
              <span className='font-bold'>Refund player</span> yaitu
              pengembalian dana untuk pembeli jika terjadi problem pada akun
              yang dibeli, namun jika akunnya dijual lagi oleh si pembeli refund
              akan tidak berlaku
            </p>
          </div>
          <div className='flex gap-x-2'>
            <p className='m-0'>2. </p>
            <p className='m-0'>
              <span className='font-bold'>Refund full</span> yaitu pengembalian
              dana secara penuh apapun kondisinya
            </p>
          </div>
          <div className='flex gap-x-2'>
            <p className='m-0'>3. </p>
            <p className='m-0'>
              <span className='font-bold'>No Refund</span> yaitu tidak ada
              refund setelah transaksi berhasil
            </p>
          </div>
        </div>
      </Modal>
      <Modal
        open={openChangeNameStatus}
        onClose={onCloseChangeNameStatus}
        center
        classNames={{
          modal: 'rounded-xl p-0 overflow-y-auto',
          root: 'overflow-y-auto',
          modalContainer: 'overflow-y-auto',
        }}
        closeIcon={<XButton />}
      >
        <div className='p-6'>
          <h1 className='mb-4 text-2xl'>Change Name Status</h1>
          <h2 className='mb-4 text-xl font-normal'>
            Change Name ON artinya masih bisa ganti nama dari event top up
            setiap ganti season yang misinya disuru top up 3 hari berturut turut
            itu, jika OFF berarti sudah digunakan change name nya
          </h2>
        </div>
      </Modal>
      <Modal
        open={openUploadCaptureProfile}
        onClose={onCloseUploadCaptureProfile}
        center
        classNames={{
          modal: 'rounded-xl p-0 overflow-y-auto',
          root: 'overflow-y-auto',
          modalContainer: 'overflow-y-auto',
        }}
        closeIcon={<XButton />}
      >
        <div className='p-6'>
          <h1 className='mb-4 text-2xl'>Cara Upload Capture Profile</h1>
          <h2 className='mb-4 text-xl font-normal'>
            ID harap ditutup sesuai dengan contoh berikut!!!
          </h2>
          <img src='/images/posting/PROFILE.jpg' alt='profile' />
        </div>
      </Modal>
      <Modal
        open={openWinRate}
        onClose={onCloseWinRate}
        center
        classNames={{
          modal: 'rounded-xl p-0 overflow-y-auto',
          root: 'overflow-y-auto',
          modalContainer: 'overflow-y-auto',
        }}
        closeIcon={<XButton />}
      >
        <div className='p-6'>
          <h1 className='mb-4 text-2xl'>
            Cara Upload Capture Win Rate All Season
          </h1>
          <img src='/images/posting/WIN_RATE_ALL_SEASON.jpg' alt='profile' />
        </div>
      </Modal>
      <Modal
        open={openFavHero}
        onClose={onCloseFavHero}
        center
        classNames={{
          modal: 'rounded-xl p-0 overflow-y-auto',
          root: 'overflow-y-auto',
          modalContainer: 'overflow-y-auto',
        }}
        closeIcon={<XButton />}
      >
        <div className='p-6'>
          <h1 className='mb-4 text-2xl'>Cara Upload Capture Hero Favorit</h1>
          <img src='/images/posting/HERO_FAV.jpg' alt='profile' />
        </div>
      </Modal>
      <Modal
        open={openEmblem}
        onClose={onCloseEmblem}
        center
        classNames={{
          modal: 'rounded-xl p-0 overflow-y-auto',
          root: 'overflow-y-auto',
          modalContainer: 'overflow-y-auto',
        }}
        closeIcon={<XButton />}
      >
        <div className='p-6'>
          <h1 className='mb-4 text-2xl'>Cara Upload Emblem</h1>
          <img src='/images/posting/EMBLEM.jpg' alt='profile' />
        </div>
      </Modal>
      <Modal
        open={openSkin}
        onClose={onCloseSkin}
        center
        classNames={{
          modal: 'rounded-xl p-0 overflow-y-auto',
          root: 'overflow-y-auto',
          modalContainer: 'overflow-y-auto',
        }}
        closeIcon={<XButton />}
      >
        <div className='p-6'>
          <h1 className='mb-4 text-2xl'>Cara Upload Skin</h1>
          <img src='/images/posting/SKIN.jpg' alt='profile' />
        </div>
      </Modal>
    </main>
  );
};

export default UploadMain;
