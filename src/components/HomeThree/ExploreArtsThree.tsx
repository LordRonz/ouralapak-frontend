import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

import ExploreArtsSingle from '@/components/ExploreArts/ExploreArtsSingle';
import { RootState } from '@/redux/store';

const ExploreArtsThree = () => {
  const products = useSelector((state: RootState) => state.products.products);

  return (
    <section className='artworks-area pt-110 pb-100'>
      <div className='c-container-1 container'>
        <div className='row wow fadeInUp'>
          <div className='col-lg-8'>
            <div className='section-title1'>
              <h2 className='section-main-title1 mb-40'>Explore Artworks</h2>
            </div>
          </div>
          <div className='col-lg-4'></div>
        </div>
        <div className='row wow fadeInUp home-3-artworks'>
          {products.slice(0, 16).map((product) => (
            <ExploreArtsSingle key={product.id} product={product} />
          ))}
        </div>
        <div className='artwork-btn pb-30 pt-20 text-center'>
          <Link href='/explore-arts'>
            <a className='fill-btn'>Explore Now</a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExploreArtsThree;
