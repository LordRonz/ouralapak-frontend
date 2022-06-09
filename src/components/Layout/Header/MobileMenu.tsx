import Link from 'next/link';
import React, { useState } from 'react';

type MobileMenuProps = {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuOpen: boolean;
};

const MobileMenu = ({ setMenuOpen, menuOpen }: MobileMenuProps) => {
  const [isActive14, setActive14] = useState(false);
  const handleToggle14 = () => {
    setActive14(!isActive14);
  };

  const [home, setHome] = useState(false);
  const [courses, setcourses] = useState(false);
  const [pages, setPages] = useState(false);
  const [project, setProject] = useState(false);

  const openMobileMenu = (menu: string) => {
    if (menu == 'home') {
      setHome(!home);
      setcourses(false);
      setPages(false);
      setProject(false);
    } else if (menu == 'courses') {
      setHome(false);
      setcourses(!courses);
      setPages(false);
      setProject(false);
    } else if (menu == 'pages') {
      setHome(false);
      setcourses(false);
      setProject(false);
      setPages(!pages);
    } else if (menu == 'project') {
      setHome(false);
      setcourses(false);
      setPages(false);
      setProject(!project);
    }
  };

  return (
    <>
      <div className='fix'>
        <div className={menuOpen ? 'side-info info-open' : 'side-info'}>
          <div className='side-info-content'>
            <div className='offset-widget offset-logo mb-40'>
              <div className='row align-items-center'>
                <div className='col-9'>
                  <Link href='/'>
                    <a>
                      <img
                        src='assets/img/logo/oction-logo-bw.png'
                        alt='Logo'
                      />
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
                <li className={home ? 'has-droupdown active' : 'has-droupdown'}>
                  <a
                    onClick={() => {
                      openMobileMenu('home');
                    }}
                  >
                    Home
                  </a>
                  <ul className={home ? 'sub-menu active' : 'sub-menu'}>
                    <li>
                      <Link href='/'>
                        <a>Home Style 1</a>
                      </Link>
                    </li>
                    <li>
                      <Link href='/index-2'>
                        <a>Home Style 2</a>
                      </Link>
                    </li>
                    <li>
                      <Link href='/index-3'>
                        <a>Home Style 3</a>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href='/explore-arts'>
                    <a>Explore</a>
                  </Link>
                </li>
                <li
                  className={courses ? 'has-droupdown active' : 'has-droupdown'}
                >
                  <a
                    onClick={() => {
                      openMobileMenu('courses');
                    }}
                  >
                    Creator
                  </a>
                  <ul className={courses ? 'sub-menu active' : 'sub-menu'}>
                    <li>
                      <Link href='/creators'>
                        <a>Creators</a>
                      </Link>
                    </li>
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

                <li
                  className={project ? 'has-droupdown active' : 'has-droupdown'}
                >
                  <a
                    onClick={() => {
                      openMobileMenu('project');
                    }}
                  >
                    Art
                  </a>
                  <ul className={project ? 'sub-menu active' : 'sub-menu'}>
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
                    <li>
                      <Link href='/art-details'>
                        <a>Art Details</a>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li
                  className={pages ? 'has-droupdown active' : 'has-droupdown'}
                >
                  <a
                    onClick={() => {
                      openMobileMenu('pages');
                    }}
                  >
                    Pages
                  </a>
                  <ul className={pages ? 'sub-menu active' : 'sub-menu'}>
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
            </div>
            <div className='offset-profile-action d-md-none'>
              <div className='offset-widget mb-40'>
                <div className='profile-item profile-item-header into-sidebar d-md-none'>
                  <div
                    className={`profile-img pos-rel ${
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
                      src='assets/img/profile/profile4.jpg'
                      alt='profile-img'
                    />
                    <div className='profile-verification verified'>
                      <i className='fas fa-check'></i>
                    </div>
                  </div>
                </div>
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
            <div className='offset-widget mb-40'>
              <Link href='/upload-category'>
                <a className='fill-btn'>Upload Items</a>
              </Link>
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
