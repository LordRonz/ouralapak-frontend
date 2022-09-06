import Link from 'next/link';
import React, { useState } from 'react';
import useSWR from 'swr';

import { API_URL } from '@/constant/config';
import User from '@/types/user';

type MobileMenuProps = {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuOpen: boolean;
};

const MobileMenu = ({ setMenuOpen, menuOpen }: MobileMenuProps) => {
  const [isActive14, setActive14] = useState(false);
  const handleToggle14 = () => {
    setActive14((a) => !a);
  };

  const { data: user } = useSWR<{
    data: User;
    message: string;
    success: boolean;
  }>(`${API_URL}/profile`);

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
            </div>
            <div className='offset-profile-action d-md-none'>
              <div className='offset-widget mb-40'>
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
                            <Link href='/login'>
                              <a>
                                <i className='fal fa-sign-out'></i>Logout
                              </a>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <img
                        src={
                          user?.data.profile_picture
                            ? `${API_URL}${user.data.profile_picture}`
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
            <div className='offset-widget offset_searchbar mb-30'>
              <form action='#' className='filter-search-input'>
                <input type='text' placeholder='Search keyword' />
                <button>
                  <i className='fal fa-search'></i>
                </button>
              </form>
            </div>
            <div className='offset-widget d-none d-lg-block mb-40'>
              <div className='info-widget'>
                <h4 className='offset-title d-none mb-20'>Contact Info</h4>
                <p className='mb-30'>
                  Non-fungible tokens and their smart contracts allow for
                  detailed attributes to be added, like the identity of the
                  owner, rich metadata, or secure file links.
                </p>
                <Link href='/contact'>
                  <a className='fill-btn'>Contact Us</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='offcanvas-overlay'></div>
      <div className='offcanvas-overlay-white'></div>
    </>
  );
};

export default MobileMenu;
