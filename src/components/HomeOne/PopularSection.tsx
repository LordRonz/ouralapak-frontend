import Link from 'next/link';
import React from 'react';

const PopularSection = () => {
  const popularCollection = [
    {
      popularTitle: 'Creative Artwork',
      popularImage1: 'assets/img/art/art26.jpg',
      popularImage2: 'assets/img/art/art10.jpg',
      popularImage3: 'assets/img/art/art20.jpg',
      popularBtnNumber: '475',
      popularBtn: 'Items',
      popularShare: 'Share',
    },
    {
      popularTitle: 'Abstract Art',
      popularImage1: 'assets/img/art/art31.jpg',
      popularImage2: 'assets/img/art/art32.jpg',
      popularImage3: 'assets/img/art/art33.jpg',
      popularBtnNumber: '585',
      popularBtn: 'Items',
      popularShare: 'Share',
    },
    {
      popularTitle: 'Digital Product',
      popularImage1: 'assets/img/art/art36.jpg',
      popularImage2: 'assets/img/art/art35.jpg',
      popularImage3: 'assets/img/art/art34.jpg',
      popularBtnNumber: '695',
      popularBtn: 'Items',
      popularShare: 'Share',
    },
    {
      popularTitle: 'Creative Artwork',
      popularImage1: 'assets/img/art/art37.jpg',
      popularImage2: 'assets/img/art/art38.jpg',
      popularImage3: 'assets/img/art/art39.jpg',
      popularBtnNumber: '325',
      popularBtn: 'Items',
      popularShare: 'Share',
    },
  ];
  return (
    <section className='popular-collections-area pb-100 pt-0'>
      <div className='container'>
        <div className='row wow fadeInUp'>
          <div className='col-lg-12'>
            <div className='section-title1 relative mb-40 text-center'>
              <h2 className='section-main-title1'>Popular Collection</h2>
              <p>Browse most popular collections and Choose between auctions</p>
            </div>
          </div>
        </div>
        {popularCollection && (
          <div className='row wow fadeInUp'>
            {popularCollection.map((PopularSection, num) => (
              <div key={num} className='col-xl-3 col-lg-4 col-md-6 col-sm-6'>
                <div className='category-collections-wrapper mb-30'>
                  <div className='category-collections-inner'>
                    <div className='row'>
                      <div className='col-6'>
                        <div className='row'>
                          <div className='col-12'>
                            <div className='art-item-single'>
                              <div className='art-item-wraper'>
                                <div className='art-item-inner'>
                                  <div className='art-item-img relative'>
                                    <Link href='/art-details'>
                                      <a>
                                        <img
                                          src={PopularSection.popularImage1}
                                          alt='art-img'
                                        />
                                      </a>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='col-12'>
                            <div className='art-item-single'>
                              <div className='art-item-wraper'>
                                <div className='art-item-inner'>
                                  <div className='art-item-img relative'>
                                    <Link href='/art-details'>
                                      <a>
                                        <img
                                          src={PopularSection.popularImage2}
                                          alt='art-img'
                                        />
                                      </a>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-6'>
                        <div className='art-item-single'>
                          <div className='art-item-wraper'>
                            <div className='art-item-inner'>
                              <div className='art-item-img relative'>
                                <Link href='/art-details'>
                                  <a>
                                    <img
                                      src={PopularSection.popularImage3}
                                      alt='art-img'
                                    />
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='collection-content relative'>
                      <div className='art-3dots-menu'>
                        <div className='art-3dots-action'>
                          <ul>
                            <li>
                              <a href='#'>
                                <i className='flaticon-share-1'></i>
                                {PopularSection.popularShare}
                              </a>
                            </li>
                          </ul>
                        </div>
                        <button className='art-3dots-icon'>
                          <i className='fal fa-ellipsis-v'></i>
                        </button>
                      </div>
                      <div className='collection-category'>
                        <h4 className='category-name'>
                          <Link href='/explore-arts'>
                            <a>{PopularSection.popularTitle}</a>
                          </Link>
                        </h4>
                        <Link href='/explore-arts'>
                          <a className='resource-meta-item'>
                            <div className='resource-created'>
                              {PopularSection.popularBtnNumber}
                            </div>
                            <div className='resource-meta-type'>
                              {PopularSection.popularBtn}
                            </div>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularSection;
