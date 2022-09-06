import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import { useLocalStorage } from 'react-use';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useSWR from 'swr';

import ColorModeToggle from '@/components/ColorModeToggle';
import MobileMenu from '@/components/Layout/Header/MobileMenu';
import { API_URL } from '@/constant/config';
import { mySwalOpts } from '@/constant/swal';
import useSticky from '@/hooks/useSticky';
import User from '@/types/user';

type HeaderProps = {
  HeaderStatic?: string;
};

const MySwal = withReactContent(Swal);

const HeaderIklan = ({ HeaderStatic }: HeaderProps) => {
  const { theme } = useTheme();
  const [isActive11, setActive11] = useState(true);
  const [, , removeToken] = useLocalStorage('token');

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
      <header className={`header1 ${HeaderStatic ? HeaderStatic : ''}`}>
        <div
          id='header-sticky'
          className={
            sticky
              ? 'header-main header-main1 sticky'
              : 'header-main header-main1 sticky'
          }
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
                  <form
                    action='#'
                    className='filter-search-input header-search d-none d-xl-inline-block'
                  >
                    <input type='text' placeholder='Search keyword' />
                    <button>
                      <i className='fal fa-search'></i>
                    </button>
                  </form>
                  <div className='main-menu main-menu1 d-none d-lg-block'>
                    <nav id='mobile-menu'>
                      <ul></ul>
                    </nav>
                  </div>
                  <ColorModeToggle className='mx-2' />
                  <div className='profile-item profile-item-header d-none d-md-inline-block relative ml-20'>
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
