import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import useSWR from 'swr';

import ColorModeToggle from '@/components/ColorModeToggle';
import MobileMenu from '@/components/Layout/Header/MobileMenu';
import ButtonLinkGradient from '@/components/links/ButtonLinkGradient';
import { API_URL } from '@/constant/config';
import useSticky from '@/hooks/useSticky';
import clsxm from '@/lib/clsxm';
import getWaLink from '@/lib/getWhatsappLink';
import Config from '@/types/config';

type HeaderProps = {
  HeaderStatic?: string;
  setHeight?: (a?: number) => void;
} & React.ComponentPropsWithRef<'div'>;

const Header = ({ HeaderStatic, setHeight }: HeaderProps) => {
  // sticky nav
  const { sticky } = useSticky();

  const [menuOpen, setMenuOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeight && setHeight(ref.current?.clientHeight);
  }, [ref, setHeight]);

  const { data: config } = useSWR<{
    data: Config;
    message: string;
    success: boolean;
  }>(() => `${API_URL}/master/config/4`);

  const router = useRouter();

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
                  {/* <form
                    action='#'
                    className='filter-search-input header-search d-none d-xl-inline-block'
                  >
                    <input type='text' placeholder='Search keyword' />
                    <button>
                      <i className='fal fa-search'></i>
                    </button>
                  </form> */}
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
                          <a
                            href={getWaLink(
                              config?.data?.value ?? '+62816969696'
                            )}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='animated-underline py-0 !text-sm !font-medium !text-primary-600 dark:!text-primary-300'
                          >
                            Jasa Rekber
                          </a>
                        </li>
                        <li>
                          <Link href='/seller'>
                            <a
                              className={clsxm(
                                'animated-underline py-0 !text-sm !font-medium !text-primary-600 dark:!text-primary-300',
                                router.pathname === '/seller' && '!font-bold'
                              )}
                            >
                              Jual Akun
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href='/#jelajah_akun'>
                            <a className='animated-underline py-0 !text-sm !font-medium !text-primary-600 dark:!text-primary-300'>
                              Beli Akun
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href='/#jelajah_akun'>
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
                      </ul>
                    </nav>
                  </div>
                  <ButtonLinkGradient
                    href='#footer'
                    className='hidden px-3 text-xs font-medium uppercase text-white md:block'
                  >
                    <div className='flex items-center justify-center gap-x-2'>
                      <FaPhoneAlt />
                      Contact Us
                    </div>
                  </ButtonLinkGradient>
                  <ColorModeToggle className='mx-2' />
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

export default Header;
