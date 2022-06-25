import axios from 'axios';
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
import Lightbox from 'react-image-lightbox';
import Select from 'react-select';
import { Theme, toast } from 'react-toastify';
import useSWR from 'swr';

import MyButton from '@/components/buttons/Button';
import ButtonGradient from '@/components/buttons/ButtonGradient';
import Captcha from '@/components/Common/Captcha';
import Breadcrumbs from '@/components/Common/PageTitle';
import ConfirmationDialog from '@/components/Upload/Dialog';
import DragDropSection from '@/components/Upload/DragDropSection';
import { API_URL } from '@/constant/config';
import clsxm from '@/lib/clsxm';
import getAuthHeader from '@/lib/getAuthHeader';
import toIDRCurrency from '@/lib/toIDRCurrency';
import useAuthHeader from '@/services/authHeader';
import Bank from '@/types/bank';
import BindingAcc from '@/types/bindingAccount';
import EmblemMaster from '@/types/emblemMaster';
import HeroMaster from '@/types/heroMaster';
import Packages from '@/types/packages';
import Pagination from '@/types/pagination';
import Platform from '@/types/platform';
import Refund from '@/types/refund';

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
    total_skin: number;
  }[];
  total_emblem: {
    id_emblem: number;
    level: number;
  }[];
  recall_effect: string[];
  jenis_refund: number;
  harga_akun: number;
  total_pembayaran: number;
  jenis_pembayaran: number;
  package_id: number;
  image_profile: string;
  image_win_rate: string;
  image_win_rate_hero: string;
  image_emblem: string;
  image_skin: string[];
};

// const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

const UploadMain = () => {
  const {
    control,
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<IFormInput>({
    defaultValues: {
      recall_effect: [],
    },
  });

  const router = useRouter();
  useEffect(() => {
    (async () => {
      axios
        .get(`${API_URL}/profile`, {
          headers: { Authorization: getAuthHeader() ?? '' },
        })
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

  const [openDialog, setOpenDialog] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const totalSkinRareFields = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'total_skin_rare', // unique name for your Field Array
  });

  const totalEmblemFields = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'total_emblem', // unique name for your Field Array
  });
  const [recallEffectCnt, setRecallEffectCnt] = useState<number>(0);

  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);

  const { theme } = useTheme();

  const { data: banks } = useSWR<{
    data: { data: Bank[]; pagination: Pagination };
    message: string;
    success: boolean;
  }>(`${API_URL}/master/bank`);

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

  const changeNameOpts = [
    { value: 0, label: 'Change name non-aktif' },
    { value: 1, label: 'Change name aktif' },
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

  const jenisRefundOpts = refund?.data.data.map((re) => ({
    value: re.id,
    label: re.desc,
  }));

  const jenisPembayaranOpts = banks?.data.data.map((b) => ({
    value: b.id,
    label: b.rekening_name,
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
      form.append(v[0], JSON.stringify(v[1]));
    });
    if (Array.isArray(imageProfile)) {
      imageProfile.forEach((v) => form.append('image_profile', v));
    } else {
      form.append('image_profile', imageProfile);
    }
    if (Array.isArray(imageWinRate)) {
      imageWinRate.forEach((v) => form.append('image_win_rate', v));
    } else {
      form.append('image_win_rate', imageWinRate);
    }
    if (Array.isArray(imageWinRateHero)) {
      imageWinRateHero.forEach((v) => form.append('image_win_rate_hero', v));
    } else {
      form.append('image_win_rate_hero', imageWinRateHero);
    }
    if (Array.isArray(imageEmblem)) {
      imageEmblem.forEach((v) => form.append('image_emblem', v));
    } else {
      form.append('image_emblem', imageEmblem);
    }
    if (Array.isArray(imageSkin)) {
      imageSkin.forEach((v) => form.append('image_skin', v));
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
    const res = await toast.promise(
      axios.post(
        stringifyUrl({
          url: `${API_URL}/user/iklan`,
          query: {
            recaptcha_response: responseCaptcha,
          },
        }),
        form,
        { headers }
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
          render: () => {
            setSubmitBtnDisabled(false);
            setOpenDialog(false);
            return 'Gagal Submit Iklan!';
          },
        },
      }
    );

    const no_invoice = res.data.data.no_invoice as string;

    router.push(`/invoice/${no_invoice}`);
  };

  const recaptchaRef = React.createRef<ReCAPTCHA>();

  if (
    !accountBindOpts ||
    !favHeroesOpts ||
    !emblemOpts ||
    !jenisRefundOpts ||
    !jenisPembayaranOpts ||
    !platformId ||
    !packageId
  ) {
    return <></>;
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbTitle='Posting Iklan'
        breadcrumbSubTitle='Posting Iklan'
      />

      <div className='upload-area pt-130 pb-90'>
        <div className='container'>
          <div className='upload-wrapper mb-10'>
            <form className='upload-form' onSubmit={handleSubmit(onSubmit)}>
              <div className='row'>
                <div className='col-lg-8'>
                  <div className='row wow fadeInUp'>
                    <div className='col-md-6'>
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
                    <div className='col-md-6'>
                      <div className='single-input-unit'>
                        <label htmlFor='platform_id'>Platform</label>
                        <Controller
                          control={control}
                          defaultValue={platformId[0].value}
                          name='platform_id'
                          render={({ field: { onChange, value } }) => (
                            <Select
                              className={clsxm()}
                              options={platformId}
                              value={platformId.find((c) => c.value === value)}
                              onChange={(val) => onChange(val?.value)}
                            />
                          )}
                        />
                      </div>
                      <p className='text-red-500'>
                        {errors.platform_id?.message}
                      </p>
                    </div>
                    <div className='col-md-6'>
                      <div className='single-input-unit'>
                        <label htmlFor='platform_id'>First Hand Status</label>
                        <Controller
                          control={control}
                          defaultValue={firstHandStatusOpts[0].value}
                          name='first_hand_status'
                          render={({ field: { onChange, value } }) => (
                            <Select
                              className={clsxm()}
                              options={firstHandStatusOpts}
                              value={firstHandStatusOpts.find(
                                (c) => c.value === value
                              )}
                              onChange={(val) => onChange(val?.value)}
                            />
                          )}
                        />
                      </div>
                      <p className='text-red-500'>
                        {errors.first_hand_status?.message}
                      </p>
                    </div>
                    <div className='col-md-6'>
                      <div className='single-input-unit'>
                        <label>Change Name Status</label>
                        <Controller
                          control={control}
                          defaultValue={changeNameOpts[0].value}
                          name='change_name_status'
                          render={({ field: { onChange, value } }) => (
                            <Select
                              className={clsxm()}
                              options={changeNameOpts}
                              value={changeNameOpts.find(
                                (c) => c.value === value
                              )}
                              onChange={(val) => onChange(val?.value)}
                            />
                          )}
                        />
                      </div>
                      <p className='text-red-500'>
                        {errors.change_name_status?.message}
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
                              className={clsxm()}
                              options={accountBindOpts}
                              value={accountBindOpts.filter((c) =>
                                value.includes(c.value)
                              )}
                              onChange={(val) =>
                                onChange(val.map((c) => c.value))
                              }
                              isMulti
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='single-input-unit'>
                        <label htmlFor='favorite_heroes'>Favorite Heroes</label>
                        <Controller
                          control={control}
                          defaultValue={[]}
                          name='favorite_heroes'
                          render={({ field: { onChange, value } }) => (
                            <Select
                              className={clsxm()}
                              options={favHeroesOpts}
                              value={favHeroesOpts.filter((c) =>
                                value.includes(c.value)
                              )}
                              onChange={(val) =>
                                onChange(val.map((c) => c.value))
                              }
                              isMulti
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='single-input-unit'>
                        <label>Win Rate</label>
                        <input
                          type='number'
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
                      </div>
                      <p className='text-red-500'>{errors.win_rate?.message}</p>
                    </div>
                    <div className='col-md-6'>
                      <div className='single-input-unit'>
                        <label>Total Hero</label>
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
                    <div className='col-md-6'>
                      <div className='single-input-unit'>
                        <label>Total Skin</label>
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
                    <div className='col-md-6'>
                      <div className='single-input-unit'>
                        <label>Total Skin Rare</label>
                        {totalSkinRareFields.fields.map((field, index) => (
                          <div
                            className='border-1 rounded-xl border-primary-200'
                            key={field.id}
                          >
                            <label>Jenis</label>
                            <input
                              type='text'
                              placeholder='Jenis'
                              {...register(
                                `total_skin_rare.${index}.jenis` as const,
                                {
                                  required: 'Jenis harus diisi',
                                }
                              )}
                            />
                            <label>Total Skin</label>
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
                                    message: 'Minimum jumlah skin adalah 1',
                                  },
                                  valueAsNumber: true,
                                }
                              )}
                            />
                          </div>
                        ))}
                        <div className='flex items-center justify-evenly'>
                          <Button
                            variant='success'
                            onClick={() =>
                              totalSkinRareFields.append({
                                jenis: 'medium',
                                total_skin: 0,
                              })
                            }
                          >
                            Tambah
                          </Button>
                          {!!totalSkinRareFields.fields.length && (
                            <Button
                              variant='danger'
                              onClick={() =>
                                totalSkinRareFields.remove(
                                  totalSkinRareFields.fields.length - 1
                                )
                              }
                            >
                              Hapus
                            </Button>
                          )}
                        </div>
                      </div>
                      <p className='text-red-500'>{errors.title?.message}</p>
                    </div>
                    <div className='col-md-6'>
                      <div className='single-input-unit'>
                        <label>Total Emblem</label>
                        {totalEmblemFields.fields.map((field, index) => (
                          <div
                            className='border-1 rounded-xl border-primary-200'
                            key={field.id}
                          >
                            <label>Emblem</label>
                            <Controller
                              control={control}
                              defaultValue={emblemOpts[0].value}
                              name={`total_emblem.${index}.id_emblem`}
                              render={({ field: { onChange, value } }) => (
                                <Select
                                  className={clsxm()}
                                  options={emblemOpts}
                                  value={emblemOpts.find(
                                    (c) => c.value === value
                                  )}
                                  onChange={(val) => onChange(val?.value)}
                                />
                              )}
                            />
                            <label>Level</label>
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
                            />
                          </div>
                        ))}

                        <div className='flex items-center justify-evenly'>
                          <Button
                            variant='success'
                            onClick={() =>
                              totalEmblemFields.append({
                                id_emblem: 1,
                                level: 1,
                              })
                            }
                          >
                            Tambah
                          </Button>
                          {!!totalEmblemFields.fields.length && (
                            <Button
                              variant='danger'
                              onClick={() =>
                                totalEmblemFields.remove(
                                  totalEmblemFields.fields.length - 1
                                )
                              }
                            >
                              Hapus
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='single-input-unit'>
                        <label>Recall Effect</label>
                        {[...new Array(recallEffectCnt)].map((_, index) => (
                          <>
                            <input
                              key={index}
                              type='text'
                              placeholder='Recall effect'
                              {...register(`recall_effect.${index}`, {
                                required: 'Recall effect harus diisi',
                              })}
                            />
                            <p className='text-red-500'>
                              {errors.recall_effect?.[index]?.message}
                            </p>
                          </>
                        ))}
                        <div className='mb-2 flex items-center justify-evenly'>
                          <Button
                            variant='success'
                            onClick={() => setRecallEffectCnt((v) => v + 1)}
                          >
                            Tambah
                          </Button>
                          {!!recallEffectCnt && (
                            <Button
                              variant='danger'
                              onClick={() => {
                                if (recallEffectCnt > 1) {
                                  unregister(
                                    `recall_effect.${recallEffectCnt - 1}`
                                  );
                                  const arr = getValues('recall_effect');
                                  arr.pop();
                                  setValue('recall_effect', arr);
                                } else {
                                  setValue('recall_effect', []);
                                }
                                setRecallEffectCnt((v) => Math.max(v - 1, 0));
                              }}
                            >
                              Hapus
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='single-input-unit'>
                        <label htmlFor='jenis_refund'>Jenis Refund</label>
                        <Controller
                          control={control}
                          defaultValue={jenisRefundOpts[0].value}
                          name='jenis_refund'
                          render={({ field: { onChange, value } }) => (
                            <Select
                              className={clsxm()}
                              options={jenisRefundOpts}
                              value={jenisRefundOpts.find(
                                (c) => c.value === value
                              )}
                              onChange={(val) => onChange(val?.value)}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='single-input-unit'>
                        <label>Harga Akun (IDR)</label>
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
                      <p className='text-red-500'>
                        {errors.harga_akun?.message}
                      </p>
                    </div>
                    <div className='col-md-6'>
                      <div className='single-input-unit'>
                        <label>Total Pembayaran (IDR)</label>
                        <input
                          type='number'
                          onWheel={(e) =>
                            e.target instanceof HTMLElement && e.target.blur()
                          }
                          placeholder='10000'
                          {...register('total_pembayaran', {
                            required: 'Total pembayaran harus diisi',
                            min: {
                              value: 1,
                              message: 'Minimum total pembayaran adalah 1',
                            },
                            valueAsNumber: true,
                          })}
                        />
                      </div>
                      <p className='text-red-500'>
                        {errors.total_pembayaran?.message}
                      </p>
                    </div>
                    <div className='col-md-6'>
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
                              className={clsxm()}
                              options={jenisPembayaranOpts}
                              value={jenisPembayaranOpts.find(
                                (c) => c.value === value
                              )}
                              onChange={(val) => onChange(val?.value)}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='single-input-unit'>
                        <label htmlFor='package_id'>Paket Penjualan Akun</label>
                        <Controller
                          control={control}
                          defaultValue={packageId[0].value}
                          name='package_id'
                          render={({ field: { onChange, value } }) => (
                            <Select
                              className={clsxm()}
                              options={packageId}
                              value={packageId.find((c) => c.value === value)}
                              onChange={(val) => onChange(val?.value)}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='upload-btn wow fadeInUp mt-4 !hidden md:!block'>
                    <ButtonGradient
                      disabled={submitBtnDisabled}
                      className='text-black'
                      type='submit'
                      onClick={() => setIsChecked(false)}
                    >
                      Submit Iklan
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
                      <h1 className='text-black'>Konfirmasi form</h1>
                      <div>
                        <label className='font-bold'>Judul</label>
                        <p className='text-black'>{getValues('title')}</p>
                      </div>
                      <div>
                        <label className='font-bold'>Platform</label>
                        <p className='text-black'>
                          {
                            platformId.find(
                              (p) => p.value === getValues('platform_id')
                            )?.label
                          }
                        </p>
                      </div>
                      <div>
                        <label className='font-bold'>Change Name Status</label>
                        <p className='text-black'>
                          {
                            changeNameOpts.find(
                              (p) => p.value === getValues('change_name_status')
                            )?.label
                          }
                        </p>
                      </div>
                      <div>
                        <label className='font-bold'>Binding account</label>
                        <p className='text-black'>{getValues('title')}</p>
                      </div>
                      <div>
                        <label className='font-bold'>Favorite Heroes</label>
                        <p className='text-black'>
                          {getValues('favorite_heroes')
                            ?.map(
                              (v) =>
                                favHeroesOpts.find((p) => p.value === v)?.label
                            )
                            .join(', ')}
                        </p>
                      </div>
                      <div>
                        <label className='font-bold'>Win Rate</label>
                        <p className='text-black'>{getValues('win_rate')} %</p>
                      </div>
                      <div>
                        <label className='font-bold'>Total Hero</label>
                        <p className='text-black'>{getValues('total_hero')}</p>
                      </div>
                      <div>
                        <label className='font-bold'>Total Skin</label>
                        <p className='text-black'>{getValues('total_skin')}</p>
                      </div>
                      <div>
                        <label className='font-bold'>Total Skin Rare</label>
                        <ul>
                          {getValues('total_skin_rare')?.map(
                            ({ jenis, total_skin }, index) => (
                              <li key={`${jenis}${index}`}>
                                Jenis: {jenis}, total: {total_skin}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                      <div>
                        <label className='font-bold'>Total Emblem</label>
                        <ul>
                          {getValues('total_emblem')?.map(
                            ({ id_emblem, level }, index) => (
                              <li key={`${id_emblem}${index}`}>
                                Emblem:{' '}
                                {
                                  emblemOpts.find((v) => v.value == id_emblem)
                                    ?.label
                                }
                                , level: {level}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                      <div>
                        <label className='font-bold'>Recall Effect</label>
                        <p className='text-black'>
                          {getValues('recall_effect').join(', ')}
                        </p>
                      </div>
                      <div>
                        <label className='font-bold'>Jenis Refund</label>
                        <p className='text-black'>
                          {
                            jenisRefundOpts.find(
                              (p) => p.value === getValues('jenis_refund')
                            )?.label
                          }
                        </p>
                      </div>
                      <div>
                        <label className='font-bold'>Harga Akun (IDR)</label>
                        <p className='text-black'>
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                          }).format(getValues('harga_akun'))}
                        </p>
                      </div>
                      <div>
                        <label className='font-bold'>
                          Total Pembayaran (IDR)
                        </label>
                        <p className='text-black'>
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                          }).format(getValues('total_pembayaran'))}
                        </p>
                      </div>
                      <div>
                        <label className='font-bold'>Jenis Pembayaran</label>
                        <p className='text-black'>
                          {
                            jenisPembayaranOpts.find(
                              (p) => p.value === getValues('jenis_pembayaran')
                            )?.label
                          }
                        </p>
                      </div>
                      <div>
                        <label className='font-bold'>
                          Paket Penjualan Akun
                        </label>
                        <p className='text-black'>
                          {
                            packageId.find(
                              (p) => p.value === getValues('package_id')
                            )?.label
                          }
                        </p>
                      </div>
                      <div>
                        <label className='font-bold'>Screenshot profile</label>
                        <MyButton
                          className='block'
                          onClick={() => setPreviewImgProfile(true)}
                        >
                          Preview
                        </MyButton>
                        {previewImgProfile && (
                          <Lightbox
                            mainSrc={URL.createObjectURL(imageProfile as File)}
                            onCloseRequest={() => setPreviewImgProfile(false)}
                          />
                        )}
                      </div>
                      <div>
                        <label className='font-bold'>Screenshot win rate</label>
                        <MyButton
                          className='block'
                          onClick={() => setPreviewWinRate(true)}
                        >
                          Preview
                        </MyButton>
                        {previewWinRate && (
                          <Lightbox
                            mainSrc={URL.createObjectURL(imageWinRate as File)}
                            onCloseRequest={() => setPreviewWinRate(false)}
                          />
                        )}
                      </div>
                      <div>
                        <label className='font-bold'>
                          Screenshot win rate hero
                        </label>
                        <MyButton
                          className='block'
                          onClick={() => setPreviewWinRateHero(true)}
                        >
                          Preview
                        </MyButton>
                        {previewWinRateHero && (
                          <Lightbox
                            mainSrc={URL.createObjectURL(
                              imageWinRateHero as File
                            )}
                            onCloseRequest={() => setPreviewWinRateHero(false)}
                          />
                        )}
                      </div>
                      <div>
                        <label className='font-bold'>Screenshot emblem</label>
                        <MyButton
                          className='block'
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
                        <label className='font-bold'>Screenshot skin</label>
                        <MyButton
                          className='block'
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
                                (skinIndex + (imageSkin as File[]).length - 1) %
                                  (imageSkin as File[]).length
                              ] as File
                            )}
                            onCloseRequest={() => setPreviewSkin(false)}
                            onMovePrevRequest={() =>
                              setSkinIndex(
                                (skinIndex + (imageSkin as File[]).length - 1) %
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
                          jika sudah di submit
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
                  </ConfirmationDialog>
                </div>
                <div className='col-lg-4'>
                  <div className='row'>
                    <div className='col-lg-12 col-md-12'>
                      <DragDropSection
                        file={imageProfile}
                        setFile={setImageProfile}
                        title='Screenshot profile'
                        note='Format gambar | Max 20 MB'
                      />
                      <DragDropSection
                        file={imageWinRate}
                        setFile={setImageWinRate}
                        title='Screenshot win rate'
                        note='Format gambar | Max 20 MB'
                      />
                      <DragDropSection
                        file={imageWinRateHero}
                        setFile={setImageWinRateHero}
                        title='Screenshot win rate hero'
                        note='Format gambar | Max 20 MB'
                      />
                      <DragDropSection
                        file={imageEmblem}
                        setFile={setImageEmblem}
                        title='Screenshot emblem'
                        note='Format gambar | Max 20 MB'
                      />
                      <DragDropSection
                        file={imageSkin}
                        setFile={setImageSkin}
                        title='Screenshot skin'
                        note='Format gambar | Max 20 MB'
                        multiple
                      />
                    </div>
                  </div>
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
