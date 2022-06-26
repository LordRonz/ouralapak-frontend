import Link from 'next/link';
import React, { useState } from 'react';
import useSWR from 'swr';

import ColorModeToggle from '@/components/ColorModeToggle';
import MobileMenu from '@/components/Layout/Header/MobileMenu';
import { API_URL } from '@/constant/config';
import useSticky from '@/hooks/useSticky';
import { IklanHome } from '@/types/iklan';
import Pagination from '@/types/pagination';

type HeaderProps = {
  HeaderStatic?: string;
};

const Header = ({ HeaderStatic }: HeaderProps) => {
  // sticky nav
  const { sticky } = useSticky();

  const [menuOpen, setMenuOpen] = useState(false);

  const { data: iklans } = useSWR<{
    data: { data: IklanHome[]; pagination: Pagination };
    message: string;
    success: boolean;
  }>(`${API_URL}/master/config`);
  console.log(iklans);
  return (
    <>
      <header className={`header1 ${HeaderStatic ? HeaderStatic : ''}`}>
        <div
          id='header-sticky'
          className={
            sticky
              ? 'header-main header-main1 sticky'
              : 'header-main header-main1'
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
                <div className='header-main-right'>
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
                      <ul>
                        <li>
                          <Link href='/rekber'>
                            <a>Jasa Rekber</a>
                          </Link>
                        </li>
                        <li>
                          <Link href='/seller'>
                            <a>Jual Akun</a>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
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
