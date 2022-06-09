import Link from 'next/link';
import React from 'react';

const TopSellerSection = () => {
  const TopCreator = [
    {
      TopCreatorTitle: 'Stive Machman',
      TopCreatorImage: 'assets/img/profile/profile1.jpg',
      TopCreatorCat: '@machman',
      TopCreatorNumber: '820',
      TopCreatorBtn: 'Created',
    },
    {
      TopCreatorTitle: 'Jobanico Mina',
      TopCreatorImage: 'assets/img/profile/profile2.jpg',
      TopCreatorCat: '@jobanico',
      TopCreatorNumber: '80',
      TopCreatorBtn: 'Created',
    },
    {
      TopCreatorTitle: 'Walter Russell',
      TopCreatorImage: 'assets/img/profile/profile3.jpg',
      TopCreatorCat: '@russell',
      TopCreatorNumber: '82',
      TopCreatorBtn: 'Created',
    },
    {
      TopCreatorTitle: 'Mary Callahan',
      TopCreatorImage: 'assets/img/profile/profile4.jpg',
      TopCreatorCat: '@mary.hano',
      TopCreatorNumber: '720',
      TopCreatorBtn: 'Created',
    },
    {
      TopCreatorTitle: 'John Schreffler',
      TopCreatorImage: 'assets/img/profile/profile5.jpg',
      TopCreatorCat: '@john.874',
      TopCreatorNumber: '870',
      TopCreatorBtn: 'Created',
    },
    {
      TopCreatorTitle: 'Kenny Chess',
      TopCreatorImage: 'assets/img/profile/profile6.jpg',
      TopCreatorCat: '@chess.62',
      TopCreatorNumber: '80',
      TopCreatorBtn: 'Created',
    },
  ];

  const TopSeller = [
    {
      TopSellerTitle: 'Jeffrey Hayes',
      TopSellerImage: 'assets/img/profile/profile7.jpg',
      TopSellerCat: '@jerrifo',
      TopSellerNumber: '880',
      TopSellerBtn: 'Created',
    },
    {
      TopSellerTitle: 'Patricia Stephens',
      TopSellerImage: 'assets/img/profile/profile8.jpg',
      TopSellerCat: '@stephens',
      TopSellerNumber: '820',
      TopSellerBtn: 'Created',
    },
    {
      TopSellerTitle: 'Stive Machman',
      TopSellerImage: 'assets/img/profile/profile1.jpg',
      TopSellerCat: '@machman',
      TopSellerNumber: '840',
      TopSellerBtn: 'Created',
    },
    {
      TopSellerTitle: 'Jobanico Mina',
      TopSellerImage: 'assets/img/profile/profile2.jpg',
      TopSellerCat: '@Jobanico',
      TopSellerNumber: '420',
      TopSellerBtn: 'Created',
    },
    {
      TopSellerTitle: 'Walter Russell',
      TopSellerImage: 'assets/img/profile/profile3.jpg',
      TopSellerCat: '@russel',
      TopSellerNumber: '82',
      TopSellerBtn: 'Created',
    },
    {
      TopSellerTitle: 'Mary Callahan',
      TopSellerImage: 'assets/img/profile/profile4.jpg',
      TopSellerCat: '@mary.hano',
      TopSellerNumber: '720',
      TopSellerBtn: 'Created',
    },
  ];

  return (
    <section className='top-seller-area pt-110 pb-100'>
      <div className='container'>
        <div className='row'>
          <div className='col-xl-6 col-lg-12'>
            <div className='row wow fadeInUp'>
              <div className='col-lg-8 col-md-8 col-sm-8'>
                <div className='section-title1'>
                  <h2 className='section-main-title1 mb-40'>Top Creator</h2>
                </div>
              </div>
              <div className='col-lg-4 col-md-4 col-sm-4'>
                <div className='t-seller-filter d-flex justify-content-sm-end mb-40'>
                  <form action='#'>
                    <div className='common-select-arrow'>
                      <select
                        name='tc-select'
                        id='tc-select'
                        className='top-seller-select'
                      >
                        <option value='1'>1 Day</option>
                        <option value='2'>7 Day</option>
                        <option value='3'>1 Month</option>
                      </select>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div>
              {TopCreator && (
                <div className='row wow fadeInUp'>
                  {TopCreator.map((TopSellerSection, num) => (
                    <div
                      key={num}
                      className='col-xl-6 col-lg-4 col-md-6 col-sm-6'
                    >
                      <div className='creator-single creator-single-short mb-30'>
                        <div className='creator-wraper'>
                          <div className='creator-inner'>
                            <div className='creator-content pos-rel creator-short-content'>
                              <div className='profile-img pos-rel'>
                                <Link href='/creators'>
                                  <a>
                                    <img
                                      src={TopSellerSection.TopCreatorImage}
                                      alt='profile-img'
                                    />
                                  </a>
                                </Link>
                              </div>
                              <div className='creator-info'>
                                <div>
                                  <h4 className='artist-name pos-rel'>
                                    <Link href='/creators'>
                                      <a>{TopSellerSection.TopCreatorTitle}</a>
                                    </Link>
                                    <span className='profile-verification verified'>
                                      <i className='fas fa-check'></i>
                                    </span>
                                  </h4>
                                  <div className='artist-id'>
                                    {TopSellerSection.TopCreatorCat}
                                  </div>
                                  <div className='artist-meta-item'>
                                    <div className='artist-created'>
                                      {TopSellerSection.TopCreatorNumber}
                                    </div>
                                    <div className='artist-meta-type'>
                                      {TopSellerSection.TopCreatorBtn}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className='col-xl-6 col-lg-12'>
            <div className='row wow fadeInUp'>
              <div className='col-lg-8 col-md-8 col-sm-8'>
                <div className='section-title1'>
                  <h2 className='section-main-title1 mb-40'>Top Seller</h2>
                </div>
              </div>
              <div className='col-lg-4 col-md-4 col-sm-4'>
                <div className='t-seller-filter d-flex justify-content-sm-end mb-40'>
                  <form action='#'>
                    <div className='common-select-arrow'>
                      <select
                        name='ts-select'
                        id='ts-select'
                        className='top-seller-select'
                      >
                        <option value='1'>1 Day</option>
                        <option value='2'>7 Day</option>
                        <option value='3'>1 Month</option>
                      </select>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div>
              {TopSeller && (
                <div className='row wow fadeInUp'>
                  {TopSeller.map((TopSellerSection, num) => (
                    <div
                      key={num}
                      className='col-xl-6 col-lg-4 col-md-6 col-sm-6'
                    >
                      <div className='creator-single creator-single-short mb-30'>
                        <div className='creator-wraper'>
                          <div className='creator-inner'>
                            <div className='creator-content pos-rel creator-short-content'>
                              <div className='profile-img pos-rel'>
                                <Link href='/creators'>
                                  <a>
                                    <img
                                      src={TopSellerSection.TopSellerImage}
                                      alt='profile-img'
                                    />
                                  </a>
                                </Link>
                              </div>
                              <div className='creator-info'>
                                <div>
                                  <h4 className='artist-name pos-rel'>
                                    <Link href='/creators'>
                                      <a>{TopSellerSection.TopSellerTitle}</a>
                                    </Link>
                                    <span className='profile-verification verified'>
                                      <i className='fas fa-check'></i>
                                    </span>
                                  </h4>
                                  <div className='artist-id'>
                                    {TopSellerSection.TopSellerCat}
                                  </div>
                                  <div className='artist-meta-item'>
                                    <div className='artist-created'>
                                      {TopSellerSection.TopSellerNumber}
                                    </div>
                                    <div className='artist-meta-type'>
                                      {TopSellerSection.TopSellerBtn}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellerSection;
