import Link from 'next/link';
import React from 'react';

const BrowseCategorySection = () => {
  const BrowseCategoryList = [
    {
      BrowseCategoryTitle: '3D Artwork',
      BrowseCategoryImage: 'assets/img/bids/oc-category-1.jpg',
    },
    {
      BrowseCategoryTitle: 'Video & Music',
      BrowseCategoryImage: 'assets/img/bids/oc-category-2.jpg',
    },
    {
      BrowseCategoryTitle: 'Trading Elements',
      BrowseCategoryImage: 'assets/img/bids/oc-category-3.jpg',
    },
    {
      BrowseCategoryTitle: 'Photography',
      BrowseCategoryImage: 'assets/img/bids/oc-category-4.jpg',
    },
    {
      BrowseCategoryTitle: 'PSD Mockup',
      BrowseCategoryImage: 'assets/img/bids/oc-category-5.jpg',
    },
    {
      BrowseCategoryTitle: 'Historical Book',
      BrowseCategoryImage: 'assets/img/bids/oc-category-6.jpg',
    },
    {
      BrowseCategoryTitle: 'Game & Software',
      BrowseCategoryImage: 'assets/img/bids/oc-category-7.jpg',
    },
    {
      BrowseCategoryTitle: 'Photo & Image',
      BrowseCategoryImage: 'assets/img/bids/oc-category-8.jpg',
    },
  ];

  return (
    <section className='oc-category-area pt-110 pb-70'>
      <div className='container'>
        <div className='row wow fadeInUp'>
          <div className='col-lg-12'>
            <div className='section-title1 pos-rel mb-40 text-center'>
              <h2 className='section-main-title1'>Browse by Category</h2>
              <p>
                Here are a few reasons why you should choose Oction for sell
                your NFT
              </p>
            </div>
          </div>
        </div>
        {BrowseCategoryList && (
          <div className='row wow fadeInUp'>
            {BrowseCategoryList.map((BrowseCategorySection, num) => (
              <div key={num} className='col-xl-3 col-lg-3 col-sm-6'>
                <div className='oc-category mb-55'>
                  <div className='oc-category-img'>
                    <Link href='/explore-arts'>
                      <a>
                        <img
                          src={BrowseCategorySection.BrowseCategoryImage}
                          alt='img not found'
                        />
                      </a>
                    </Link>
                  </div>
                  <h5 className='oc-category-title'>
                    <Link href='/explore-arts'>
                      <a>{BrowseCategorySection.BrowseCategoryTitle}</a>
                    </Link>
                  </h5>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BrowseCategorySection;
