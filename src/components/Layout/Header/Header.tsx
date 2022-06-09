import Link from 'next/link';
import React, { useState } from 'react';

import MobileMenu from '@/components/Layout/Header/MobileMenu';
import useSticky from '@/hooks/useSticky';

type HeaderProps = {
  HeaderStatic?: string;
};

const Header = ({ HeaderStatic }: HeaderProps) => {
  const [isActive11, setActive11] = useState(false);

  const handleToggle11 = () => {
    setActive11(!isActive11);
  };

  // sticky nav
  const { sticky } = useSticky();

  const [menuOpen, setMenuOpen] = useState(false);

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
                          src='assets/img/logo/oction-logo.png'
                          alt='logo-img'
                        />
                      </a>
                    </Link>
                    <Link href='/'>
                      <a className='logo-bw'>
                        <img
                          src='assets/img/logo/oction-logo-bw.png'
                          alt='logo-img'
                        />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className='col-xl-10 col-lg-10 col-md-8 col-8'>
                <div className='header-main-right'>
                  <div className='main-menu main-menu1 d-none d-lg-block'>
                    <nav id='mobile-menu'>
                      <ul>
                        <li className='menu-item-has-children'>
                          <Link href='/'>
                            <a>Home</a>
                          </Link>
                          <ul className='sub-menu'>
                            <li>
                              <Link href='/'>
                                <a>Home Style 01</a>
                              </Link>
                            </li>
                            <li>
                              <Link href='/index-2'>
                                <a>Home Style 02</a>
                              </Link>
                            </li>
                            <li>
                              <Link href='/index-3'>
                                <a>Home Style 03</a>
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link href='/explore-arts'>
                            <a>Explore</a>
                          </Link>
                        </li>
                        <li>
                          <Link href='/creators'>
                            <a>Creators</a>
                          </Link>
                        </li>
                        <li className='menu-item-has-children'>
                          <a href='#'>Pages</a>
                          <ul className='sub-menu'>
                            <li className='menu-item-has-children'>
                              <Link href='/creator-profile'>
                                <a>Creator</a>
                              </Link>
                              <ul className='sub-menu'>
                                <li>
                                  <Link href='/creator-profile'>
                                    <a>Creator Profile</a>
                                  </Link>
                                </li>
                                <li>
                                  <Link href='/creator-profile-info-personal'>
                                    <a>Creator Personal Info</a>
                                  </Link>
                                </li>
                              </ul>
                            </li>
                            <li className='menu-item-has-children'>
                              <Link href='/art-details'>
                                <a>Art</a>
                              </Link>
                              <ul className='sub-menu'>
                                <li>
                                  <Link href='/art-details'>
                                    <a>Art Details</a>
                                  </Link>
                                </li>
                                <li>
                                  <Link href='/upload-category'>
                                    <a>Upload Category</a>
                                  </Link>
                                </li>
                                <li>
                                  <Link href='/upload'>
                                    <a>Upload</a>
                                  </Link>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <Link href='/faq'>
                                <a>FAQ</a>
                              </Link>
                            </li>
                            <li>
                              <Link href='/register'>
                                <a>Register</a>
                              </Link>
                            </li>
                            <li>
                              <Link href='/login'>
                                <a>Login</a>
                              </Link>
                            </li>
                            <li>
                              <Link href='/terms'>
                                <a>Terms</a>
                              </Link>
                            </li>
                            <li>
                              <Link href='/wallet-connect'>
                                <a>Wallet Connect</a>
                              </Link>
                            </li>
                            <li>
                              <Link href='/activity'>
                                <a>Activity</a>
                              </Link>
                            </li>
                            <li>
                              <Link href='/art-ranking'>
                                <a>Ranking</a>
                              </Link>
                            </li>
                            <li>
                              <Link href='/error-404'>
                                <a>404 page</a>
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link href='/forum'>
                            <a>Forum</a>
                          </Link>
                        </li>
                        <li>
                          <Link href='/contact'>
                            <a>Contact</a>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <form
                    action='#'
                    className='filter-search-input header-search d-none d-xl-inline-block'
                  >
                    <input type='text' placeholder='Search keyword' />
                    <button>
                      <i className='fal fa-search'></i>
                    </button>
                  </form>
                  <div className='header-btn d-none d-xxl-inline-block ml-20'>
                    <Link href='/wallet-connect'>
                      <a className='fill-btn'>Connect Wallet</a>
                    </Link>
                  </div>
                  <div className='profile-item profile-item-header d-none d-md-inline-block pos-rel ml-20'>
                    <div
                      className={`profile-img pos-rel ${
                        isActive11 ? '' : 'show-element'
                      }`}
                      onClick={handleToggle11}
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
                            <Link href='/login'>
                              <a>
                                <i className='fal fa-sign-out'></i>Logout
                              </a>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <img
                        src='assets/img/profile/profile4.jpg'
                        alt='profile-img'
                      />
                      <div className='profile-verification verified'>
                        <i className='fas fa-check'></i>
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

export default Header;
