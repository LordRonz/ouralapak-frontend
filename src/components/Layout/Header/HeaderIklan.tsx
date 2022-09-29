import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { Fragment, useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { GoTriangleDown } from 'react-icons/go';
import { useLocalStorage } from 'react-use';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useSWR from 'swr';

import ButtonGradient from '@/components/buttons/ButtonGradient';
import ColorModeToggle from '@/components/ColorModeToggle';
import MobileMenu from '@/components/Layout/Header/MobileMenu';
import ButtonLink from '@/components/links/ButtonLink';
import { API_URL } from '@/constant/config';
import { mySwalOpts } from '@/constant/swal';
import useSticky from '@/hooks/useSticky';
import clsxm from '@/lib/clsxm';
import User from '@/types/user';

type HeaderProps = {
  HeaderStatic?: string;
};

const MySwal = withReactContent(Swal);

const HeaderIklan = ({ HeaderStatic }: HeaderProps) => {
  const { theme } = useTheme();
  const [isActive11, setActive11] = useState(true);
  const [, , removeToken] = useLocalStorage('token');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const { data: user } = useSWR<{
    data: User;
    message: string;
    success: boolean;
  }>(`${API_URL}/profile`);

  const handleToggle11 = () => {
    setActive11(!isActive11);
  };
  // sticky nav
  const { sticky } = useSticky();

  const [menuOpen, setMenuOpen] = useState(false);

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
      //setTimeout(() => router.push('/login'), 100);
      router.push('/login');
    }
  };

  return (
    <>
      <header className={`${HeaderStatic ? HeaderStatic : ''}`}>
        <div
          id='header-sticky'
          className={
            sticky
              ? 'header-main header-main1 sticky'
              : 'header-main header-main1 sticky'
          }
          ref={ref}
        >
          <div className='header-container container'>
            <div className='row align-items-center'>
              <div className='col-xl-2 col-lg-2 col-md-4 col-4'>
                <div className='header-main-left'>
                  <div className='header-logo header1-logo'>
                    <Link href='/'>
                      <a className='logo-bb'>
                        <img
                          src='/images/ouralapak_logo_long.png'
                          alt='logo-img'
                        />
                      </a>
                    </Link>
                    <Link href='/'>
                      <a className='logo-bw'>
                        <img
                          src='/images/ouralapak_logo_long.png'
                          alt='logo-img'
                        />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className='col-xl-10 col-lg-10 col-md-8 col-8 py-2'>
                <div className='header-main-right'>
                  <div className='main-menu main-menu1 d-none d-lg-block uppercase'>
                    <nav id='mobile-menu'>
                      <ul>
                        <li>
                          <Link href='/'>
                            <a
                              className={clsxm(
                                'animated-underline py-0 !text-sm !font-medium !text-primary-600 dark:!text-primary-300',
                                router.pathname === '/' && '!font-bold'
                              )}
                            >
                              Home
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href='/seller'>
                            <a
                              className={clsxm(
                                'animated-underline py-0 !text-sm !font-medium !text-primary-600 dark:!text-primary-300',
                                router.pathname === '/seller' && '!font-bold'
                              )}
                            >
                              Iklan
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href='/cek-invoice'>
                            <a className='animated-underline py-0 !text-sm !font-medium !text-primary-600 dark:!text-primary-300'>
                              Cek Invoice
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href='/tutorial'>
                            <a
                              className={clsxm(
                                'animated-underline py-0 !text-sm !font-medium !text-primary-600 dark:!text-primary-300',
                                router.pathname === '/tutorial' && '!font-bold'
                              )}
                            >
                              Tutorial
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href='#footer'>
                            <a className='animated-underline py-0 !text-sm !font-medium !text-primary-600 dark:!text-primary-300'>
                              Contact Us
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <ButtonGradient
                    className='hidden px-3 text-xs font-medium uppercase text-white md:block'
                    onClick={() => setIsModalOpen(true)}
                  >
                    <div className='flex items-center justify-center gap-x-2'>
                      <FaPlus />
                      Tambah Iklan
                    </div>
                  </ButtonGradient>
                  <ColorModeToggle className='mx-2' />
                  <div className='h-10 border-l-2 border-[#D9D9D9]' />
                  <div className='profile-item profile-item-header relative ml-20 hidden items-center md:flex'>
                    <div
                      className={`profile-img relative ${
                        isActive11 ? '' : 'show-element'
                      }`}
                      onClick={handleToggle11}
                    >
                      <div className='profile-action'>
                        <ul>
                          <li>
                            <Link href='/profile'>
                              <a>
                                <i className='fal fa-user'></i>Profile
                              </a>
                            </Link>
                          </li>
                          <li>
                            <button
                              className='hover:text-primary-400'
                              onClick={() => handleLogout()}
                            >
                              <a>
                                <i className='fal fa-sign-out'></i>Logout
                              </a>
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div className='flex items-center gap-x-3'>
                        <div className='relative'>
                          <Image
                            src={
                              user?.data.profile_picture
                                ? `${API_URL}/${user.data.profile_picture}`
                                : `/images/pfp.jpg`
                            }
                            alt='profile-img'
                            width={35}
                            height={35}
                          />
                          {!!user?.data.is_verified && (
                            <div className='profile-verification verified'>
                              <i className='fas fa-check'></i>
                            </div>
                          )}
                        </div>
                        <p className='m-0 max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap p-0'>
                          {user?.data.name}
                        </p>
                        <span>
                          <GoTriangleDown />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='menu-bar d-xl-none ml-20'>
                    <a
                      className='side-toggle'
                      href='#!'
                      onClick={() => {
                        setMenuOpen(!menuOpen);
                      }}
                    >
                      <div className='bar-icon'>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Transition appear show={isModalOpen} as={Fragment}>
          <Dialog
            as='div'
            className='relative z-10'
            onClose={() => setIsModalOpen(false)}
          >
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>
            <div className='fixed inset-0 overflow-y-auto'>
              <div className='flex min-h-full items-center justify-center p-4 text-center'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0 scale-95'
                  enterTo='opacity-100 scale-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-95'
                >
                  <Dialog.Panel className='w-full max-w-md transform overflow-visible rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:!bg-neutral-800'>
                    <Dialog.Title
                      as='h3'
                      className='mb-2 text-lg font-bold leading-6 text-gray-900 dark:text-white'
                    >
                      Syarat Penjualan Akun
                    </Dialog.Title>
                    <ol className='list-decimal space-y-2 pl-4'>
                      <li className='list-decimal pr-8'>
                        Diusahakan Akun No Minus Moonton (ada akses ke Akun
                        Moonton dan Akun Gmail yang digunakan untuk daftar akun
                        Moonton)
                      </li>
                      <li className='list-decimal pr-8'>
                        NO Minus BIND (Jika ada bind misal FB/Tiktok bisa di
                        lepas terlebih dahulu karena prosesnya membutuhkan waktu
                        7 Hari)
                      </li>
                    </ol>
                    <ButtonLink
                      href='/post-iklan'
                      className='flex w-full items-center justify-center border-0 text-center'
                    >
                      Lanjutkan
                    </ButtonLink>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </header>

      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div
        onClick={() => setMenuOpen(false)}
        className={
          menuOpen ? 'offcanvas-overlay overlay-open' : 'offcanvas-overlay'
        }
      ></div>
    </>
  );
};

export default HeaderIklan;
