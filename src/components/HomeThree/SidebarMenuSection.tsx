import Link from 'next/link';
import React, { useState } from 'react';

type SidebarMenuSectionProps = {
  setMenuOpen1?: React.Dispatch<React.SetStateAction<boolean>>;
  menuOpen1?: boolean;
};

const SidebarMenuSection = ({
  setMenuOpen1,
  menuOpen1,
}: SidebarMenuSectionProps) => {
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
    <div>
      <div className='fix'>
        <div
          className={
            menuOpen1 ? 'menu2-side-bar-wrapper open' : 'menu2-side-bar-wrapper'
          }
        >
          <div className='menu2-side-bar'>
            <div className='side-info-content'>
              <div className='offset-widget offset-logo mb-25'>
                <div className='row align-items-center'>
                  <div className='col-9'>
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
              </div>
              <div className='mm-menu mb-60'>
                <ul>
                  <li
                    className={home ? 'has-droupdown active' : 'has-droupdown'}
                  >
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
                    className={
                      courses ? 'has-droupdown active' : 'has-droupdown'
                    }
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
                    className={
                      project ? 'has-droupdown active' : 'has-droupdown'
                    }
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
              <div className='menu2-sidebar-widget'>
                <h5 className='menu2-sidebar-widget-title mb-35'>Top Seller</h5>
                <div className='sidebar-creators-list'>
                  <div className='creator-single creator-single-short'>
                    <div className='creator-wraper'>
                      <div className='creator-inner'>
                        <div className='artist'>
                          <div className='profile-img pos-rel'>
                            <Link href='/creators'>
                              <a>
                                <img
                                  src='assets/img/profile/profile6.jpg'
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
                                <a>Stive Machman</a>
                              </Link>
                            </h4>
                            <div className='artist-id'>@stive.lio</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='creator-single creator-single-short'>
                    <div className='creator-wraper'>
                      <div className='creator-inner'>
                        <div className='artist'>
                          <div className='profile-img pos-rel'>
                            <Link href='/creators'>
                              <a>
                                <img
                                  src='assets/img/profile/profile7.jpg'
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
                                <a>Jobanico Mina</a>
                              </Link>
                            </h4>
                            <div className='artist-id'>@jobanico</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='creator-single creator-single-short'>
                    <div className='creator-wraper'>
                      <div className='creator-inner'>
                        <div className='artist'>
                          <div className='profile-img pos-rel'>
                            <Link href='/creators'>
                              <a>
                                <img
                                  src='assets/img/profile/profile8.jpg'
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
                                <a>Paul Hayman</a>
                              </Link>
                            </h4>
                            <div className='artist-id'>@paul</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='creator-single creator-single-short'>
                    <div className='creator-wraper'>
                      <div className='creator-inner'>
                        <div className='artist'>
                          <div className='profile-img pos-rel'>
                            <Link href='/creators'>
                              <a>
                                <img
                                  src='assets/img/profile/profile9.jpg'
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
                                <a>Broke Lesner</a>
                              </Link>
                            </h4>
                            <div className='artist-id'>@broke</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='menu2-sidebar-widget mt-35'>
                <div className='work-process-single pos-rel'>
                  <div className='work-process-content'>
                    <div className='process-icon'>
                      <img src='assets/img/shape/list-icon-2.png' alt='img' />
                    </div>
                    <h4 className='process-title'>
                      <a href='#'>Create and sell your NFTs</a>
                    </h4>
                    <div className='work-process-btn'>
                      <Link href='/upload'>
                        <a className='fill-btn'>Create Now</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className='offcanvas-overlay'
        onClick={() => {
          if (setMenuOpen1) {
            setMenuOpen1(!menuOpen1);
          }
        }}
      ></div>
      <div className='offcanvas-overlay-white'></div>
    </div>
  );
};

export default SidebarMenuSection;
