import Link from 'next/link';
import React from 'react';

const HeroSectionThree = () => {
  return (
    <div className='banner-area banner-area3 pos-rel pt-130'>
      <div className='c-container-1 container'>
        <div className='row'>
          <div className='col-xl-8 banner-3-column'>
            <div className='single-banner single-banner-3 banner-460 d-flex align-items-center pos-rel'>
              <div className='banner-bg'>
                <img
                  src='assets/img/banner/banner-3-bg.jpg'
                  alt='img not found'
                />
              </div>
              <div className='banner-bg-light'>
                <img
                  src='assets/img/banner/banner-3-bg.jpg'
                  alt='img not found'
                />
              </div>
              <div className='banner-content banner-content3 pt-0'>
                <h1
                  data-animation='fadeInUp'
                  data-delay='.3s'
                  className='font-prata mb-20'
                >
                  Discover Digital Artworks & Collect Best <span>NFTs</span>
                </h1>
                <p data-animation='fadeInUp' data-delay='.5s' className='mb-30'>
                  There is enough digital artworks available online to help you
                  put together.
                </p>
                <div
                  className='banner-btn'
                  data-animation='fadeInUp'
                  data-delay='.7s'
                >
                  <Link href='/explore-arts'>
                    <a className='fill-btn'>Explore Now</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-4 sidebar-art-list-column'>
            <div className='sidebar-art-list'>
              <div className='art-item-single sidebar-art-item'>
                <div className='art-item-wraper'>
                  <div className='art-item-inner'>
                    <div className='art-item-img pos-rel'>
                      <Link href='/explore-arts'>
                        <a>
                          <img
                            src='assets/img/bids/oc-category-2-2.jpg'
                            alt='art-img'
                          />
                        </a>
                      </Link>
                    </div>
                    <div className='art-item-content pos-rel'>
                      <h4 className='art-name'>
                        <Link href='/explore-arts'>
                          <a>Color Abstract Cube</a>
                        </Link>
                      </h4>
                      <div className='artist'>
                        <div className='profile-img pos-rel'>
                          <Link href='/creators'>
                            <a>
                              <img
                                src='assets/img/profile/profile5.jpg'
                                alt='profile-img'
                              />
                            </a>
                          </Link>
                          <div className='profile-verification verified'>
                            <i className='fas fa-check'></i>
                          </div>
                        </div>
                        <div className='artist-id'>@jarin_mock</div>
                      </div>
                      <div className='art-meta-info'>
                        <div className='art-meta-item'>
                          <div className='art-meta-type'>Current Bid</div>
                          <div className='art-price'>24.47 ETH</div>
                        </div>
                        <div className='art-activity-btn'>
                          <a href='#' className='place-bid'>
                            Place Bid
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='art-item-single sidebar-art-item'>
                <div className='art-item-wraper'>
                  <div className='art-item-inner'>
                    <div className='art-item-img pos-rel'>
                      <Link href='/explore-arts'>
                        <a>
                          <img
                            src='assets/img/bids/oc-category-1.jpg'
                            alt='art-img'
                          />
                        </a>
                      </Link>
                    </div>
                    <div className='art-item-content pos-rel'>
                      <h4 className='art-name'>
                        <Link href='/explore-arts'>
                          <a>3D Crypto Artwork</a>
                        </Link>
                      </h4>
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
                        <div className='artist-id'>@chess.62</div>
                      </div>
                      <div className='art-meta-info'>
                        <div className='art-meta-item'>
                          <div className='art-meta-type'>Current Bid</div>
                          <div className='art-price'>23.84 ETH</div>
                        </div>
                        <div className='art-activity-btn'>
                          <a href='#' className='place-bid'>
                            Place Bid
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='art-item-single sidebar-art-item'>
                <div className='art-item-wraper'>
                  <div className='art-item-inner'>
                    <div className='art-item-img pos-rel'>
                      <Link href='/explore-arts'>
                        <a>
                          <img
                            src='assets/img/bids/oc-category-3.jpg'
                            alt='art-img'
                          />
                        </a>
                      </Link>
                    </div>
                    <div className='art-item-content pos-rel'>
                      <h4 className='art-name'>
                        <Link href='/explore-arts'>
                          <a>Watch Looper</a>
                        </Link>
                      </h4>
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
                        <div className='artist-id'>@stephens</div>
                      </div>
                      <div className='art-meta-info'>
                        <div className='art-meta-item'>
                          <div className='art-meta-type'>Current Bid</div>
                          <div className='art-price'>32.84 ETH</div>
                        </div>
                        <div className='art-activity-btn'>
                          <a href='#' className='place-bid'>
                            Place Bid
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionThree;
