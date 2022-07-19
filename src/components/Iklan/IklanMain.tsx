import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { stringifyUrl } from 'query-string';
import React, { ReactChild, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Lightbox from 'react-image-lightbox';
import PhoneInput, {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from 'react-phone-number-input';
import { Carousel } from 'react-responsive-carousel';
import Modal from 'react-responsive-modal';
import Select from 'react-select';
import { toast } from 'react-toastify';
import useSWR from 'swr';

import Button from '@/components/buttons/Button';
import ButtonGradient from '@/components/buttons/ButtonGradient';
import Captcha from '@/components/Common/Captcha';
import Spinner from '@/components/Common/Spinner';
import ButtonLink from '@/components/links/ButtonLink';
import { API_URL } from '@/constant/config';
import clsxm from '@/lib/clsxm';
import toIDRCurrency from '@/lib/toIDRCurrency';
import Bank from '@/types/bank';
import { IklanDetail } from '@/types/iklan';
import { InvoicePembeli } from '@/types/invoice';
import Pagination from '@/types/pagination';

type IFormInput = {
  jenis_pembayaran: number;
  nama: string;
  email: string;
  phone: string;
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
  const { data: iklan } = useSWR<{
    data: IklanDetail;
    message: string;
    success: boolean;
  }>(`${API_URL}/iklan/${id}`);

  const [open, setOpen] = useState(false);
  const [previewCarousel, setPreviewCarousel] = useState<boolean>(false);
  const [carouselImg, setCarouselImg] = useState<string>();

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const {
    control,
    register,
    handleSubmit,
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
  }>(`${API_URL}/master/bank`);

  const jenisPembayaranOpts = banks?.data.data.map((b) => ({
    value: b.id,
    label: b.rekening_name,
  }));

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!phone || (phone && !isPossiblePhoneNumber(phone))) {
      return;
    }

    if (!recaptchaResponse) {
      toast.warn('Captcha harus diselesaikan');
    }
    const res = await toast.promise(
      axios.post<{ data: InvoicePembeli; message: string; success: boolean }>(
        stringifyUrl({
          url: `${API_URL}/invoice/${id}`,
          query: {
            recaptcha_response: recaptchaResponse,
          },
        }),
        { ...data, phone: phone?.replace('+', '') }
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
          render: () => {
            setBeliBtnDisabled(false);
            return 'Gagal beli akun!';
          },
        },
      }
    );
    console.log(res);
  };

  if (!jenisPembayaranOpts?.[0] || !iklan) {
    return <Spinner />;
  }

  return (
    <main>
      <section className='page-title-area'>
        <div className='container'>
          <div className='row wow fadeInUp'>
            <div className='col-lg-12'>
              <div className='page-title'>
                <h2 className='breadcrumb-title mb-10'>{iklan.data.title}</h2>
                <div className='breadcrumb-menu'>
                  <nav className='breadcrumb-trail breadcrumbs'>
                    <ul className='trail-items'>
                      <li className='trail-item trail-begin'>
                        <Link href='/'>
                          <a>Home</a>
                        </Link>
                      </li>
                      <li className='trail-item trail-end'>
                        <span>{iklan.data.title}</span>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='art-details-area'>
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
              <div className='col-xl-6 col-lg-7'>
                <div className='mb-6 space-x-4'>
                  <h1 className='inline'>{iklan.data.title}</h1>
                  <p className='inline rounded-lg bg-neutral-300 py-1 px-2'>
                    {iklan.data.platform}
                  </p>
                </div>
                <div className='art-details-content wow fadeInUp'>
                  <div className='created-by mb-2'>Created by</div>
                  <div className='creator mb-30'>
                    <div className='profile-img pos-rel'>
                      <Link href='/creators'>
                        <a>
                          <img
                            src={
                              iklan.data.user?.profile_picture
                                ? `${API_URL}/${iklan.data.user?.profile_picture}`
                                : `https://robohash.org/${
                                    iklan.data.user?.username || 'AMOGUS'
                                  }?set=set4`
                            }
                            alt='profile-img'
                          />
                        </a>
                      </Link>
                      <div className='profile-verification verified'>
                        <i className='fas fa-check'></i>
                      </div>
                    </div>
                    <div className='creator-name-id'>
                      <h4 className='artist-name'>
                        <Link href='/creators'>
                          <a>{iklan.data.user.name}</a>
                        </Link>
                      </h4>
                      <div className='artist-id'>
                        {iklan.data.user.username}
                      </div>
                    </div>
                  </div>
                  <div className='art-name-details'>
                    <div className='space-x-4'>
                      <h5 className='inline'>First Hand Status:</h5>
                      <p className='inline'>
                        {+iklan.data.first_hand_status === 0
                          ? 'First hand'
                          : 'Second hand'}
                      </p>
                    </div>
                    <div className='space-x-4'>
                      <h5 className='inline'>Account Bind:</h5>
                      <p className='inline'>
                        {iklan.data.account_bind
                          .map((a) => a.name)
                          .join(', ') || '-'}
                      </p>
                    </div>
                    <div className='space-x-4'>
                      <h5 className='inline'>Change Name Status:</h5>
                      <p className='inline'>
                        {+iklan.data.change_name_status === 0
                          ? 'Change name non-aktif'
                          : 'Change name aktif'}
                      </p>
                    </div>
                  </div>
                  <div className='artist-meta-info art-details-meta-info'>
                    <div className='art-meta-item artist-meta-item-border'>
                      <div className='art-meta-type'>Harga</div>
                      <div className='art-price'>
                        {toIDRCurrency(iklan.data.harga_akun)}
                      </div>
                    </div>
                    <div className='art-meta-item artist-meta-item-border'>
                      <div className='art-meta-type'>Win Rate</div>
                      <div className='art-sale'>
                        <span className='art-sold'>
                          {iklan.data.win_rate} %
                        </span>
                      </div>
                    </div>
                    <div className='art-meta-item'>
                      <div className='art-meta-type'>Jenis Refund</div>
                      <div className='art-sale'>
                        <span className='art-sold'>
                          {iklan.data.jenis_refund}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='mt-50 mb-50 flex items-center justify-around'>
                    <ButtonLink
                      href={`https://wa.me/${iklan.data.user.phone
                        .replace(/\+/g, '')
                        .replace(/-/g, '')
                        .replace(/\(/g, '')
                        .replace(/\)/g, '')
                        .trim()}`}
                    >
                      Hubungi Penjual
                    </ButtonLink>
                    {iklan.data.jenis_refund.toLowerCase() !== 'no refund' && (
                      <Button onClick={onOpenModal}>Beli</Button>
                    )}
                    <Modal open={open} onClose={onCloseModal} center>
                      <div className='row justify-content-center'>
                        <div className='col-xxl-6 col-xl-7 col-lg-8'>
                          <div className='login-wrapper pos-rel wow fadeInUp mb-40'>
                            <div className=' login-inner'>
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
                                          placeholder='Masukkan Nama Anda'
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
                                        <input
                                          type='email'
                                          id='email'
                                          placeholder='Masukkan email anda'
                                          {...register('email', {
                                            required: 'Email harus diisi',
                                            pattern: {
                                              value:
                                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                              message: 'Email tidak valid!',
                                            },
                                          })}
                                        />
                                      </div>
                                      <p className='text-red-500'>
                                        {errors.email?.message}
                                      </p>
                                    </div>
                                    <div className='col-md-12'>
                                      <div className='single-input-unit'>
                                        <label htmlFor='phone'>
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
                      </div>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
            <div className='row my-8'>
              <div className='grid grid-cols-3 rounded-lg border-2 border-primary-200 bg-neutral-50 py-6 dark:bg-neutral-800'>
                <div className='flex flex-col items-start justify-center'>
                  <div className='h-24 w-24 overflow-hidden rounded-lg md:h-48 md:w-48'>
                    <Image
                      src={
                        iklan.data.user?.profile_picture
                          ? `${API_URL}/${iklan.data.user?.profile_picture}`
                          : `https://robohash.org/${
                              iklan.data.user?.username || 'AMOGUS'
                            }?set=set4`
                      }
                      alt='Picture of the author'
                      width={500}
                      height={500}
                    />
                  </div>
                </div>
                <div className='flex flex-col justify-between'>
                  <h1 className='text-xl  md:text-4xl'>Penjual</h1>
                  <p className='text-sm dark:!text-light md:text-base'>
                    Nama: {iklan.data.user.name}
                  </p>
                  <p className='text-sm dark:!text-light md:text-base'>
                    No. HP: {iklan.data.user.phone}
                  </p>
                  <p className='text-sm dark:!text-light md:text-base'>
                    Email: {iklan.data.user.email}
                  </p>
                  <p className='text-sm dark:!text-light md:text-base'>
                    Instagram: @{iklan.data.user.ig_username}
                  </p>
                </div>
              </div>
            </div>
            <div className='row my-8'>
              <div className='grid grid-cols-3 rounded-lg border-2 border-primary-200 bg-neutral-50 py-6 dark:bg-neutral-800'>
                <div className='flex flex-col justify-between'>
                  <h1 className='text-xl  md:text-4xl'>Info Akun</h1>
                  <p className='text-sm dark:!text-light md:text-base'>
                    Platform: {iklan.data.platform}
                  </p>
                  <p className='text-sm dark:!text-light md:text-base'>
                    Favorite Heroes:{' '}
                    {iklan.data.hero.map((hero) => hero.name).join(', ') || '-'}
                  </p>
                  <p className='text-sm dark:!text-light md:text-base'>
                    Total hero: {iklan.data.total_hero}
                  </p>
                  <p className='text-sm dark:!text-light md:text-base'>
                    Total skin: {iklan.data.total_skin}
                  </p>
                  <p className='text-sm dark:!text-light md:text-base'>
                    Recall effect: {iklan.data.recall_effect.join(', ') || '-'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default IklanMain;
