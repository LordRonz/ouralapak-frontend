import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import Select from 'react-select';

import Breadcrumbs from '@/components/Common/PageTitle';
import DragDropSection from '@/components/Upload/DragDropSection';
import clsxm from '@/lib/clsxm';

type IFormInput = {
  judul: string;
  first_hand_status: boolean;
  platform: number;
  change_name_status: boolean;
  first_top_up_exist: boolean;
  first_top_up_image: string;
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
  } = useForm<IFormInput>({
    defaultValues: {
      recall_effect: [],
    },
  });

  const totalSkinRareFields = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'total_skin_rare', // unique name for your Field Array
  });

  const totalEmblemFields = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'total_emblem', // unique name for your Field Array
  });
  const [recallEffectCnt, setRecallEffectCnt] = useState<number>(0);

  // const [selectedFile, setSelectedFile] = useState<File>();
  // const [favHeroes, setFavHeroes] = useState<File[]>([]);
  // const [dndDisabled, setDndDisabled] = useState<boolean>(false);

  // const onUpload = (files?: FileList | File[] | null) => {
  //   setSelectedFile(files?.[0]);
  // };

  // const onBuktiTopUpDrop = useCallback((acceptedFiles: File[]) => {
  //   // Do something with the files
  //   if (!SUPPORTED_IMAGE_TYPES.includes(acceptedFiles[0].type)) {
  //     setSelectedFile(undefined);

  //     return;
  //   }
  //   onUpload(acceptedFiles);
  // }, []);

  // const onFavHeroesDrop = useCallback((files: File[]) => {
  //   // Do something with the files
  //   files.filter(
  //     (file) => file.type && SUPPORTED_IMAGE_TYPES.includes(file.type)
  //   );

  //   setFavHeroes((currentHeroes) => [...currentHeroes, ...files]);
  // }, []);

  const accountBindOpts = [
    { value: 1, label: 'Moonton' },
    { value: 2, label: 'Facebook' },
  ];

  const favHeroesOpts = [
    { value: 1, label: 'Balmond' },
    { value: 2, label: 'Eudora' },
  ];

  const emblemOpts = [
    { value: 1, label: 'Tank' },
    { value: 2, label: 'Support' },
  ];

  const jenisRefundOpts = [
    {
      value: 1,
      label:
        'Refund player (refund untuk pembeli, namun jika akunnya dijual lagi oleh si pembeli refund akan tidak berlaku)',
    },
    { value: 2, label: 'Refund full apapun kondisinya' },
    { value: 3, label: 'No refund' },
  ];

  const jenisPembayaranOpts = [
    { value: 1, label: 'Mandiri' },
    { value: 2, label: 'BNI' },
  ];

  const [imageProfile, setImageProfile] = useState<File | File[] | null>(null);
  const [imageWinRate, setImageWinRate] = useState<File | File[] | null>(null);
  const [imageWinRateHero, setImageWinRateHero] = useState<
    File | File[] | null
  >(null);
  const [imageEmblem, setImageEmblem] = useState<File | File[] | null>(null);
  const [imageSkin, setImageSkin] = useState<File | File[] | null>(null);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    console.log(imageProfile);
    console.log(imageSkin);
  };

  return (
    <main>
      <Breadcrumbs
        breadcrumbTitle='Upload Artwork'
        breadcrumbSubTitle='Upload Artwork'
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
                          {...register('judul', {
                            required: 'Judul harus diisi',
                          })}
                        />
                      </div>
                      <p className='text-red-500'>{errors.judul?.message}</p>
                    </div>
                    <div className='col-md-6'>
                      <div className='single-input-unit'>
                        <label>First Hand Status</label>
                        <div className='common-select-arrow common-select-arrow-60 w-full'>
                          <select
                            className='art-category-select art-category-select2 w-full'
                            {...register('first_hand_status', {
                              required: 'First hand status harus diisi',
                            })}
                          >
                            <option value='0'>Akun Pribadi</option>
                            <option value='1'>Akun Beli</option>
                          </select>
                        </div>
                      </div>
                      <p className='text-red-500'>
                        {errors.first_hand_status?.message}
                      </p>
                    </div>
                    <div className='col-md-6'>
                      <div className='single-input-unit'>
                        <label>Platform</label>
                        <div className='common-select-arrow common-select-arrow-60 w-full'>
                          <select
                            className='art-category-select art-category-select2 w-full'
                            {...register('platform', {
                              required: 'Platform harus diisi',
                            })}
                          >
                            <option value='0'>Android</option>
                            <option value='1'>iOS</option>
                          </select>
                        </div>
                      </div>
                      <p className='text-red-500'>{errors.platform?.message}</p>
                    </div>
                    <div className='col-md-6'>
                      <div className='single-input-unit'>
                        <label>Change Name Status</label>
                        <div className='common-select-arrow common-select-arrow-60 w-full'>
                          <select
                            className='art-category-select art-category-select2 w-full'
                            {...register('change_name_status', {
                              required: 'Change name status harus diisi',
                            })}
                          >
                            <option value='0'>Change name non-aktif</option>
                            <option value='1'>Change name aktif</option>
                          </select>
                        </div>
                      </div>
                      <p className='text-red-500'>
                        {errors.change_name_status?.message}
                      </p>
                    </div>
                    <div className='col-md-6'>
                      <div className='single-input-unit'>
                        <label>Bukti top up</label>
                        <div className='common-select-arrow common-select-arrow-60 w-full'>
                          <select
                            className='art-category-select art-category-select2 w-full'
                            {...register('first_top_up_exist', {
                              required: 'Bukti top up harus diisi',
                            })}
                          >
                            <option value='0'>Bukti top-up ada</option>
                            <option value='1'>Bukti top-up tidak ada</option>
                          </select>
                        </div>
                      </div>
                      <p className='text-red-500'>
                        {errors.first_top_up_exist?.message}
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
                          placeholder='69'
                          {...register('win_rate', {
                            required: 'Win rate harus diisi',
                            pattern: {
                              value: /^(\d{0,2}(\.\d{1,2})?|100(\.00?)?)$/,
                              message:
                                'Win rate haruslah di antara 0 - 100 dan maksimum 2 desimal di belakang koma',
                            },
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
                          placeholder='69'
                          {...register('total_hero', {
                            required: 'Total hero harus diisi',
                            min: {
                              value: 1,
                              message: 'Minimum jumlah hero adalah 1',
                            },
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
                          placeholder='69'
                          {...register('total_skin', {
                            required: 'Total skin harus diisi',
                            min: {
                              value: 0,
                              message: 'Minimum jumlah skin adalah 0',
                            },
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
                              placeholder='69'
                              {...register(
                                `total_skin_rare.${index}.total_skin` as const,
                                {
                                  required: 'Total skin harus diisi',
                                  min: {
                                    value: 1,
                                    message: 'Minimum jumlah skin adalah 1',
                                  },
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
                                total_skin: 69,
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
                      <p className='text-red-500'>{errors.judul?.message}</p>
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
                              placeholder='1'
                              {...register(
                                `total_emblem.${index}.level` as const,
                                {
                                  required: 'Level harus diisi',
                                  min: {
                                    value: 1,
                                    message: 'Minimum level adalah 1',
                                  },
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
                      <p className='text-red-500'>{errors.judul?.message}</p>
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
                              {errors.recall_effect?.[index].message}
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
                        <label>Harga Akun</label>
                        <input
                          type='number'
                          placeholder='69000'
                          {...register('harga_akun', {
                            required: 'Harga akun harus diisi',
                            min: {
                              value: 1,
                              message: 'Minimum harga adalah 1',
                            },
                          })}
                        />
                      </div>
                      <p className='text-red-500'>
                        {errors.harga_akun?.message}
                      </p>
                    </div>
                    <div className='col-md-6'>
                      <div className='single-input-unit'>
                        <label>Total Pembayaran</label>
                        <input
                          type='number'
                          placeholder='69000'
                          {...register('total_pembayaran', {
                            required: 'Total pembayaran harus diisi',
                            min: {
                              value: 1,
                              message: 'Minimum total pembayaran adalah 1',
                            },
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
                  </div>
                  <div className='upload-btn wow fadeInUp'>
                    <button id='upload-btn' className='fill-btn' type='submit'>
                      Upload Now
                    </button>
                    <button id='preview-btn' className='fill-btn-orange'>
                      Preview
                    </button>
                  </div>
                </div>
                <div className='col-lg-4'>
                  <div className='row'>
                    <div className='col-lg-12 col-md-12'>
                      <DragDropSection
                        file={imageProfile}
                        setFile={setImageProfile}
                        title='Gambar profile'
                        note='Format gambar | Max 20 MB'
                      />
                      <DragDropSection
                        file={imageWinRate}
                        setFile={setImageWinRate}
                        title='Gambar win rate'
                        note='Format gambar | Max 20 MB'
                      />
                      <DragDropSection
                        file={imageWinRateHero}
                        setFile={setImageWinRateHero}
                        title='Gambar win rate hero'
                        note='Format gambar | Max 20 MB'
                      />
                      <DragDropSection
                        file={imageEmblem}
                        setFile={setImageEmblem}
                        title='Gambar emblem'
                        note='Format gambar | Max 20 MB'
                      />
                      <DragDropSection
                        file={imageSkin}
                        setFile={setImageSkin}
                        title='Gambar skin'
                        note='Format gambar | Max 20 MB'
                        multiple
                      />
                    </div>
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
