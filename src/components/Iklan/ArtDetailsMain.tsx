import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/redux/store';

const ArtDetailsMain = () => {
  const productItem = useSelector(
    (state: RootState) => state.products.specificItem
  );

  return (
    <main>
      <section className='page-title-area'>
        <div className='container'>
          <div className='row wow fadeInUp'>
            <div className='col-lg-12'>
              <div className='page-title'>
                <h2 className='breadcrumb-title mb-10'>{productItem.title}</h2>
                <div className='breadcrumb-menu'>
                  <nav className='breadcrumb-trail breadcrumbs'>
                    <ul className='trail-items'>
                      <li className='trail-item trail-begin'>
                        <Link href='/'>
                          <a>Home</a>
                        </Link>
                      </li>
                      <li className='trail-item trail-end'>
                        <span>{productItem.title}</span>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='art-details-area pt-130 pb-0'>
        <div className='container'>
          <div className='art-details-wrapper'>
            <div className='row'>
              <div className='col-xl-6 col-lg-3'>
                <div className='art-item-img art-details-img wow fadeInUp relative'>
                  <span>
                    <img src={productItem.img} alt='art-img' />
                  </span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-7'>
                <div className='art-details-content wow fadeInUp'>
                  <div className='created-by'>Created by</div>
                  <div className='creator mb-30'>
                    <div className='profile-img relative'>
                      <Link href='/creators'>
                        <a>
                          <img
                            src={productItem.profileImage}
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
                          <a>{productItem.name}</a>
                        </Link>
                      </h4>
                      <div className='artist-id'>{productItem.artistId}</div>
                    </div>
                  </div>
                  <div className='art-name-details'>
                    <h4 className='art-name mb-25'>{productItem.title}</h4>
                    <p>
                      There is enough material available online to help you put
                      together a website. This kind includes choosing the
                      domain, templates, layout and the overall design for your
                      best marketplace.
                    </p>
                  </div>
                  <div className='artist-meta-info art-details-meta-info'>
                    <div className='art-meta-item artist-meta-item-border'>
                      <div className='art-meta-type'>Price</div>
                      <div className='art-price'>{productItem.price}</div>
                      <div className='art-meta-notice'>352.342 USD</div>
                    </div>
                    <div className='art-meta-item artist-meta-item-border'>
                      <div className='art-meta-type'>Stock</div>
                      <div className='art-sale'>
                        <span className='art-sold'>12</span>/
                        <span className='art-stock'>58</span>
                        Sale
                      </div>
                      <div className='art-meta-notice'>2nd Addition</div>
                    </div>
                    <div className='art-meta-item'>
                      <div className='art-meta-type'>Auction Ends</div>
                      <div
                        className='art-auction-ends'
                        data-countdown='2022/09/20'
                      ></div>
                      <div className='art-meta-notice'>Hurry up!</div>
                    </div>
                  </div>
                  <div className='art-details-action mt-50 mb-50'>
                    <a href='#' className='place-bid'>
                      Place Bid
                    </a>
                    <div className='art-action-like-count'>
                      <i className='flaticon-heart'></i>
                      {productItem.count}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ArtDetailsMain;
