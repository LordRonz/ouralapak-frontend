import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { GoTriangleDown } from 'react-icons/go';
import { useLocalStorage } from 'react-use';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useSWR from 'swr';

import ColorModeToggle from '@/components/ColorModeToggle';
import MobileMenu from '@/components/Layout/Header/MobileMenu';
import ButtonLinkGradient from '@/components/links/ButtonLinkGradient';
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
              <div className='col-xl-10 col-lg-10 col-md-8 col-8'>
                <div className='header-main-right py-3'>
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
                  <ButtonLinkGradient
                    href='/post-iklan'
                    className='hidden px-3 text-xs font-medium uppercase text-white md:block'
                  >
                    <div className='flex items-center justify-center gap-x-2'>
                      <FaPlus />
                      Tambah Iklan
                    </div>
                  </ButtonLinkGradient>
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
