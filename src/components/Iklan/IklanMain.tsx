import axios from 'axios';
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
import IklanCardSingle from '@/components/Cards/IklanCardSingle';
import Captcha from '@/components/Common/Captcha';
import Breadcrumbs from '@/components/Common/PageTitle';
import Spinner from '@/components/Common/Spinner';
import XButton from '@/components/Common/XButton';
import ButtonLink from '@/components/links/ButtonLink';
import { API_URL } from '@/constant/config';
import clsxm from '@/lib/clsxm';
import toIDRCurrency from '@/lib/toIDRCurrency';
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

  const { data: iklans } = useSWR<{
    data: { data: IklanHome[]; pagination: Pagination };
    message: string;
    success: boolean;
  }>(
    stringifyUrl({
      url: `${API_URL}/iklan`,
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
          render: (e) => {
            setBeliBtnDisabled(false);
            return (
              (e?.data?.response?.data.message as string) || 'Gagal beli akun!'
            );
          },
        },
      }
    );
    console.log(res);
  };

  const getRefundById = (id: string | number) => {
    if (!refund) return '';
    const res = refund.data.data.find((x) => +x.id === +id);
    return res?.name ?? '';
  };

  if (!jenisPembayaranOpts?.[0] || !iklan || !iklans) {
    return <Spinner />;
  }

  return (
    <main>
      <Breadcrumbs breadcrumbSubTitle={iklan.data.title} />

      <section className='art-details-area pt-8'>
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
                <div className='mb-6 space-x-4'>
                  <h1 className='inline'>{iklan.data.title}</h1>
                  <p className='inline rounded-lg bg-neutral-300 py-1 px-2'>
                    {iklan.data.platform}
                  </p>
                </div>
                <div className='art-details-content wow fadeInUp'>
                  <div className='flex items-center space-x-8'>
                    <div className='flex w-full justify-between'>
                      <div>
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
                      </div>
                      <div className='mt-50 mb-30 flex items-center gap-x-2'>
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
                        <Button onClick={onOpenModal}>Beli</Button>
                        <Modal
                          open={open}
                          onClose={onCloseModal}
                          center
                          classNames={{ modal: 'rounded-xl p-0' }}
                          closeIcon={<XButton />}
                        >
                          <div className='row justify-content-center'>
                            <div className='login-wrapper pos-rel wow fadeInUp'>
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
                        </Modal>
                      </div>
                    </div>
                  </div>
                  <div className='art-details-meta-info my-8 grid grid-cols-3 divide-x-2'>
                    <div className='art-meta-item'>
                      <div className='art-meta-type'>Harga</div>
                      <div className='art-sale'>
                        {toIDRCurrency(iklan.data.harga_akun)}
                      </div>
                    </div>
                    <div className='art-meta-item pl-3'>
                      <div className='art-meta-type'>Win Rate</div>
                      <div className='art-sale'>{iklan.data.win_rate} %</div>
                    </div>
                    <div className='art-meta-item pl-3'>
                      <div className='art-meta-type'>Jenis Refund</div>
                      <div className='art-sale'>{iklan.data.jenis_refund}</div>
                    </div>
                  </div>
                  <div className='art-details-information'>
                    <div className='art-information-tab-nav mb-20'>
                      <nav>
                        <div
                          className='nav nav-tabs flex justify-between'
                          id='nav-tab'
                          role='tablist'
                        >
                          <button
                            className='nav-link active'
                            id='nav-bid-tab'
                            data-bs-toggle='tab'
                            data-bs-target='#tab-nav1'
                            type='button'
                            role='tab'
                            aria-selected='true'
                          >
                            <span className='profile-nav-button'>Detail</span>
                          </button>
                          <button
                            className='nav-link'
                            id='nav-info-tab'
                            data-bs-toggle='tab'
                            data-bs-target='#tab-nav2'
                            type='button'
                            role='tab'
                            aria-selected='false'
                          >
                            <span className='profile-nav-button'>Hero</span>
                          </button>
                          <button
                            className='nav-link'
                            id='nav-details-tab'
                            data-bs-toggle='tab'
                            data-bs-target='#tab-nav3'
                            type='button'
                            role='tab'
                            aria-selected='false'
                          >
                            <span className='profile-nav-button'>Skin</span>
                          </button>
                          <button
                            className='nav-link'
                            id='nav-details-tab'
                            data-bs-toggle='tab'
                            data-bs-target='#tab-nav4'
                            type='button'
                            role='tab'
                            aria-selected='false'
                          >
                            <span className='profile-nav-button'>Recall</span>
                          </button>
                          <button
                            className='nav-link'
                            id='nav-details-tab'
                            data-bs-toggle='tab'
                            data-bs-target='#tab-nav5'
                            type='button'
                            role='tab'
                            aria-selected='false'
                          >
                            <span className='profile-nav-button'>Emblem</span>
                          </button>
                        </div>
                      </nav>
                    </div>
                    <div className='art-information-tab-contents mb-0'>
                      <div className='tab-content' id='nav-tabContent'>
                        <div
                          className='tab-pane fade active show'
                          id='tab-nav1'
                          role='tabpanel'
                          aria-labelledby='nav-bid-tab'
                        >
                          <div className='art-user-wrapper'>
                            <div className='flex flex-wrap gap-x-10 gap-y-4'>
                              <div>
                                <h5>Status Akun</h5>
                                <h4>
                                  {+iklan.data.first_hand_status === 0
                                    ? 'Pribadi'
                                    : 'Akun Beli'}
                                </h4>
                              </div>
                              <div>
                                <h5>Ganti Nama Akun</h5>
                                <h4>
                                  {+iklan.data.change_name_status === 0
                                    ? 'Nonaktif'
                                    : 'Aktif'}
                                </h4>
                              </div>
                              <div>
                                <h5>Total Hero</h5>
                                <h4>{iklan.data.total_hero}</h4>
                              </div>
                              <div>
                                <h5>Total Skin</h5>
                                <h4>{iklan.data.total_skin}</h4>
                              </div>
                              <div>
                                <h5>Binding Account</h5>
                                <div className='flex gap-x-2'>
                                  {iklan.data.account_bind.length > 0
                                    ? iklan.data.account_bind.map((a) => (
                                        <span
                                          className='rounded bg-neutral-300 px-3 py-1'
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
                            <div className='flex flex-wrap gap-x-10 gap-y-4'>
                              <div>
                                <h5>Favorite</h5>
                                <div className='flex gap-x-2'>
                                  {iklan.data.hero.length > 0
                                    ? iklan.data.hero.map((a) => (
                                        <span
                                          className='rounded bg-neutral-300 px-3 py-1'
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
                            <div className='flex flex-wrap gap-x-10 gap-y-4'>
                              <div>
                                <h5>Skin Rare</h5>
                                <div className='flex flex-wrap gap-x-3 gap-y-3'>
                                  {iklan.data.total_skin_rare.length > 0
                                    ? iklan.data.total_skin_rare.map((a, i) => (
                                        <div
                                          className='flex gap-x-1'
                                          key={`${a.jenis}-${i}`}
                                        >
                                          <span className='rounded bg-neutral-300 px-3 py-1'>
                                            {a.jenis}
                                          </span>
                                          <span className='rounded bg-neutral-300 px-1 py-1'>
                                            {a.total_skin}
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
                            <div className='flex flex-wrap gap-x-10 gap-y-4'>
                              <div>
                                <h5>Efek Recall</h5>
                                <div className='flex flex-wrap gap-x-3 gap-y-3'>
                                  {iklan.data.recall_effect.length > 0
                                    ? iklan.data.recall_effect.map((a, i) => (
                                        <span
                                          className='rounded bg-neutral-300 px-3 py-1'
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
                            <div className='flex flex-wrap gap-x-10 gap-y-4'>
                              <div>
                                <h5>Emblem</h5>
                                <div className='flex flex-wrap gap-x-3 gap-y-3'>
                                  {iklan.data.emblem.length > 0
                                    ? iklan.data.emblem.map((a, i) => (
                                        <div
                                          className='flex gap-x-1'
                                          key={`${a.id}-${i}`}
                                        >
                                          <span className='rounded bg-neutral-300 px-3 py-1'>
                                            {a.name}
                                          </span>
                                          <span className='rounded bg-neutral-300 px-1 py-1'>
                                            {a.level}
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
                </div>
              </div>
            </div>
          </div>
          <div className='row wow fadeInUp'>
            <div className='flex gap-x-4'>
              <h3>Iklan lain</h3>
              <Link href='/iklan'>
                <a className='text-blue-400'>Lihat semua</a>
              </Link>
            </div>
            {iklans.data.data.map((iklan, index) => (
              <IklanCardSingle
                iklan={iklan}
                key={`${iklan.id}${index}`}
                refund={getRefundById(iklan.jenis_refund)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default IklanMain;
