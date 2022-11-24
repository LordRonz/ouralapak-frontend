import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { Fragment, useState } from 'react';
import { FaPhoneAlt, FaPlus } from 'react-icons/fa';
import { useLocalStorage } from 'react-use';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useSWR from 'swr';

import ButtonGradient from '@/components/buttons/ButtonGradient';
import ButtonLink from '@/components/links/ButtonLink';
import ButtonLinkGradient from '@/components/links/ButtonLinkGradient';
import { API_URL } from '@/constant/config';
import { mySwalOpts } from '@/constant/swal';
import getWaLink from '@/lib/getWhatsappLink';
import Config from '@/types/config';
import User from '@/types/user';

type MobileMenuProps = {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuOpen: boolean;
};

const MySwal = withReactContent(Swal);

const MobileMenu = ({ setMenuOpen, menuOpen }: MobileMenuProps) => {
  const [isActive14, setActive14] = useState(false);
  const handleToggle14 = () => {
    setActive14((a) => !a);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [, , removeToken] = useLocalStorage('token');
  const { theme } = useTheme();

  const router = useRouter();

  const { data: user } = useSWR<{
    data: User;
    message: string;
    success: boolean;
  }>(`${API_URL}/profile`);

  const { data: config } = useSWR<{
    data: Config;
    message: string;
    success: boolean;
  }>(() => `${API_URL}/master/config/4`);

  const handleLogout = async () => {
    const { isConfirmed } = await MySwal.fire({
      title: 'Yakin ingin logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      ...mySwalOpts(theme),
      customClass: {
        container: 'zIndex99999999',
      },
    });
    if (isConfirmed) {
      removeToken();
      window.location.replace(router.basePath + '/login');
    }
  };

  return (
    <>
      <div className='fix md:hidden'>
        <div className={menuOpen ? 'side-info info-open' : 'side-info'}>
          <div className='side-info-content'>
            <div className='offset-widget offset-logo mb-40'>
              <div className='row align-items-center'>
                <div className='col-9'>
                  <Link href='/'>
                    <a>
                      <img src='images/ouralapak_logo_long.png' alt='Logo' />
                    </a>
                  </Link>
                </div>
                <div className='col-3 text-end'>
                  <button
                    className='side-info-close'
                    onClick={() => setMenuOpen(false)}
                  >
                    <i className='fal fa-times'></i>
                  </button>
                </div>
              </div>
            </div>
            <div className='mm-menu mm-menu-1 d-lg-none mb-60'>
              <ul>
                {user ? (
                  <>
                    <li>
                      <Link href='/seller'>
                        <a className='animated-underline !text-base !font-medium !text-primary-600 dark:!text-primary-300'>
                          Iklan
                        </a>
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <a
                        href={getWaLink(config?.data?.value ?? '+62869696969')}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='animated-underline !text-base !font-medium !text-primary-600 dark:!text-primary-300'
                      >
                        Jasa Rekber
                      </a>
                    </li>
                    <li>
                      <Link href='/seller'>
                        <a className='animated-underline !text-base !font-medium !text-primary-600 dark:!text-primary-300'>
                          Jual Akun
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href='/#jelajah_akun'>
                        <a className='animated-underline !text-base !font-medium !text-primary-600 dark:!text-primary-300'>
                          Beli Akun
                        </a>
                      </Link>
                    </li>
                  </>
                )}

                <li>
                  <Link href='/cek-invoice'>
                    <a className='animated-underline !text-base !font-medium !text-primary-600 dark:!text-primary-300'>
                      Cek Invoice
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href='/tutorial'>
                    <a className='animated-underline !text-base !font-medium !text-primary-600 dark:!text-primary-300'>
                      Tutorial
                    </a>
                  </Link>
                </li>
                {user && (
                  <li>
                    <Link href='/#footer'>
                      <a className='animated-underline !text-base !font-medium !text-primary-600 dark:!text-primary-300'>
                        Contact Us
                      </a>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            {user ? (
              <ButtonGradient
                className='px-3 text-xs font-medium uppercase text-white'
                onClick={() => {
                  setIsModalOpen(true);
                  setMenuOpen(false);
                }}
              >
                <div className='flex items-center justify-center gap-x-2'>
                  <FaPlus />
                  Tambah Iklan
                </div>
              </ButtonGradient>
            ) : (
              <ButtonLinkGradient
                href='/seller'
                className='px-3 font-medium uppercase text-white'
              >
                <div className='flex items-center justify-center gap-x-2'>
                  <FaPhoneAlt />
                  Contact Us
                </div>
              </ButtonLinkGradient>
            )}
            <div className='offset-profile-action d-md-none'>
              <div className='offset-widget mb-40 mt-20'>
                {user && (
                  <div className='profile-item profile-item-header into-sidebar d-md-none'>
                    <div
                      className={`profile-img relative ${
                        isActive14 ? '' : 'show-element'
                      }`}
                      onClick={handleToggle14}
                    >
                      <div className='profile-action'>
                        <ul>
                          <li>
                            <Link href='/creator-profile-info-personal'>
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
                      <img
                        src={
                          user?.data.profile_picture
                            ? `${API_URL}/${user.data.profile_picture}`
                            : `/images/pfp.jpg`
                        }
                        alt='profile-img'
                      />
                      {!!user?.data.is_verified && (
                        <div className='profile-verification verified'>
                          <i className='fas fa-check'></i>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='offset-widget d-none d-lg-block mb-40'>
              <div className='info-widget'>
                <h4 className='offset-title d-none mb-20'>Contact Info</h4>
                <Link href='/contact'>
                  <a className='fill-btn'>Contact Us</a>
                </Link>
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
      </div>
      <div className='offcanvas-overlay'></div>
      <div className='offcanvas-overlay-white'></div>
      <style jsx>{`
        .zIndex99999999 {
          z-index: 99999999 !important;
        }
      `}</style>
    </>
  );
};

export default MobileMenu;
