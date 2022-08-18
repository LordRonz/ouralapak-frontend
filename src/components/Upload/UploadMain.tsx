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
import { HiPlus } from 'react-icons/hi';
import Lightbox from 'react-image-lightbox';
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
    { value: 0, label: 'Non-aktif' },
    { value: 1, label: 'Aktif' },
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
      label: 'Akun pribadi',
    },
    {
      value: 1,
      label: 'Akun beli',
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
        <div className='container'>
          <div className='upload-wrapper mb-10'>
            <form className='upload-form' onSubmit={handleSubmit(onSubmit)}>
              <div className='row'>
                <div className=''>
                  <div className='row wow fadeInUp gap-y-3'>
                    <div className='col-md-8'>
                      <div className='single-input-unit'>
                        <label>Judul</label>
                        <input
                          type='text'
                          placeholder='Isi Judul'
                          {...register('title', {
                            required: 'Judul harus diisi',
                          })}
                        />
                      </div>
                      <p className='text-red-500'>{errors.title?.message}</p>
                    </div>
                    <div className='col-md-4'>
                      <div className='single-input-unit'>
                        <label htmlFor='jenis_refund'>Jenis Refund</label>
                        <Controller
                          control={control}
                          defaultValue={jenisRefundOpts[0].value}
                          name='jenis_refund'
                          render={({ field: { onChange, value } }) => (
                            <Select
                              className={clsxm('py-3 pt-0')}
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
                              className={clsxm('py-3 pt-0')}
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
                        <div className='flex gap-x-1'>
                          <input
                            type='number'
                            step='any'
                            onWheel={(e) =>
                              e.target instanceof HTMLElement && e.target.blur()
                            }
                            placeholder='0'
                            {...register('win_rate', {
                              required: 'Win rate harus diisi',
                              pattern: {
                                value: /^(\d{0,2}(\.\d{1,2})?|100(\.00?)?)$/,
                                message:
                                  'Win rate haruslah di antara 0 - 100 dan maksimum 2 desimal di belakang koma',
                              },
                              valueAsNumber: true,
                            })}
                          />
                          <div className='extension flex items-center justify-center'>
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
                              className={clsxm('py-3 pt-0')}
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
                              className={clsxm('py-3 pt-0')}
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
                          placeholder='0'
                          {...register('total_skin', {
                            required: 'Total skin harus diisi',
                            min: {
                              value: 0,
                              message: 'Minimum jumlah skin adalah 0',
                            },
                            valueAsNumber: true,
                          })}
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
                              className={clsxm('py-3 pt-0')}
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
                        <label>Status Ganti Nama Akun</label>
                        <Controller
                          control={control}
                          defaultValue={changeNameOpts[0].value}
                          name='change_name_status'
                          render={({ field: { onChange, value } }) => (
                            <Select
                              styles={customSelectStyles}
                              className={clsxm('py-3 pt-0')}
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
                          placeholder='0'
                          {...register('total_hero', {
                            required: 'Total hero harus diisi',
                            min: {
                              value: 1,
                              message: 'Minimum jumlah hero adalah 1',
                            },
                            valueAsNumber: true,
                          })}
                        />
                      </div>
                      <p className='text-red-500'>
                        {errors.total_hero?.message}
                      </p>
                    </div>
                    <div className='col-md-4'>
                      <div className='single-input-unit'>
                        <label>Harga Akun (IDR)</label>
                        <div className='flex gap-x-1'>
                          <div className='extension flex items-center justify-center'>
                            Rp.
                          </div>
                          <input
                            type='number'
                            onWheel={(e) =>
                              e.target instanceof HTMLElement && e.target.blur()
                            }
                            placeholder='10000'
                            {...register('harga_akun', {
                              required: 'Harga akun harus diisi',
                              min: {
                                value: 1,
                                message: 'Minimum harga adalah 1',
                              },
                              valueAsNumber: true,
                            })}
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
                              styles={customSelectStylesMulti}
                              className={clsxm('py-3 pt-0')}
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
                        <label htmlFor='favorite_heroes'>Hero Favorit</label>
                        <Controller
                          control={control}
                          defaultValue={[]}
                          name='favorite_heroes'
                          render={({ field: { onChange, value } }) => (
                            <Select
                              styles={customSelectStylesMulti}
                              className={clsxm('py-3 pt-0')}
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
                          <label>Skin Rare</label>
                          <Button
                            variant='success'
                            className='!rounded-full !p-1'
                            onClick={() =>
                              totalSkinRareFields.append({
                                jenis: 'medium',
                                total_skin: undefined,
                              })
                            }
                          >
                            <HiPlus />
                          </Button>
                        </div>
                        <div className='max-h-80 space-y-4 overflow-auto'>
                          <div className='rounded-xl border-primary-200'>
                            {!!totalSkinRareFields.fields.length && (
                              <div className='flex justify-around'>
                                <label
                                  className='mr-2 basis-3/4'
                                  htmlFor='jenis'
                                >
                                  Jenis
                                </label>
                                <label
                                  className='mr-2 basis-1/4'
                                  htmlFor='total_skin'
                                >
                                  Total Skin
                                </label>
                              </div>
                            )}
                            <div className='flex flex-col gap-y-3'>
                              {totalSkinRareFields.fields.map(
                                (field, index) => (
                                  <div
                                    className='flex justify-around'
                                    key={field.id}
                                  >
                                    <div className='mr-2 basis-3/4'>
                                      <input
                                        type='text'
                                        placeholder='Jenis'
                                        {...register(
                                          `total_skin_rare.${index}.jenis` as const,
                                          {
                                            required: 'Jenis harus diisi',
                                          }
                                        )}
                                        className='mb-0'
                                      />
                                    </div>
                                    <div className='mr-2 basis-1/4'>
                                      <input
                                        type='number'
                                        onWheel={(e) =>
                                          e.target instanceof HTMLElement &&
                                          e.target.blur()
                                        }
                                        placeholder='0'
                                        {...register(
                                          `total_skin_rare.${index}.total_skin` as const,
                                          {
                                            required: 'Total skin harus diisi',
                                            min: {
                                              value: 1,
                                              message:
                                                'Minimum jumlah skin adalah 1',
                                            },
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
                          <label>Emblem</label>
                          {totalEmblemFields.fields.length <
                            emblemOpts.length && (
                            <Button
                              variant='success'
                              className='!rounded-full !p-1'
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
                                  className='mr-2 basis-3/4'
                                  htmlFor='jenis'
                                >
                                  Nama
                                </label>
                                <label
                                  className='mr-2 basis-1/4'
                                  htmlFor='total_skin'
                                >
                                  Level
                                </label>
                              </div>
                            )}
                            <div className='space-y-2'>
                              {totalEmblemFields.fields.map((field, index) => (
                                <div className='flex gap-x-1' key={field.id}>
                                  <div className='mr-2 basis-3/4'>
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
                                          className={clsxm('py-2 pt-0')}
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
                                  <div className='mr-2 basis-1/4'>
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
                                      className='mb-0'
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
                            className='!rounded-full !p-1'
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
                                  placeholder={`Recall effect #${index + 1}`}
                                  {...register(`recall_effect.${index}`, {
                                    required: 'Recall effect harus diisi',
                                  })}
                                  className='mb-0'
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
                    </div>
                    <div className='col-md-6 grid grid-cols-2 gap-y-4 gap-x-4'>
                      <div>
                        <div className=''>
                          <label className='mb-2 text-base font-bold text-[#171717] dark:text-white'>
                            Win Rate Hero
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
                                : 'Silahkan pilih gambar'}
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
                          <label className='mb-2 text-base font-bold text-[#171717] dark:text-white'>
                            Win Rate
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
                                : 'Silahkan pilih gambar'}
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
                          <label className='mb-2 text-base font-bold text-[#171717] dark:text-white'>
                            Profile
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
                                : 'Silahkan pilih gambar'}
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
                          <label className='mb-2 text-base font-bold text-[#171717] dark:text-white'>
                            Emblem
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
                                : 'Silahkan pilih gambar'}
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
                          <label className='mb-2 space-x-4 text-base font-bold text-[#171717] dark:text-white'>
                            <span>Skin</span>{' '}
                            <Button
                              variant='success'
                              className='!rounded-full !p-1'
                              onClick={() =>
                                imgSkinField < 4 &&
                                setImgSkinField(imgSkinField + 1)
                              }
                            >
                              <HiPlus />
                            </Button>
                            <span className='text-neutral-400'>
                              * dapat memilih lebih dari satu
                            </span>
                          </label>
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
                                    : 'Silahkan pilih gambar'}
                                </StyledInputFile>
                                {imgSkinField > 0 && (
                                  <Button
                                    variant='danger'
                                    className='h-[50px] !rounded-md'
                                    onClick={() => {
                                      const b = [
                                        ...((imageSkin as File[]) ?? []),
                                      ];
                                      b.splice(i, 1);
                                      imgSkinField &&
                                        setImgSkinField(imgSkinField - 1);
                                      setImageSkin(b);
                                    }}
                                  >
                                    Cancel
                                  </Button>
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
                      className='w-full text-black'
                      type='submit'
                      onClick={() => setIsChecked(false)}
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
                      <div className='mb-8 flex items-center justify-center'>
                        <h1 className='!text-black dark:!text-white'>
                          Preview Iklan
                        </h1>
                      </div>
                      <div className='grid gap-x-12 gap-y-4 md:grid-cols-3'>
                        <div className='space-y-4'>
                          <div>
                            <label>Judul Iklan</label>
                            <p className='text-2xl font-bold text-black dark:!text-white'>
                              {getValues('title')}
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
                            <label>Status Ganti Nama Akun</label>
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
                            <label>Win Rate</label>
                            <p className='text-2xl font-bold text-black dark:!text-white'>
                              {getValues('win_rate')} %
                            </p>
                          </div>
                          <div>
                            <label>Jumlah Hero</label>
                            <p className='text-2xl font-bold text-black dark:!text-white'>
                              {getValues('total_hero')}
                            </p>
                          </div>
                          <div>
                            <label>Jumlah Skin</label>
                            <p className='text-2xl font-bold text-black dark:!text-white'>
                              {getValues('total_skin')}
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
                            <label>Harga Akun (IDR)</label>
                            <p className='text-2xl font-bold text-black dark:!text-white'>
                              {new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                              }).format(getValues('harga_akun'))}
                            </p>
                          </div>
                        </div>
                        <div className='space-y-4'>
                          <div>
                            <label>Screenshot profile</label>
                            <MyButton
                              className={clsxm(
                                'block',
                                'bg-green-300 text-black',
                                'border border-green-500',
                                'hover:bg-green-500 hover:text-green-50',
                                'active:bg-green-600',
                                'disabled:bg-green-300 disabled:hover:bg-green-300 disabled:hover:text-black',
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
                                onCloseRequest={() =>
                                  setPreviewImgProfile(false)
                                }
                              />
                            )}
                          </div>
                          <div>
                            <label>Screenshot win rate</label>
                            <MyButton
                              className={clsxm(
                                'block',
                                'bg-green-300 text-black',
                                'border border-green-500',
                                'hover:bg-green-500 hover:text-green-50',
                                'active:bg-green-600',
                                'disabled:bg-green-300 disabled:hover:bg-green-300 disabled:hover:text-black',
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
                            <label>Screenshot win rate hero</label>
                            <MyButton
                              className={clsxm(
                                'block',
                                'bg-green-300 text-black',
                                'border border-green-500',
                                'hover:bg-green-500 hover:text-green-50',
                                'active:bg-green-600',
                                'disabled:bg-green-300 disabled:hover:bg-green-300 disabled:hover:text-black',
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
                            <label>Screenshot emblem</label>
                            <MyButton
                              className={clsxm(
                                'block',
                                'bg-green-300 text-black',
                                'border border-green-500',
                                'hover:bg-green-500 hover:text-green-50',
                                'active:bg-green-600',
                                'disabled:bg-green-300 disabled:hover:bg-green-300 disabled:hover:text-black',
                                'py-1'
                              )}
                              onClick={() => setPreviewEmblem(true)}
                            >
                              Preview
                            </MyButton>
                            {previewEmblem && (
                              <Lightbox
                                mainSrc={URL.createObjectURL(
                                  imageEmblem as File
                                )}
                                onCloseRequest={() => setPreviewEmblem(false)}
                              />
                            )}
                          </div>
                          <div>
                            <label>Screenshot skin</label>
                            <MyButton
                              className={clsxm(
                                'block',
                                'bg-green-300 text-black',
                                'border border-green-500',
                                'hover:bg-green-500 hover:text-green-50',
                                'active:bg-green-600',
                                'disabled:bg-green-300 disabled:hover:bg-green-300 disabled:hover:text-black',
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
                                    (skinIndex + 1) %
                                      (imageSkin as File[]).length
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
                                    (skinIndex + 1) %
                                      (imageSkin as File[]).length
                                  )
                                }
                              />
                            )}
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
                            <label className='font-bold'>
                              Jenis Pembayaran
                            </label>
                            <p className='text-2xl font-bold text-black dark:!text-white'>
                              {
                                jenisPembayaranOpts.find(
                                  (p) =>
                                    p.value === getValues('jenis_pembayaran')
                                )?.label
                              }
                            </p>
                          </div>
                        </div>
                        <div className='space-y-4'>
                          <div>
                            <label>Binding Account</label>
                            <div className='flex max-h-36 flex-wrap gap-x-1 gap-y-1 overflow-auto'>
                              {getValues('account_bind')
                                ?.map(
                                  (v) =>
                                    accountBindOpts.find((p) => p.value === v)
                                      ?.label
                                )
                                .map((v, i) => (
                                  <div
                                    className='rounded-xl bg-neutral-600 px-2 py-1 dark:bg-neutral-200'
                                    key={i}
                                  >
                                    <p className='m-0 text-white dark:!text-black'>
                                      {v}
                                    </p>
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div>
                            <label>Favorite Heroes</label>
                            <div className='flex max-h-36 flex-wrap gap-x-1 gap-y-1 overflow-auto rounded-xl border-2 p-1'>
                              {getValues('favorite_heroes')
                                ?.map(
                                  (v) =>
                                    favHeroesOpts.find((p) => p.value === v)
                                      ?.label
                                )
                                .map((v, i) => (
                                  <div
                                    className='rounded-xl bg-neutral-600 px-2 py-1 dark:bg-neutral-200'
                                    key={i}
                                  >
                                    <p className='m-0 text-white dark:!text-black'>
                                      {v}
                                    </p>
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div>
                            <label>Emblem</label>
                            <div className='flex max-h-36 flex-wrap gap-x-2 gap-y-1 overflow-auto rounded-xl border-2 p-1'>
                              {getValues('total_emblem')?.map(
                                ({ id_emblem, level }, i) => (
                                  <div
                                    key={`${id_emblem}${i}`}
                                    className='flex gap-x-1'
                                  >
                                    <div className='self-end rounded-xl bg-neutral-600 px-2 py-1 dark:bg-neutral-200'>
                                      <p className='m-0 text-white dark:!text-black'>
                                        {
                                          emblemOpts.find(
                                            (v) => v.value == id_emblem
                                          )?.label
                                        }
                                      </p>
                                    </div>
                                    <div className='self-end rounded-xl bg-neutral-600 px-2 py-1 dark:bg-neutral-200'>
                                      <p className='m-0 text-white dark:!text-black'>
                                        {level}
                                      </p>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                          <div>
                            <label>Skin Rare</label>
                            <div className='flex max-h-36 flex-wrap gap-x-2 gap-y-1 overflow-auto rounded-xl border-2 p-1'>
                              {getValues('total_skin_rare')?.map(
                                ({ jenis, total_skin }, i) => (
                                  <div
                                    key={`${jenis}${i}`}
                                    className='flex gap-x-1'
                                  >
                                    <div className='self-end rounded-xl bg-neutral-600 px-2 py-1 dark:bg-neutral-200'>
                                      <p className='m-0 text-white dark:!text-black'>
                                        {jenis}
                                      </p>
                                    </div>
                                    <div className='self-end rounded-xl bg-neutral-600 px-2 py-1 dark:bg-neutral-200'>
                                      <p className='m-0 text-white dark:!text-black'>
                                        {total_skin}
                                      </p>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                          <div>
                            <label>Recall Effect</label>
                            <div className='flex max-h-36 flex-wrap gap-x-1 gap-y-1 overflow-auto rounded-xl border-2 p-1'>
                              {getValues('recall_effect').map((v, i) => (
                                <div
                                  className='rounded-xl bg-neutral-600 px-2 py-1 dark:bg-neutral-200'
                                  key={i}
                                >
                                  <p className='m-0 text-white dark:!text-black'>
                                    {v}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='flex flex-col items-center justify-center gap-y-4'>
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
                      Submit Iklan
                    </ButtonGradient>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UploadMain;
